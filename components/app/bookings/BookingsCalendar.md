# BookingsCalendar

Renders a month calendar with days that have bookings indicated by dots.

Props:
- `bookings`: array from `USER_BOOKINGS_QUERY`.
- `selectedDate`: currently selected `Date`.
- `onDateSelect(date: Date)`: callback when a date is selected.

Notes:
- Excludes cancelled and past bookings from indicators.
- Shows up to 3 dots per day to indicate booking count.

Usage:
```tsx
<BookingsCalendar bookings={bookings} selectedDate={date} onDateSelect={setDate} />
```
