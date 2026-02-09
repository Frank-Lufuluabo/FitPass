# Bookings Components

This folder contains components related to the user's bookings flow.

- `AttendanceAlert.tsx` — Shows an in-progress or recent class alert prompting the user to confirm attendance.
- `BookingActions.tsx` — Actions for cancelling or confirming attendance on a booking.
- `DayBookings.tsx` — Renders bookings for a selected day.
- `BookingsCalendarView.tsx` — Combined calendar and day bookings view.

Usage:
Import `AttendanceAlert` and pass the user's bookings array (as returned by the `USER_BOOKINGS_QUERY`) to show any classes currently in progress or within the attendance confirmation window.

Example:

```tsx
<AttendanceAlert bookings={bookings} />
```
