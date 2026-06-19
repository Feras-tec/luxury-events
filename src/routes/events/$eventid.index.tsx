import { createFileRoute } from "@tanstack/react-router";
import { EventDetails } from "../../components/event-details/EventDetails";

export const Route = createFileRoute("/events/$eventid/")({
  validateSearch: (search: Record<string, unknown>) => ({
    edit: search.edit === true || search.edit === "true",
  }),
  component: () => <EventDetails />,
});
