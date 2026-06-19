import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "../../pages/SignIn";

export const Route = createFileRoute("/sign/sign-in")({
  component: () => (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn />
    </div>
  ),
});
