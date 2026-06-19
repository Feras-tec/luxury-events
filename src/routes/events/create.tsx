/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { EventForm } from "../../components/organisms/EventForm";
import type { Event } from "../../types/event";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateEventData = Omit<Event, "id" | "attendees">;

export const Route = createFileRoute("/events/create")({
  component: CreateEventPage,
});

function CreateEventPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync: createEvent, isPending } = useMutation({
    mutationFn: async (newEvent: Event) => {
      return newEvent;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      navigate({ to: "/events" });
    },
  });

  const handleSubmit = async (data: CreateEventData) => {
    await createEvent({
      ...data,
      id: Date.now().toString(),
      attendees: [],
    });
  };

  return (
    <div className="container mx-auto max-w-xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-base-content">
        Create New Event
      </h1>

      <EventForm
        onSubmit={handleSubmit}
        onCancel={() => navigate({ to: "/events" })}
        isPending={isPending}
        submitButtonText="Create Event"
      />
    </div>
  );
}
