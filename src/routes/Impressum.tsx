import { createFileRoute } from "@tanstack/react-router";
import Impressum from "../pages/Impressum";

export const Route = createFileRoute("/Impressum")({
  component: Impressum,
});
