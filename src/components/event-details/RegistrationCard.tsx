interface RegistrationCardProps {
  status: string;
  location: string;
  date: string;
  time: string;
  duration: string;
  maxAttendees: number;
  isUpdating: boolean;
  disabled: boolean;
  buttonClass: string;
  buttonText: string;
  onToggle: () => void;
}

export const RegistrationCard = ({
  status,
  location,
  date,
  time,
  duration,
  maxAttendees,
  isUpdating,
  disabled,
  buttonClass,
  buttonText,
  onToggle,
}: RegistrationCardProps) => {
  return (
    <div className="card bg-base-100 border border-base-200 shadow-md sticky top-24">
      <div className="card-body p-8 space-y-6">
        <div>
          <p className="text-xs font-bold text-base-content/40 uppercase tracking-wider">
            Registration Status
          </p>
          <p className="text-3xl font-black text-success mt-1">
            {status || "Upcoming"}
          </p>
        </div>

        <div className="text-sm space-y-4 text-base-content/80 border-t border-base-200 pt-4">
          <div className="flex justify-between items-center gap-2">
            <span className="opacity-70 flex items-center gap-1 shrink-0">
              📍 Location:
            </span>
            <span className="font-semibold text-base-content text-right">
              {location &&
              (location.includes("http") || location.includes("www")) ? (
                <a
                  href={
                    location.startsWith("http")
                      ? location
                      : `https://${location}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-primary font-bold inline-flex items-center gap-1 hover:underline text-sm"
                >
                  Join Live Session 🎥
                </a>
              ) : location?.toLowerCase().includes("online") || !location ? (
                <span className="badge badge-info gap-1 text-xs font-bold py-2 px-3 rounded-lg text-white">
                  🌐 Online Webinar
                </span>
              ) : (
                <span
                  className="text-xs max-w-40 block truncate"
                  title={location}
                >
                  🏢 {location}
                </span>
              )}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="opacity-70">📅 Date:</span>
            <span className="font-semibold text-base-content">{date}</span>
          </div>

          {time && (
            <div className="flex justify-between items-center">
              <span className="opacity-70">🕒 Time:</span>
              <span className="font-semibold text-base-content">{time}</span>
            </div>
          )}

          {duration && (
            <div className="flex justify-between items-center">
              <span className="opacity-70">⏳ Duration:</span>
              <span className="font-semibold text-base-content">
                {duration}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="opacity-70">👥 Max Capacity:</span>
            <span className="font-semibold text-base-content">
              {maxAttendees || 15} seats
            </span>
          </div>
        </div>

        <button
          onClick={onToggle}
          disabled={disabled}
          className={`btn w-full font-bold shadow-md transition-all ${buttonClass}`}
        >
          {isUpdating ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <span>{buttonText}</span>
          )}
        </button>
      </div>
    </div>
  );
};
