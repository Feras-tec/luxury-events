import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useUser } from "@clerk/clerk-react";
import { useEvents } from "../hooks/useEvents";
import { EventCard } from "../components/molecules/EventCard";

export const Dashboard = () => {
  const { user } = useUser();
  const { data: workshops = [], isLoading } = useEvents();

  const incomingWorkshops = [...workshops]
    .filter((w) => w.status === "published" && w.date)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const totalEventsCount = workshops.length;
  const publishedCount = workshops.filter(
    (w) => w.status === "published",
  ).length;
  const draftCount = workshops.filter((w) => w.status === "draft").length;
  const cancelledCount = workshops.filter(
    (w) => w.status === "cancelled",
  ).length;

  const totalAttendeesCount = workshops.reduce(
    (sum, w) => sum + (w.attendees?.length || 0),
    0,
  );

  const calculateAverageOccupancy = () => {
    if (workshops.length === 0) return 0;
    const totalOccupancySum = workshops.reduce((sum, w) => {
      const max = w.maxAttendees || 15;
      const current = w.attendees?.length || 0;
      return sum + (current / max) * 100;
    }, 0);
    return Math.round(totalOccupancySum / workshops.length);
  };

  const averageOccupancy = calculateAverageOccupancy();

  const myRegistrations = workshops.filter((workshop) =>
    workshop.attendees?.some((attendee) => attendee.id === user?.id),
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="space-y-8 p-1 text-base-content w-full max-w-full">
      <div>
        <h1 className="text-2xl md:text-3xl font-black tracking-tight">
          Welcome Back,{" "}
          <span className="text-primary">
            {user?.firstName || "Developer"}! 👋
          </span>
        </h1>
        <p className="text-xs md:text-sm text-base-content/60 mt-1">
          EventBoard Key Statistics and Analytical Overview.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
        {[
          {
            title: "Total Events",
            value: totalEventsCount,
            desc: `📋 P: ${publishedCount} | D: ${draftCount} | C: ${cancelledCount}`,
            color: "text-base-content",
          },
          {
            title: "Total Registrations",
            value: totalAttendeesCount,
            desc: "👥 cumulative attendees",
            color: "text-success",
          },
          {
            title: "Avg. Occupancy Rate",
            value: `${averageOccupancy}%`,
            desc: "📈 average booking load",
            color: "text-accent",
          },
          {
            title: "Your Bookings",
            value: myRegistrations.length,
            desc: "✨ registered by you",
            color: "text-primary",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            whileHover={{ y: -5, scale: 1.01 }}
            className="card bg-base-100 border border-base-200 shadow-sm p-4 md:p-6 w-full min-w-0"
          >
            <div className="text-[10px] font-bold uppercase tracking-widest text-base-content/50 truncate">
              {stat.title}
            </div>
            <div
              className={`text-2xl md:text-3xl font-black mt-2 ${stat.color}`}
            >
              {stat.value}
            </div>
            <div className="text-[10px] md:text-[11px] text-base-content/40 mt-1 uppercase font-medium block truncate">
              {stat.desc}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4 w-full">
        <h2 className="text-xl font-bold tracking-tight">
          Next 3 Upcoming Events 📅
        </h2>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-base-content/50">
            <span className="loading loading-dots loading-md text-primary"></span>
            <span className="text-sm">Loading dashboard feed...</span>
          </div>
        ) : incomingWorkshops.length === 0 ? (
          <div className="text-center py-12 bg-base-100 rounded-2xl border border-base-200 text-base-content/50 text-sm">
            No upcoming published events found.
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
          >
            {incomingWorkshops.map((workshop) => (
              <motion.div
                key={workshop.id}
                variants={itemVariants}
                className="w-full min-w-0"
              >
                <EventCard workshop={workshop} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};
