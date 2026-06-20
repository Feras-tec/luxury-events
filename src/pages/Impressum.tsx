import { motion } from "framer-motion";

export default function Impressum() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-2xl mx-auto py-12 px-6"
    >
      <h1 className="text-3xl font-bold mb-6">Impressum</h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="bg-base-100 shadow-sm p-6 rounded-lg"
      >
        <h2 className="text-xl font-semibold mb-2">Angaben gemäß § 5 TMG</h2>
        <p className="mb-4">
          Hamburg
          <br />
          Musterstraße 1<br />
          12345 Musterstadt
        </p>

        <h2 className="text-xl font-semibold mb-2">Kontakt</h2>
        <p className="mb-4">
          Telefon: 0123 456789
          <br />
          E-Mail: fr0000911@gmail.com
        </p>

        <h2 className="text-xl font-semibold mb-2">Haftungsausschluss</h2>
        <p>
          Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung
          für die Inhalte externer Links.
        </p>
      </motion.div>
    </motion.div>
  );
}
