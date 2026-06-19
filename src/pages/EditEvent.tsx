import { useParams, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEventDetails, useUpdateEvent } from "../hooks/useEvents";
import { EventForm } from "../components/organisms/EventForm";
import type { Workshop } from "../types/event";

export const EditEvent = () => {
  const router = useRouter();

  const { eventid } = useParams({ strict: false }) as { eventid: string };

  const { data: workshop, isLoading, isError } = useEventDetails(eventid);
  const { mutate: updateEvent, isPending } = useUpdateEvent();

  if (isLoading)
    return (
      <div className="text-center py-12 text-gray-500">Loading data...</div>
    );
  if (isError || !workshop)
    return (
      <div className="text-center py-12 text-red-500">Workshop not found!</div>
    );

  const handleUpdate = (formData: Omit<Workshop, "id" | "attendees">) => {
    const updatedWorkshop: Workshop = {
      ...workshop,
      ...formData,
      attendees: workshop?.attendees || [],
    };

    updateEvent(updatedWorkshop, {
      onSuccess: () => {
        router.navigate({
          to: "/events/$eventid",
          params: { eventid },
          search: { edit: false },
        });
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
          Edit Workshop
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Modify the fields below to update the workshop details.
        </p>
      </div>

      <EventForm
        initialData={workshop}
        onSubmit={handleUpdate}
        onCancel={() =>
          router.navigate({
            to: "/events/$eventid",
            params: { eventid },
            search: { edit: false },
          })
        }
        isPending={isPending}
        submitButtonText="Save Changes 💾"
      />
    </motion.div>
  );
};
