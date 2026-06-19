import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/events/$eventid")({
  component: () => <Outlet />,
});
