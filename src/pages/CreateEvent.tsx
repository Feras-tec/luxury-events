import { useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";
import { useCreateEvent } from "../hooks/useEvents";
import { EventForm } from "../components/organisms/EventForm";
import type { Workshop } from "../types/event";

export const CreateEvent = () => {
  const router = useRouter();
  const { user } = useUser();
  const { mutate: createEvent, isPending } = useCreateEvent();

  const handleCreate = (formData: Omit<Workshop, "id" | "attendees">) => {
    const realName = user?.fullName || user?.username || "Anonymous Student";

    const newWorkshop: Workshop = {
      ...formData,
      id: crypto.randomUUID(),
      attendees: [],
      instructor: realName,
    };

    createEvent(newWorkshop, {
      onSuccess: () => {
        router.navigate({ to: "/events" });
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-2xl mx-auto"
    >
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Create New Workshop
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Fill in the details below to publish a new session on the EventBoard.
        </p>
      </div>

      <EventForm
        onSubmit={handleCreate}
        onCancel={() => router.navigate({ to: "/events" })}
        isPending={isPending}
        submitButtonText="Create Workshop ✨"
      />
    </motion.div>
  );
};
