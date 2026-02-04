import { format, isToday, isTomorrow } from "date-fns";

/**
 * Format a date string for tab display (compact format)
 * Examples: "Today", "Tomorrow", "Wed 18"
 */
export function formatTabLabel(dateStr: string): string {
    const date = new Date(dateStr);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "EEE d"); // "Wed 18"
}

/**
 * Format a date string for section headers (full format)
 * Examples: "Today", "Tomorrow", "Wednesday, February 18"
 */
export function formatDayHeader(dateStr: string): string {
    const date = new Date(dateStr);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "EEEE, MMMM d");
}

/**
 * Calculate the total number of sessions across all grouped sessions
 */
export function getTotalSessionCount<T extends { _id: string }>(
    groupedSessions: [string, T[]][]
): number {
    return groupedSessions.reduce((acc, [, sessions]) => acc + sessions.length, 0);
}

/**
 * Get the session count for a specific day
 */
export function getSessionCountForDay<T extends { _id: string }>(
    groupedSessions: [string, T[]][],
    dateKey: string
): number {
    return groupedSessions.find(([key]) => key === dateKey)?.[1].length || 0;
}

/**
 * Check if no sessions are available
 */
export function hasNoSessions<T extends { _id: string }>(
    groupedSessions: [string, T[]][]
): boolean {
    return groupedSessions.length === 0;
}

/**
 * Get all day keys from grouped sessions in order
 */
export function getDayKeys<T extends { _id: string }>(
    groupedSessions: [string, T[]][]
): string[] {
    return groupedSessions.map(([dateKey]) => dateKey);
}

/**
 * Check if a session is booked
 */
export function isSessionBooked(sessionId: string, bookedSessionIds: string[]): boolean {
    return bookedSessionIds.includes(sessionId);
}

/**
 * Filter sessions by distance threshold
 */
export function filterSessionsByDistance<T extends { distance: number }>(
    sessions: T[],
    maxDistance: number
): T[] {
    return sessions.filter((session) => session.distance <= maxDistance);
}

/**
 * Create a Set of booked session IDs for faster lookups
 */
export function createBookedSessionSet(bookedSessionIds: string[]): Set<string> {
    return new Set(bookedSessionIds);
}

/**
 * Sort sessions by distance (nearest first)
 */
export function sortSessionsByDistance<T extends { distance: number }>(
    sessions: T[]
): T[] {
    return [...sessions].sort((a, b) => a.distance - b.distance);
}
