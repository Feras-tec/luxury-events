import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "../components/Navbar/Navbar";
import { motion } from "framer-motion";
import Footer from "../components/organisms/Footer";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-base-200/30 flex flex-col w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full flex-1"
        >
          <Outlet />
        </motion.div>
      </main>

      <Footer />
    </div>
  ),
});
