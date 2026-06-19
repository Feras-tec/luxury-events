import { motion } from "framer-motion";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex-1"
    >
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        🔍
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for workshops, instructors..."
        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50/50 transition-all shadow-xs"
      />
    </motion.div>
  );
};
