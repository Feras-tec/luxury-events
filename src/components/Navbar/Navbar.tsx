import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "../atoms/Button";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { HamburgerButton } from "../atoms/HamburgerButton";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "../atoms/ThemeToggle";
import { navLinks } from "./navbar.config";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="
        sticky top-0
        z-50
        bg-base-100
        border-b
        border-base-300
        shadow-sm
        transition-colors
        duration-300
      "
    >
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="px-6 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-6">
          <HamburgerButton isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />

          <motion.div whileHover={{ scale: 1.03 }}>
            <Link
              to="/"
              className="
                text-xl
                font-bold
                text-primary
                tracking-tight
              "
            >
              DevHub 🚀
            </Link>
          </motion.div>

          <div
            className="
              hidden
              md:flex
              items-center
              gap-1
              text-sm
              font-medium
              text-base-content
            "
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeProps={{
                  className:
                    "text-primary font-semibold bg-base-200 rounded-md",
                }}
                className="
                  px-3
                  py-2
                  rounded-md
                  hover:text-primary
                  hover:bg-base-200
                  transition-all
                  duration-200
                "
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <SignedOut>
            <Button to="/sign/sign-in" variant="text">
              Sign In
            </Button>

            <Button to="/sign/sign-up" variant="primary">
              Sign Up
            </Button>
          </SignedOut>

          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox:
                    "w-9 h-9 border border-base-300 shadow-sm rounded-full hover:scale-105 transition-transform",
                },
              }}
            />
          </SignedIn>
        </div>
      </motion.nav>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
