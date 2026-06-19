import { motion } from "framer-motion";

export const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto py-12 space-y-16"
    >
      <section className="text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-black text-base-content tracking-tighter">
          Level Up <br />
          <span className="text-primary">Together.</span>
        </h1>
        <p className="text-base-content/70 text-xl max-w-xl mx-auto">
          DevHub is where modern developers share knowledge and build the future
          through live workshops.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: "Our Mission 🎯",
            desc: "To bridge the gap between theoretical knowledge and real-world production code by connecting experts with the next generation of engineers.",
          },
          {
            title: "The Platform 🚀",
            desc: "Built with the modern stack: React 19, TypeScript, TanStack Query, and Framer Motion for a seamless, blazing-fast experience.",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8 }}
            className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="card-body">
              <h3 className="card-title text-lg font-bold">{card.title}</h3>
              <p className="text-sm text-base-content/70 leading-relaxed">
                {card.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center pt-12 border-t border-base-200">
        <p className="text-xs font-bold text-base-content/40 uppercase tracking-[0.2em] mb-8">
          Built with love for developers
        </p>
        <div className="flex justify-center items-center gap-8 text-3xl opacity-70">
          <motion.span whileHover={{ scale: 1.2 }}>⚛️</motion.span>
          <motion.span
            whileHover={{ scale: 1.1 }}
            className="text-base font-bold font-mono text-base-content"
          >
            TS
          </motion.span>
          <motion.span whileHover={{ scale: 1.2 }}>🎨</motion.span>
        </div>
      </div>
    </motion.div>
  );
};
