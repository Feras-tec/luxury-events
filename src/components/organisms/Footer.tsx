import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="footer footer-center bg-base-200 text-base-content p-6 mt-10 border-t border-base-300"
    >
      <aside>
        <p className="font-semibold text-lg">Project Feras</p>
        <p className="opacity-70 text-sm">© 2026 - Alle Rechte vorbehalten</p>

        <a
          href="/impressum"
          className="link link-hover text-secondary mt-2 block"
        >
          Impressum
        </a>

        <a
          href="https://github.com/Feras-tec"
          target="_blank"
          className="link link-hover text-primary mt-2 block"
        >
          Besuchen Sie uns auf GitHub
        </a>
      </aside>
    </motion.footer>
  );
}
