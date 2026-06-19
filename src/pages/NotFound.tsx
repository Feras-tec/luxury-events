import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

export const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6"
    >
      <div className="text-7xl mb-6">🔍</div>
      <h1 className="text-4xl font-black text-base-content tracking-tight">
        Page Not Found
      </h1>
      <p className="mt-4 text-base-content/60 max-w-sm">
        Oops! The page you are looking for seems to have vanished into the
        digital void.
      </p>

      <div className="mt-8">
        <Link to="/" className="btn btn-primary btn-wide rounded-xl shadow-lg">
          Return to Dashboard
        </Link>
      </div>
    </motion.div>
  );
};
