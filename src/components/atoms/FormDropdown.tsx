import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FormDropdownProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
};

export const FormDropdown = ({
  label,
  value,
  options,
  onChange,
}: FormDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <label className="form-control w-full relative">
      <div className="label py-1">
        <span className="label-text font-bold text-xs uppercase tracking-wider opacity-70">
          {label}
        </span>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="input input-bordered w-full bg-base-200/50 flex items-center justify-between text-left cursor-pointer"
      >
        <span>{value || "Select..."}</span>

        <span
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-100 mt-1 w-full bg-base-100 border border-base-300 rounded-xl shadow-xl p-2"
          >
            {options.map((opt, index) => (
              <li key={`${opt}-${index}`}>
                <button
                  type="button"
                  className={`w-full text-left p-2 rounded-md transition ${
                    value === opt
                      ? "bg-primary text-primary-content"
                      : "hover:bg-base-200"
                  }`}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                  }}
                >
                  {opt}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </label>
  );
};
