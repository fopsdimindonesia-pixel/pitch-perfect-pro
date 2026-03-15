/**
 * Accessibility Utilities and Hooks
 * Provides utilities for WCAG 2.1 AA compliance and better keyboard navigation
 */

import { useEffect, useRef } from "react";

/**
 * Hook for managing focus trap (useful for modals, dialogs)
 */
export function useFocusTrap(isActive: boolean = true) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = containerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      const activeElement = document.activeElement;

      if (e.shiftKey) {
        if (activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    const container = containerRef.current;
    container.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive]);

  return containerRef;
}

/**
 * Hook for managing skip links (keyboard navigation)
 */
export function useSkipLink(targetId: string) {
  const handleSkip = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      const target = document.getElementById(targetId);
      if (target) {
        target.focus();
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return { handleSkip };
}

/**
 * ARIA live region announcements
 */
export function useAriaLiveAnnouncement() {
  const liveRegionRef = useRef<HTMLDivElement>(null);

  const announce = (message: string, priority: "polite" | "assertive" = "polite") => {
    if (!liveRegionRef.current) return;

    const region = liveRegionRef.current;
    region.setAttribute("aria-live", priority);
    region.setAttribute("aria-atomic", "true");
    region.textContent = message;

    // Clear after announcement
    setTimeout(() => {
      region.textContent = "";
    }, 3000);
  };

  return { liveRegionRef, announce };
}

/**
 * Keyboard navigation hook for lists
 */
export function useKeyboardNavigation(items: string[], onSelect: (index: number) => void) {
  const currentIndexRef = useRef<number>(-1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const maxIndex = items.length - 1;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        currentIndexRef.current = Math.min(currentIndexRef.current + 1, maxIndex);
        onSelect(currentIndexRef.current);
        break;
      case "ArrowUp":
        e.preventDefault();
        currentIndexRef.current = Math.max(currentIndexRef.current - 1, 0);
        onSelect(currentIndexRef.current);
        break;
      case "Home":
        e.preventDefault();
        currentIndexRef.current = 0;
        onSelect(currentIndexRef.current);
        break;
      case "End":
        e.preventDefault();
        currentIndexRef.current = maxIndex;
        onSelect(currentIndexRef.current);
        break;
      default:
        break;
    }
  };

  const reset = () => {
    currentIndexRef.current = -1;
  };

  return { handleKeyDown, reset };
}

/**
 * Common ARIA labels and descriptions
 */
export const ariaLabels = {
  // Navigation
  mainNav: "Main navigation",
  sideBar: "Sidebar navigation",
  breadcrumb: "Page breadcrumb navigation",

  // Buttons
  closeButton: "Close",
  openMenu: "Open menu",
  addItem: "Add item",
  deleteItem: "Delete item",
  editItem: "Edit item",
  saveChanges: "Save changes",
  cancelOperation: "Cancel operation",

  // Forms
  requiredField: "This field is required",
  invalidInput: "Invalid input",
  passwordToggle: "Toggle password visibility",

  // Tables
  selectAllRows: "Select all rows",
  sortColumn: "Sort column",
  filterData: "Filter data",
  expandRow: "Expand row details",

  // Loading
  loadingData: "Loading data...",
  loadingChart: "Loading chart...",
};

/**
 * Semantic HTML helpers
 */
export const semanticHTML = {
  // Skip link for keyboard navigation
  skipLink: (href: string) => ({
    className: "sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded",
    href,
    children: "Skip to main content",
  }),

  // Screen reader only text
  srOnly: (text: string) => ({
    className: "sr-only",
    children: text,
  }),
};

/**
 * Color contrast utilities for accessibility
 */
export const contrastRatios = {
  // WCAG AA (4.5:1 for normal text, 3:1 for large text)
  AA: {
    normalText: 4.5,
    largeText: 3,
  },
  // WCAG AAA (7:1 for normal text, 4.5:1 for large text)
  AAA: {
    normalText: 7,
    largeText: 4.5,
  },
};

/**
 * Focus visible styles
 */
export const focusVisibleClass =
  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2";

/**
 * Accessible form error handling
 */
export function createAccessibleFormError(fieldName: string, error: string) {
  return {
    id: `error-${fieldName}`,
    role: "alert",
    ariaLive: "polite" as const,
    message: error,
  };
}

/**
 * Announce page changes for screen readers
 */
export function announcePageChange(pageTitle: string) {
  document.title = pageTitle;

  // Announce to screen readers
  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", "assertive");
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = `Navigated to ${pageTitle}`;
  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Accessible tooltip
 */
export function getAccessibleTooltipProps(content: string) {
  return {
    title: content,
    role: "tooltip" as const,
    ariaDescribedBy: `tooltip-${Math.random()}`,
  };
}
