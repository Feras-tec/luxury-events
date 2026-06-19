import { motion } from "framer-motion";
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";

export const SignIn = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4"
    >
      <div className="max-w-md w-full text-center mb-8 space-y-2">
        <h1 className="text-4xl font-black text-base-content tracking-tight">
          Welcome Back ✨
        </h1>
        <p className="text-sm text-base-content/60">
          Sign in to manage and explore your Developer Workshops.
        </p>
      </div>

      <div className="card w-full max-w-md bg-base-100 border border-base-200 shadow-xl rounded-2xl overflow-hidden">
        <div className="card-body p-1">
          <ClerkSignIn
            signUpUrl="/sign/sign-up"
            forceRedirectUrl="/"
            appearance={{
              variables: {
                borderRadius: "1rem",
              },
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};
