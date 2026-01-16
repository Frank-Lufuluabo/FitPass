import { auth } from "@clerk/nextjs/server";
import { sanityFetch } from "@/sanity/lib/live";
import { USER_BOOKINGS_QUERY } from "@/sanity/lib/queries/bookings";
import { isPast } from "date-fns";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BookingsCalendarView } from "@/components/app/bookings/BookingsCalendarView";
import { AttendanceAlert } from "@/components/app/bookings/AttendanceAlert";
import { BookingCard } from "@/components/app/bookings/BookingCard";
import { getUsageStats } from "@/lib/subscription";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function BookingsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const [{ data: bookings }, usageStats] = await Promise.all([
    sanityFetch({ query: USER_BOOKINGS_QUERY, params: { clerkId: userId } }),
    getUsageStats(userId),
  ]);

  // Filter out bookings with invalid data
  const validBookings = bookings.filter(
    (b) => b.status && b.classSession?.startTime,
  );

  // Sort upcoming bookings (earliest first)
  const upcomingBookings = validBookings
    .filter(
      (b) =>
        b.status === "confirmed" &&
        b.classSession?.startTime &&
        !isPast(new Date(b.classSession.startTime)),
    )
    .sort((a, b) => {
      const aTime = a.classSession?.startTime
        ? new Date(a.classSession.startTime).getTime()
        : 0;
      const bTime = b.classSession?.startTime
        ? new Date(b.classSession.startTime).getTime()
        : 0;
      return aTime - bTime;
    });

  // Sort past bookings (most recent first)
  const pastBookings = validBookings
    .filter(
      (b) =>
        b.status !== "confirmed" ||
        (b.classSession?.startTime &&
          isPast(new Date(b.classSession.startTime))),
    )
    .sort((a, b) => {
      const aTime = a.classSession?.startTime
        ? new Date(a.classSession.startTime).getTime()
        : 0;
      const bTime = b.classSession?.startTime
        ? new Date(b.classSession.startTime).getTime()
        : 0;
      return bTime - aTime;
    });

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="border-b bg-gradient-to-r from-primary/5 via-background to-primary/5">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your upcoming and past fitness classes
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Attendance Confirmation Alert */}
        <AttendanceAlert bookings={bookings} />

        {/* Calendar View */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Calendar View</h2>
          </div>
          <BookingsCalendarView bookings={bookings} />
        </section>

        {/* Upcoming Bookings */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Upcoming Classes</h2>
            <Badge variant="secondary" className="ml-2">
              {upcomingBookings.length}
            </Badge>
          </div>
          {upcomingBookings.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-4">
                  No upcoming classes
                </p>
                <Button asChild>
                  <Link href="/classes">
                    Browse classes
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <BookingCard key={booking._id} booking={booking} showActions />
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}