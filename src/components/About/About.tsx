import { motion, type Variants } from "framer-motion";
import { FaReact } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { AboutHeader } from "./AboutHeader";
import { AboutProfile } from "./AboutProfile";
import { AboutTechStack } from "./AboutTechStack";
import { AboutForm } from "./AboutForm";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: delay * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

export const About = () => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto pt-12 pb-24 px-4 sm:px-6 lg:px-8 space-y-24"
    >
      <AboutHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-6">
          <AboutProfile variants={cardVariants} />
          <AboutTechStack variants={cardVariants} />
        </div>

        <AboutForm variants={cardVariants} />
      </div>

      <footer className="text-center pt-12 border-t border-base-200 mt-16 space-y-6">
        <p className="text-sm font-bold text-base-content/60 uppercase tracking-widest">
          Mit Leidenschaft für{" "}
          <span className="text-primary font-black">Entwickler</span> entwickelt
        </p>

        <div className="flex justify-center items-center gap-8 text-3xl select-none">
          <motion.span
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="cursor-pointer text-info"
          >
            <FaReact />
          </motion.span>

          <motion.span
            whileHover={{ scale: 1.2, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="cursor-pointer text-primary text-2xl"
          >
            <SiTypescript />
          </motion.span>

          <motion.span
            whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
            className="cursor-pointer"
          >
            🎨
          </motion.span>
        </div>
      </footer>
    </motion.main>
  );
};
