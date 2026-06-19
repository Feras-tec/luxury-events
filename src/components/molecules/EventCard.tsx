import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Workshop } from "../../types/event";

type EventCardProps = {
  workshop: Workshop;
};

export const EventCard = ({ workshop }: EventCardProps) => {
  const badgeClass =
    workshop.category === "workshop"
      ? "badge-primary"
      : workshop.category === "talk"
        ? "badge-secondary"
        : workshop.category === "networking"
          ? "badge-accent"
          : workshop.category === "review"
            ? "badge-warning"
            : "badge-neutral";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="card bg-base-100 border border-base-200 shadow-sm overflow-hidden flex flex-col justify-between p-6 space-y-4"
    >
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span
            className={`badge ${badgeClass} badge-sm font-bold text-[10px] uppercase`}
          >
            {workshop.category}
          </span>
          <span className="text-xs font-semibold text-base-content/50">
            {workshop.level}
          </span>
        </div>
        <h3 className="text-base font-bold text-base-content line-clamp-1">
          {workshop.title}
        </h3>
        <p className="text-xs text-base-content/60 line-clamp-2">
          {workshop.description}
        </p>
      </div>

      <div className="pt-4 border-t border-base-200 flex items-center justify-between">
        <div className="text-xs">
          <p className="font-bold text-base-content">{workshop.instructor}</p>
          <p className="text-base-content/40 mt-0.5">{workshop.date}</p>
        </div>
        <Link
          to="/events/$eventid"
          params={{ eventid: workshop.id }}
          search={{ edit: false }}
          className="text-xs font-bold text-primary hover:text-primary-focus transition-colors"
        >
          View Details →
        </Link>
      </div>
    </motion.div>
  );
};
