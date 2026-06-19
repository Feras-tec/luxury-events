import { Link } from "@tanstack/react-router";

interface EventActionsProps {
  isAdmin: boolean;
  isDeleting: boolean;
  onDelete: () => void;
  eventid: string;
}

export const EventActions = ({
  isAdmin,
  isDeleting,
  onDelete,
  eventid,
}: EventActionsProps) => {
  return (
    <div className="flex justify-between items-center">
      <Link
        to="/events"
        search={{ edit: false }}
        className="btn btn-ghost btn-sm text-base-content/70"
      >
        ← Back to Events
      </Link>

      {isAdmin && (
        <div className="flex items-center gap-2">
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="btn btn-error btn-sm shadow-sm"
          >
            {isDeleting ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Delete Workshop 🗑️"
            )}
          </button>
          <Link
            to="/events/$eventid/edit"
            params={{ eventid }}
            search={{ edit: true }}
            className="btn btn-neutral btn-sm shadow-sm"
          >
            Edit Workshop ✏️
          </Link>
        </div>
      )}
    </div>
  );
};
