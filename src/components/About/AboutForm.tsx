import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Mail, User, Briefcase, Send } from "lucide-react";

type ContactInput = {
  name: string;
  email: string;
  message: string;
};

interface AboutFormProps {
  variants: Variants;
}

const ErrorMessage = ({ children }: { children?: string }) => (
  <AnimatePresence>
    {children && (
      <motion.p
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="text-error text-xs font-semibold mt-1.5 px-1"
      >
        {children}
      </motion.p>
    )}
  </AnimatePresence>
);

export const AboutForm: React.FC<AboutFormProps> = ({ variants }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ mode: "onBlur" });

  const onSubmit = useCallback(
    (data: ContactInput) => {
      console.log("Kontaktformular:", data);
      alert("Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. ✨");
      reset();
    },
    [reset],
  );

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={3}
      className="md:col-span-2 card bg-base-100 border border-base-200 shadow-sm"
    >
      <div className="card-body p-8">
        <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
          <Briefcase className="text-primary" />
          Kontakt aufnehmen
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-bold text-xs uppercase tracking-wider text-base-content/70">
                Name
              </span>
            </label>
            <div className="input input-bordered flex items-center gap-3 w-full h-12 bg-base-200/50 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all rounded-xl px-4">
              <User className="opacity-60 text-primary w-5 h-5" />
              <input
                className="w-full bg-transparent border-none outline-none text-base-content placeholder:text-base-content/30"
                placeholder="Max Mustermann"
                autoComplete="name"
                {...register("name", { required: "Name ist erforderlich" })}
              />
            </div>
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
          </div>

          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-bold text-xs uppercase tracking-wider text-base-content/70">
                E-Mail-Adresse
              </span>
            </label>
            <div className="input input-bordered flex items-center gap-3 w-full h-12 bg-base-200/50 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all rounded-xl px-4">
              <Mail className="opacity-60 text-primary w-5 h-5" />
              <input
                type="email"
                className="w-full bg-transparent border-none outline-none text-base-content placeholder:text-base-content/30"
                placeholder="max@example.de"
                autoComplete="email"
                {...register("email", {
                  required: "E-Mail-Adresse ist erforderlich",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Bitte eine gültige E-Mail-Adresse eingeben",
                  },
                })}
              />
            </div>
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </div>

          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-bold text-xs uppercase tracking-wider text-base-content/70">
                Nachricht
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full h-36 bg-base-200/50 focus:ring-2 focus:ring-primary focus:border-primary transition-all rounded-xl p-4 text-base-content text-base placeholder:text-base-content/30 resize-y" // 👈 تم التغيير إلى resize-y هنا
              placeholder="Ihre Nachricht..."
              {...register("message", {
                required: "Nachricht ist erforderlich",
              })}
            />
            <ErrorMessage>{errors.message?.message}</ErrorMessage>
          </div>

          <div className="form-control pt-2">
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              type="submit"
              className="btn btn-primary w-full h-12 rounded-xl gap-2 text-white font-bold text-base shadow-md hover:shadow-lg transition-all"
            >
              <Send size={18} />
              Nachricht senden
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
