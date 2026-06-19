import { createFileRoute } from "@tanstack/react-router";
import { EditEvent } from "../../pages/EditEvent";
import { ProtectedRoute } from "../../auth/ProtectedRoute";

export const Route = createFileRoute("/events/$eventid/edit")({
  component: () => (
    <ProtectedRoute>
      <EditEvent />
    </ProtectedRoute>
  ),
});
