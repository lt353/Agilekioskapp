/**
 * Timeout and interval constants for the UHMC Kiosk App
 * All values in milliseconds unless otherwise noted
 */

// ===== Inactivity Timeouts =====
/** Time of inactivity before showing warning message to user (2 minutes) */
export const INACTIVITY_WARNING_TIMEOUT = 120000; // 2 minutes

/** Time of inactivity before returning to attract/welcome screen (2 minutes 15 seconds) */
export const INACTIVITY_RETURN_TIMEOUT = 135000; // 2 minutes 15 seconds

/** Interval for checking user inactivity (1 second) */
export const INACTIVITY_CHECK_INTERVAL = 1000; // 1 second

// ===== Content Refresh Intervals =====
/** How often to check for Service Worker updates (5 minutes) */
export const SERVICE_WORKER_UPDATE_INTERVAL = 5 * 60 * 1000; // 5 minutes

/** How often to refresh attract mode content from Supabase (5 minutes) */
export const ATTRACT_CONTENT_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

// ===== UI Timing =====
/** Duration to display each slide in attract mode (10 seconds) */
export const ATTRACT_SLIDE_DURATION = 10000; // 10 seconds

/** Delay before scaling floor map coordinates after render (100ms) */
export const FLOOR_MAP_SCALE_DELAY = 100; // 100ms

/** Duration of keyboard key press visual feedback (150ms) */
export const KEYBOARD_KEY_PRESS_DURATION = 150; // 150ms
