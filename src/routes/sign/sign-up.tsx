import { createFileRoute } from "@tanstack/react-router";
import { SignUp } from "../../pages/SignUp";

export const Route = createFileRoute("/sign/sign-up")({
  component: () => (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp />
    </div>
  ),
});
