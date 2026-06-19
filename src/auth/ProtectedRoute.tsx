import { type ReactNode } from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "@tanstack/react-router";

interface ProtectedRouteProps {
  children?: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign/sign-in" />;
  }

  return children ?? <Outlet />;
};
