import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Event } from "../../types/event";
import { Badge } from "../atoms/Badge";

interface EventCardProps {
  event: Event;
}

const MotionCard = motion.div;

export function EventCard({ event }: EventCardProps) {
  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="card bg-base-100 border border-base-200"
    >
      <div className="card-body">
        <h2 className="card-title text-primary">{event.title}</h2>

        <div className="flex flex-col gap-2 mt-2 text-sm text-base-content/80">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>

            <span>{event.date}</span>
            <span className="mx-1">•</span>
            <span>{event.time}</span>
          </div>

          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            <span>{event.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <Badge color="primary">{event.category}</Badge>

          <Badge color={event.status === "published" ? "success" : "ghost"}>
            {event.status}
          </Badge>
        </div>

        <div className="mt-4 text-sm font-medium">
          Attendees: {event.attendees?.length ?? 0} / {event.maxAttendees}
        </div>

        <div className="card-actions justify-end mt-4">
          <Link
            to="/events/$eventid"
            params={{ eventid: event.id }}
            search={{ edit: false }}
            className="btn btn-primary btn-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </MotionCard>
  );
}
