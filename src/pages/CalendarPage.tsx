import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEvents } from "../hooks/useEvents";
import type { Event } from "../types/event";

export const CalendarPage = () => {
  const { data: workshops = [] } = useEvents();

  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getEventsForDay = (day: number) => {
    return workshops.filter((event: Event) => {
      if (!event.date) return false;

      if (event.status === "draft") return false;

      if (event.date.includes("-")) {
        const [eYear, eMonth, eDay] = event.date.split("-").map(Number);
        return eYear === year && eMonth === month + 1 && eDay === day;
      }
      const parsedDate = new Date(event.date);
      return (
        parsedDate.getFullYear() === year &&
        parsedDate.getMonth() === month &&
        parsedDate.getDate() === day
      );
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "workshop":
        return "bg-primary text-primary-content";
      case "talk":
        return "bg-secondary text-secondary-content";
      case "networking":
        return "bg-accent text-accent-content";
      case "review":
        return "bg-warning text-warning-content";
      default:
        return "bg-neutral text-neutral-content";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-6 pb-12 p-4 text-base-content"
    >
      <div className="flex justify-between items-center bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-base-content">
            Workshop Calendar
          </h1>
          <p className="text-xs opacity-70 mt-0.5">
            Monthly overview of all scheduled training sessions.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-base-200 p-1.5 rounded-xl border border-base-300">
          <button
            onClick={prevMonth}
            className="btn btn-sm btn-ghost text-base-content"
          >
            ◀
          </button>
          <span className="text-sm font-bold min-w-30 text-center text-base-content">
            {monthNames[month]} {year}
          </span>
          <button
            onClick={nextMonth}
            className="btn btn-sm btn-ghost text-base-content"
          >
            ▶
          </button>
        </div>
      </div>

      <div className="bg-base-200 rounded-3xl border border-base-300 shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 bg-base-100 border-b border-base-300 text-center py-3">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <span
              key={d}
              className="text-xs font-bold opacity-50 uppercase tracking-wider text-base-content"
            >
              {d}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-base-300">
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="bg-base-100 min-h-30" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayEvents = getEventsForDay(day);

            return (
              <div
                key={`day-${day}`}
                className="bg-base-100 min-h-30 p-2 flex flex-col border border-base-200/50 hover:bg-base-200/50 transition-colors duration-200"
              >
                <span className="text-xs font-bold opacity-40 mb-1 text-base-content">
                  {day}
                </span>

                <div className="space-y-1 flex-1 overflow-y-auto">
                  <AnimatePresence>
                    {dayEvents.map((event) => (
                      <Link
                        key={event.id}
                        to="/events/$eventid"
                        params={{ eventid: event.id }}
                        search={{ edit: false }}
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.05, x: 2 }}
                          className={`text-[11px] font-semibold px-2 py-1 rounded-md truncate shadow-sm cursor-pointer ${getCategoryColor(
                            event.category,
                          )}`}
                        >
                          {event.title}
                        </motion.div>
                      </Link>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
