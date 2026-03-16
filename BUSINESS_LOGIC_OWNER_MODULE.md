# Owner Module - Detailed Business Logic

## Overview

The Owner Module is the administrative heart of Pitch Perfect Pro, providing platform-wide management capabilities, monitoring, and governance functions.

## 1. Platform Dashboard

### Purpose
Provide real-time visibility into platform health, user metrics, and financial performance.

### Key Metrics Displayed

#### System Health
- **Uptime Percentage:** Target 99.99% with alerts if < 99.9%
- **API Response Time:** Target < 100ms, warning at 500ms+
- **Database Performance:** Latency < 50ms, alert at 100ms+
- **Error Rate:** Display percentage, alert if > 1%

#### User Metrics
- **Total Users:** Count all registered users across all roles
- **Active Users (30-day):** Users with activity in last 30 days
- **New Users (Month):** Newly registered users
- **Churn Rate:** Users inactive for 60+ days

#### Organization Metrics
- **Total Organizations:** Club + EO + Federation count
- **Active Organizations:** Organizations with ongoing activities
- **New Organizations:** Registrations this month
- **Organization Status:** Breakdown (Verified, Pending, Suspended)

#### Competition Metrics
- **Active Competitions:** Status = Active
- **Completed Competitions:** Finished this month
- **Total Matches:** Across all competitions
- **Matches Played:** Actual vs Scheduled ratio

#### Financial Metrics
- **Monthly Revenue:** Subscriptions + Transaction fees
- **Monthly Expenses:** Infrastructure, support, etc.
- **Net Revenue:** Revenue - Expenses
- **Growth Rate:** Monthly growth percentage

### Business Rules
1. All metrics updated in real-time or within 5-minute window
2. Historical data retained for 7 years for compliance
3. Metrics queryable by date range, organization, region
4. Alerts triggered automatically on threshold breach
5. Dashboard accessible only to Owner role users

---

## 2. User Management System

### User Lifecycle

```
Application → KYC Verification → Approval → Active → Inactive → Suspended → Deleted
```

### Registration Process

1. **Application Submission**
   - Email, password, name, organization
   - Verification email sent
   - Email link must be clicked within 24 hours

2. **KYC Verification**
   - Identity document upload (passport/driver license)
   - Address verification
   - Phone verification (SMS code)
   - Face verification (if required)
   - Automated initial screening
   - Manual review for high-risk locations

3. **Approval**
   - Owner approves or requests additional info
   - Approval email notification sent
   - User activated in system

### User Roles & Permissions

#### 1. **Platform Owner**
- Permissions: Full system access
- Responsibilities: Platform governance, strategy
- Capabilities: Manage all users, organizations, settings
- Audit: All actions logged

#### 2. **System Admin**
- Permissions: All Owner permissions
- Responsibilities: Day-to-day operations
- Capabilities: Same as Owner
- Note: Inherited from Owner

#### 3. **Event Organizer (EO) Admin**
- Permissions: EO organization management
- Responsibilities: Manage competitions, teams
- Scope: Only own organization
- Limited access to platform settings

#### 4. **Club Admin**
- Permissions: Club management
- Responsibilities: Team, staff, finance
- Scope: Only own club
- Cannot access other clubs' data

#### 5. **Coach**
- Permissions: Squad management, match preparation
- Responsibilities: Team training, tactics
- Scope: Assigned team only
- Cannot modify club hierarchy

#### 6. **Player**
- Permissions: Personal profile, match schedules
- Responsibilities: Update availability
- Scope: Own profile + team activities
- Limited access to personal records

### User Suspension Logic

**Automatic Suspension Triggers:**
- KYC verification failed
- Multiple failed login attempts (> 5 in 12 hours)
- Payment dispute (chargeback)
- Code of conduct violation (flagged manually)
- Inactivity (customizable, e.g., 180+ days)

**Manual Suspension:**
- Owner/Admin initiates suspension
- Reason logged
- Notification sent to user
- Account locked, cannot login

**Reactivation Process:**
1. User requests reactivation
2. Owner reviews reason for suspension
3. If eligible: Reactive and notify
4. If not: Deny with explanation

### Business Rules

1. **One Email = One Account:**
   - Email uniqueness enforced
   - Email change requires verification

2. **Password Policy:**
   - Minimum 8 characters
   - Must contain: uppercase, lowercase, digit, special char
   - History: Last 5 passwords cannot be reused
   - Expiration: 90 days (optional per organization)

3. **Multi-Factor Authentication (MFA):**
   - Optional for users
   - Mandatory for Owners/Admins
   - Methods: SMS, authenticator app, email
   - Backup codes generated

4. **Login Audit:**
   - All login attempts logged (success/failure)
   - Suspicious logins flagged (impossible travel, new location)
   - Geographic anomaly detection enabled
   - Session timeout: 30 minutes inactivity

5. **Data Access:**
   - Users can only access data for their scope
   - Cross-organization data strictly prohibited
   - API tokens tied to specific user
   - Scopes: read:own, read:organization, write:own, write:organization

---

## 3. Organization Management

### Organization Types

#### Federations
- **Purpose:** Governing body for football
- **Structure:** Regional divisions
- **Responsibilities:** League sanctioning, regulation
- **Example:** PSSI Central, Regional PSSI

#### Regions
- **Purpose:** Geographic division
- **Hierarchy:** Under Federation
- **Responsibilities:** License member leagues
- **Coverage:** State/province level

#### Leagues
- **Purpose:** Competition organizer
- **Hierarchy:** Under Region
- **Responsibilities:** Run competitions
- **Examples:** Jakarta Premier, Makassar League

#### Clubs
- **Purpose:** Team participation
- **Hierarchy:** Participate in Leagues
- **Responsibilities:** Field teams, manage squad
- **Examples:** SSB Garuda Muda, Persija Jakarta

### Registration Workflow

```
Step 1: Application Submission
├─ Organization details
├─ Contact information
├─ Governing body affiliation
└─ License/credentials

Step 2: Document Verification
├─ Organizational documents validation
├─ Legal entity checks
├─ Tax registration verification
└─ Insurance verification (if required)

Step 3: Compliance Review
├─ AML screening
├─ History checks
├─ Stakeholder verification
└─ Jurisdiction compliance

Step 4: Approval Decision
├─ If Approved:
│  ├─ Organization marked Verified
│  ├─ Activation notification sent
│  └─ Platform access granted
└─ If Rejected:
   ├─ Reason documented
   ├─ Rejection notification sent
   └─ Reapplication allowed after 30 days
```

### Organization Status Flow

```
PENDING → VERIFIED → ACTIVE ↔ INACTIVE
           ↓
        REJECTED
           ↓
      REAPPLICATION (after 30 days)
```

### Business Rules

1. **Club Requirements:**
   - Stadium/venue must be registered
   - Head coach must be on staff
   - Min 14 players registered
   - Insurance certificate provided
   - Bank account details registered
   - Annual KYC renewal required

2. **EO Requirements:**
   - Valid license from governing body
   - Track record of successful events
   - Insurance coverage (min amount)
   - Professional staff (min 2 persons)
   - Experience (min 2 years OR references)

3. **League Requirements:**
   - Min 4 teams to create
   - Season defined and unique
   - Venue capacity documented
   - Participation agreements signed
   - Fixture schedule submitted

4. **Organization Suspension:**
   - Grounds: Non-compliance, fraud, violent conduct
   - Process: Written notice, response period, hearing
   - Immediate for safety-related issues
   - Appeals available within 30 days

---

## 4. Competition Monitoring

### Real-Time Monitoring

**Tracked Data:**
- Active competitions (count, status)
- Teams registered vs capacity
- Matches scheduled vs completed
- Goals scored, cards issued
- Revenue collected

**Monitoring Dashboard:**
- Competition list by status
- Participation metrics
- Schedule adherence
- Financial performance

### Alerting Rules

| Condition | Alert Level | Action |
|-----------|------------|--------|
| Matches > 7 days behind schedule | Warning | Notify EO |
| Team registrations at 100% capacity | Info | Offer waitlist info |
| Multiple rule violations reported | Critical | Safety review |
| Competition revenue < forecast 20% | Warning | Revenue analysis |
| Incomplete match data submission | Warning | Deadline reminder |

### Business Rules

1. **Competition Lifecycle Tracking:**
   - Auto-track status transitions
   - Enforce date constraints
   - Monitor participation trends
   - Verify venue availability

2. **Schedule Compliance:**
   - Matches must be within season dates
   - Verify venue availability
   - Check referee availability
   - Ensure team readiness

3. **Fraud Detection:**
   - Unusual score patterns (excessive goals)
   - Bet manipulation indicators
   - Match-fixing red flags
   - Escalate to investigation team

---

## 5. Finance Management

### Revenue Streams

#### Subscription Revenue
- **Organization Subscriptions:**
  - Plan-based (Basic: 50K, Pro: 150K, Enterprise: custom)
  - Recurring monthly/annual
  - Auto-renewal with opt-out

- **Revenue Calculation:**
  ```
  Monthly Revenue = Σ(Organization Subscriptions) + Σ(Transaction Fees)
  ```

#### Transaction Fees
- **Commission:** 2.5% of payment amount
- **Applies To:**
  - Team registrations
  - Event participation fees
  - In-app purchases

### Payout Management

#### Payout Request Workflow

```
Organization Submits Request
├─ Amount specified
├─ Bank details provided
├─ Purpose documented
└─ Date requested

Finance Team Review
├─ AML screening ($50M+)
├─ Account status verification
├─ Transaction history review
└─ Fraud check

Approval Decision
├─ If Approved:
│  ├─ Bank transfer scheduled
│  ├─ Confirmation sent
│  └─ Settlement within 5 days
└─ If Rejected:
   ├─ Reason documented
   └─ Communication sent

Settlement
├─ Wire transfer executed
├─ Receipt generated
├─ Accounting recorded
└─ Confirmation to organization
```

### Financial Compliance

#### Reconciliation Process
- **Daily:** Payment gateway reconciliation
- **Weekly:** Account consolidation
- **Monthly:** Financial reporting
- **Quarterly:** Audit preparation
- **Annual:** External audit

#### Accounting Entries

```
Payment Received:
  Debit: Bank Account
  Credit: Revenue (Subscription/Fee)

Payout Processed:
  Debit: Organization Account
  Credit: Bank Account

Transaction Fee:
  Debit: Processing Fee Expense
  Credit: Revenue (Fee Income)
```

### Business Rules

1. **Payment Terms:**
   - Subscriptions due monthly/on date selected
   - Invoices emailed 14 days before due date
   - Grace period: 5 days after due date
   - Service suspension after grace period

2. **Refund Policy:**
   - Subscription: Proration on downgrade/cancel
   - Entry fees: 80% refund if cancelled > 7 days before
   - Service issues: Full credit to account
   - No cash refunds (credit only)

3. **Payout Rules:**
   - Minimum payout: 100K
   - Maximum per request: 100M
   - Frequency: Max 2 per week per organization
   - Hold period: 48 hours review + 5 days settlement

4. **Dispute Resolution:**
   - Chargeback response: 10 days
   - Dispute resolution: 30 days
   - Documentation required for all disputes
   - Escalation to payment processor if unresolved

---

## 6. Infrastructure Monitoring

### System Components Monitored

#### Web Servers
- **Metrics:** Uptime, CPU, Memory, Requests/sec
- **Target:** 99.99% uptime
- **Alert:** < 99.9% uptime

#### API Gateway
- **Metrics:** Response time, error rate, throughput
- **Target:** Avg response < 100ms, p99 < 500ms
- **Alert:** Response time > 500ms, error rate > 1%

#### Database
- **Metrics:** Latency, CPU, memory, backup success
- **Target:** Query latency < 50ms
- **Alert:** Latency > 100ms, backup failed

#### Cache Layer (Redis)
- **Metrics:** Hit ratio, memory usage, response time
- **Target:** Hit ratio > 80%
- **Alert:** Hit ratio < 60%, evictions happening

#### Message Queue
- **Metrics:** Queue depth, processing rate, latency
- **Target:** Queue depth < 1000
- **Alert:** Queue depth > 10000, processing stalled

#### Storage
- **Metrics:** Disk usage, I/O latency, backup status
- **Target:** < 80% capacity utilization
- **Alert:** > 85% capacity, backup failures

### Automatic Recovery

**Circuit Breaker Pattern:**
- Monitor service health
- If unhealthy: Stop routing traffic
- Wait for recovery
- Gradually resume traffic
- Log incidents for analysis

**Auto-Scaling:**
- Scale up: CPU > 70% for 5 min
- Scale down: CPU < 30% for 15 min
- Min/max instance limits
- Regional distribution maintained

### Business Rules

1. **Incident Response:**
   - P1 (Critical): 15 min response, 1hr resolution target
   - P2 (High): 1 hour response, 4hr resolution target
   - P3 (Medium): 4 hour response, 24hr resolution target
   - P4 (Low): Next business day response

2. **Maintenance Windows:**
   - Scheduled maintenance: Off-peak hours only
   - Advance notice: 72 hours minimum
   - Duration: < 2 hours
   - Backup system tested before maintenance

3. **Disaster Recovery:**
   - RTO (Recovery Time Objective): 4 hours
   - RPO (Recovery Point Objective): 1 hour
   - Backup location: Different geographic region
   - Backup tested quarterly

---

## Summary

The Owner Module provides comprehensive platform governance through:
- Real-time monitoring and alerting
- Centralized user management with robust KYC/AML
- Organization lifecycle management
- Financial oversight and compliance
- Infrastructure health monitoring

All functions maintain strict audit trails and compliance with financial regulations, ensuring platform integrity and user trust.
