import { createFileRoute } from "@tanstack/react-router";
import { CreateEvent } from "../../pages/CreateEvent";
import { ProtectedRoute } from "../../auth/ProtectedRoute";

export const Route = createFileRoute("/events/new")({
  component: () => (
    <ProtectedRoute>
      <CreateEvent />
    </ProtectedRoute>
  ),
});
