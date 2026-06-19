import { motion } from "framer-motion";

interface FilterBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const FilterBar = ({
  selectedCategory,
  onCategoryChange,
}: FilterBarProps) => {
  const categories = ["All", "Frontend", "Backend", "Fullstack"];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((category) => {
        const isActive = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className="relative px-4 py-2 rounded-xl text-xs font-semibold transition-colors focus:outline-none"
          >
            {isActive && (
              <motion.span
                layoutId="activeFilter"
                className="absolute inset-0 bg-blue-600 rounded-xl -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span
              className={
                isActive ? "text-white" : "text-gray-500 hover:text-gray-900"
              }
            >
              {category}
            </span>
          </button>
        );
      })}
    </div>
  );
};
