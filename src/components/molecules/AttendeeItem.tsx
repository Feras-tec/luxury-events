import { motion } from "framer-motion";

interface AttendeeItemProps {
  name: string;
  role: string;
  email?: string;
  avatarUrl?: string;
}

export const AttendeeItem = ({
  name,
  role,
  email,
  avatarUrl,
}: AttendeeItemProps) => {
  const initial = name.charAt(0).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{
        x: 4,
        backgroundColor: "var(--fallback-b2, oklch(var(--b2)))",
      }}
      className="flex items-center justify-between p-3 rounded-2xl border border-transparent hover:border-base-200 transition-all cursor-default"
    >
      <div className="flex items-center gap-3">
        <div className="avatar">
          {avatarUrl ? (
            <div className="w-9 h-9 rounded-full border border-base-200">
              <img src={avatarUrl} alt={name} />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold text-sm shadow-sm">
              {initial}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-base-content">{name}</h4>

          <p className="text-xs text-base-content/60">
            {role}{" "}
            {email && <span className="text-base-content/40 mx-1">•</span>}
            {email && (
              <span className="text-primary/80 font-medium">{email}</span>
            )}
          </p>
        </div>
      </div>
      <span
        className="w-2 h-2 rounded-full bg-success shadow-sm"
        title="Confirmed Attendee"
      />
    </motion.div>
  );
};
