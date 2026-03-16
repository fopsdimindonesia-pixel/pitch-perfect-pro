import { EligibilityCheckResult } from "../teams/TeamEligibilityChecker";

/**
 * Webhook Notification Service
 * Handles sending notifications for eligibility issues
 */

export interface WebhookConfig {
  url: string;
  secret?: string;
  events: WebhookEvent[];
  retryEnabled: boolean;
  maxRetries: number;
}

export type WebhookEvent =
  | "eligibility.checked"
  | "eligibility.issue_detected"
  | "eligibility.resolved"
  | "team.suspended"
  | "team.approved"
  | "team.flagged";

export interface WebhookPayload {
  event: WebhookEvent;
  timestamp: string;
  competitionId: string;
  data: any;
  signature?: string;
}

export interface NotificationTemplate {
  type: "email" | "slack" | "webhook";
  template: string;
  variables: Record<string, string>;
}

// ─── Webhook Storage ────────────────────────────────────────────────
const webhookRegistry: Map<string, WebhookConfig> = new Map();
const notificationLog: WebhookPayload[] = [];

/**
 * Register a webhook endpoint
 */
export function registerWebhook(
  competitionId: string,
  config: WebhookConfig
): boolean {
  try {
    webhookRegistry.set(competitionId, config);

    // Persist to localStorage for demo
    const registry = Object.fromEntries(webhookRegistry);
    localStorage.setItem("webhook_registry", JSON.stringify(registry));

    return true;
  } catch (error) {
    console.error("Failed to register webhook:", error);
    return false;
  }
}

/**
 * Get webhook config for competition
 */
export function getWebhookConfig(competitionId: string): WebhookConfig | null {
  return webhookRegistry.get(competitionId) || null;
}

/**
 * Unregister a webhook
 */
export function unregisterWebhook(competitionId: string): boolean {
  const result = webhookRegistry.delete(competitionId);
  if (result) {
    const registry = Object.fromEntries(webhookRegistry);
    localStorage.setItem("webhook_registry", JSON.stringify(registry));
  }
  return result;
}

// ─── Send Notifications ─────────────────────────────────────────────
/**
 * Send webhook notification for eligibility check
 */
export async function notifyEligibilityCheck(
  competitionId: string,
  results: EligibilityCheckResult[]
): Promise<boolean> {
  const config = getWebhookConfig(competitionId);
  if (!config) return false;

  const issueTeams = results.filter((r) => !r.compliant);
  if (issueTeams.length === 0) return true; // No issues to notify

  const payload: WebhookPayload = {
    event: "eligibility.issue_detected",
    timestamp: new Date().toISOString(),
    competitionId,
    data: {
      teamsWithIssues: issueTeams.length,
      totalTeams: results.length,
      teams: issueTeams.map((team) => ({
        id: team.teamId,
        name: team.teamName,
        completeness: team.completeness,
        issues: team.issues.map((i) => ({
          type: i.type,
          code: i.code,
          message: i.message,
        })),
      })),
    },
  };

  return await sendWebhook(config.url, payload, config.secret);
}

/**
 * Send webhook notification for team status change
 */
export async function notifyTeamStatusChange(
  competitionId: string,
  event: "suspended" | "approved" | "flagged",
  teamIds: string[],
  reason: string
): Promise<boolean> {
  const config = getWebhookConfig(competitionId);
  if (!config) return false;

  const eventMap: Record<string, WebhookEvent> = {
    suspended: "team.suspended",
    approved: "team.approved",
    flagged: "team.flagged",
  };

  const payload: WebhookPayload = {
    event: eventMap[event],
    timestamp: new Date().toISOString(),
    competitionId,
    data: {
      teamIds,
      teamCount: teamIds.length,
      reason,
      action: event,
    },
  };

  return await sendWebhook(config.url, payload, config.secret);
}

/**
 * Internal: Send webhook with retry logic
 */
async function sendWebhook(
  url: string,
  payload: WebhookPayload,
  secret?: string,
  retryCount: number = 0,
  maxRetries: number = 3
): Promise<boolean> {
  try {
    // Sign payload if secret provided
    if (secret) {
      const signature = generateSignature(JSON.stringify(payload), secret);
      payload.signature = signature;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Timestamp": new Date().toISOString(),
        ...(secret && { "X-Signature": payload.signature }),
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      logNotification(payload);
      return true;
    } else {
      // Retry on server error
      if (retryCount < maxRetries && response.status >= 500) {
        await new Promise((resolve) => setTimeout(resolve, 2000 * (retryCount + 1)));
        return sendWebhook(url, payload, secret, retryCount + 1, maxRetries);
      }
      console.error(`Webhook failed: ${response.statusText}`);
      return false;
    }
  } catch (error) {
    // Retry on network error
    if (retryCount < maxRetries) {
      console.log(`Webhook retry ${retryCount + 1}/${maxRetries}`);
      await new Promise((resolve) => setTimeout(resolve, 2000 * (retryCount + 1)));
      return sendWebhook(url, payload, secret, retryCount + 1, maxRetries);
    }

    console.error("Failed to send webhook:", error);
    return false;
  }
}

/**
 * Generate HMAC signature for webhook security
 */
function generateSignature(payload: string, secret: string): string {
  // Simple signature for demo (would use crypto.subtle in production)
  const encoder = new TextEncoder();
  const data = encoder.encode(payload + secret);
  let hash = 0;

  for (let i = 0; i < data.length; i++) {
    const char = data[i];
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return Math.abs(hash).toString(16);
}

// ─── Notification Logging ───────────────────────────────────────────
/**
 * Log sent notification
 */
function logNotification(payload: WebhookPayload): void {
  notificationLog.push(payload);

  // Keep last 500 notifications
  if (notificationLog.length > 500) {
    notificationLog.shift();
  }

  // Persist to localStorage
  try {
    localStorage.setItem(
      "webhook_notifications",
      JSON.stringify(notificationLog.slice(-100))
    );
  } catch (error) {
    console.error("Failed to persist notification log:", error);
  }
}

/**
 * Get notification history
 */
export function getNotificationHistory(limit: number = 50): WebhookPayload[] {
  return notificationLog.slice(-limit).reverse();
}

/**
 * Get notification stats
 */
export function getNotificationStats() {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const lastHour = notificationLog.filter(
    (n) => new Date(n.timestamp) > oneHourAgo
  );
  const lastDay = notificationLog.filter(
    (n) => new Date(n.timestamp) > oneDayAgo
  );

  return {
    total: notificationLog.length,
    lastHour: lastHour.length,
    lastDay: lastDay.length,
    byEvent: notificationLog.reduce(
      (acc, n) => {
        acc[n.event] = (acc[n.event] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ),
  };
}

// ─── Clear Functions ────────────────────────────────────────────────
/**
 * Clear all webhooks
 */
export function clearWebhooks(): void {
  webhookRegistry.clear();
  localStorage.removeItem("webhook_registry");
}

/**
 * Clear notification log
 */
export function clearNotificationLog(): void {
  notificationLog.length = 0;
  localStorage.removeItem("webhook_notifications");
}

// ─── Initialize from storage ────────────────────────────────────────
try {
  const storedRegistry = localStorage.getItem("webhook_registry");
  if (storedRegistry) {
    const registry = JSON.parse(storedRegistry);
    Object.entries(registry).forEach(([competitionId, config]: any) => {
      webhookRegistry.set(competitionId, config);
    });
  }

  const storedNotifications = localStorage.getItem("webhook_notifications");
  if (storedNotifications) {
    notificationLog.push(...JSON.parse(storedNotifications));
  }
} catch (error) {
  console.error("Failed to load webhook data from storage:", error);
}

// ─── Notification Templates ────────────────────────────────────────
export const notificationTemplates = {
  issuesDetected: {
    type: "email" as const,
    template: `
Team Eligibility Issues Detected

Competition: {{competitionName}}
Teams with Issues: {{issueCount}}/{{totalTeams}}

The following teams have eligibility issues that need attention:
{{teamsList}}

Please review and take appropriate action before the registration deadline.

{{dashboardLink}}
    `,
    variables: {
      competitionName: "",
      issueCount: "",
      totalTeams: "",
      teamsList: "",
      dashboardLink: "",
    },
  },

  teamSuspended: {
    type: "email" as const,
    template: `
Team Suspension Notice

Competition: {{competitionName}}
Team: {{teamName}}
Reason: {{reason}}

The team has been suspended due to eligibility violations.
Contact the Event Organizer for more information.
    `,
    variables: {
      competitionName: "",
      teamName: "",
      reason: "",
    },
  },

  resumeNotification: {
    type: "slack" as const,
    template: `:warning: Eligibility Alert | {{competitionName}}
• Teams with Issues: {{issueCount}}/{{totalTeams}}
• Critical: {{errorCount}}
• Warnings: {{warningCount}}
View Details: {{dashboardLink}}`,
    variables: {
      competitionName: "",
      issueCount: "",
      totalTeams: "",
      errorCount: "",
      warningCount: "",
      dashboardLink: "",
    },
  },
};
