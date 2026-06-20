export const Footer = () => {
  return (
    <footer className="footer footer-center p-6 bg-base-100 border-t border-base-200 text-base-content/60">
      <aside>
        <p className="text-xs">
          &copy; {new Date().getFullYear()} Developer Workshop Hub. Alle Rechte
          vorbehalten.
        </p>
      </aside>
    </footer>
  );
};
