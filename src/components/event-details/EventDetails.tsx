import { useParams, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  useEventDetails,
  useUpdateEvent,
  useDeleteEvent,
} from "../../hooks/useEvents";
import { AttendeeItem } from "../molecules/AttendeeItem";
import { useUser } from "@clerk/clerk-react";

import { EventActions } from "./EventActions";
import { RegistrationCard } from "./RegistrationCard";

export const EventDetails = () => {
  const { eventid } = useParams({ strict: false }) as { eventid: string };
  const { user } = useUser();
  const navigate = useNavigate();

  const { data: workshop, isLoading, isError } = useEventDetails(eventid);
  const { mutate: updateEvent, isPending: isUpdating } = useUpdateEvent();
  const { mutate: deleteEvent, isPending: isDeleting } = useDeleteEvent();

  if (isLoading)
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  if (isError || !workshop)
    return (
      <div className="text-center py-20 text-error font-semibold">
        Workshop not found!
      </div>
    );

  const currentAttendees = workshop.attendees || [];
  const isRegistered = user
    ? currentAttendees.some((att) => att.id === user.id)
    : false;
  const isFull = currentAttendees.length >= (workshop.maxAttendees || 15);

  const currentEmail = user?.primaryEmailAddress?.emailAddress
    ?.toLowerCase()
    .trim();
  const adminEmail = "fr0000911@gmail.com".toLowerCase().trim();

  const isAdmin = currentEmail === adminEmail;

  console.log("=== Admin Debug ===", { currentEmail, adminEmail, isAdmin });

  const handleRegistrationToggle = () => {
    if (!user) return;
    let updatedAttendees = [...currentAttendees];

    if (isRegistered) {
      updatedAttendees = updatedAttendees.filter((att) => att.id !== user.id);
    } else {
      updatedAttendees.push({
        id: user.id,
        name: user.fullName || user.username || "Anonymous Student",
        role: "Developer",
        email: user.primaryEmailAddress?.emailAddress || "no-email@dev.com",
      });
    }
    updateEvent({ ...workshop, attendees: updatedAttendees });
  };

  const handleDeleteWorkshop = () => {
    if (!isAdmin) {
      alert("Unauthorized! Only admins can delete workshops.");
      return;
    }
    if (confirm("Are you sure you want to permanently delete this workshop?")) {
      deleteEvent(eventid, { onSuccess: () => navigate({ to: "/events" }) });
    }
  };

  const getButtonText = () => {
    if (!user) return "Please Login to Register";
    if (isUpdating) return "Processing...";
    if (isRegistered) return "Cancel My Registration ❌";
    if (isFull) return "Workshop is Full 🚫";
    return "Enroll Now 🚀";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-8 pb-12 px-4"
    >
      <EventActions
        isAdmin={isAdmin}
        isDeleting={isDeleting}
        onDelete={handleDeleteWorkshop}
        eventid={eventid}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-3">
            <div className="flex gap-2 items-center">
              <span className="badge badge-primary font-bold uppercase text-[10px]">
                {workshop.category}
              </span>
              <span className="badge badge-neutral font-bold uppercase text-[10px]">
                {workshop.level}
              </span>
            </div>
            <h1 className="text-4xl font-black text-base-content tracking-tight">
              {workshop.title}
            </h1>
            <p className="text-sm text-base-content/60">
              Hosted by{" "}
              <span className="font-semibold text-base-content">
                {workshop.instructor}
              </span>
            </p>
          </div>

          <div className="card bg-base-100 border border-base-200 shadow-xs">
            <div className="card-body p-8">
              <h2 className="card-title text-base-content text-lg font-bold">
                About this Workshop
              </h2>
              <p className="text-base-content/80 text-sm leading-relaxed whitespace-pre-line mt-2">
                {workshop.description}
              </p>
            </div>
          </div>

          <div className="card bg-base-100 border border-base-200 shadow-xs">
            <div className="card-body p-8">
              <h2 className="card-title text-base-content text-lg font-bold">
                Attendees ({currentAttendees.length})
              </h2>
              {currentAttendees.length === 0 ? (
                <p className="text-sm text-base-content/50 mt-2">
                  No one has registered yet. Be the first!
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {currentAttendees.map((person, index) => (
                    <AttendeeItem
                      key={person.id || index}
                      name={person.name}
                      role={person.role || "Developer"}
                      email={person.email}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <RegistrationCard
            status={workshop.status}
            location={workshop.location}
            date={workshop.date}
            time={workshop.time}
            duration={workshop.duration}
            maxAttendees={workshop.maxAttendees}
            isUpdating={isUpdating}
            disabled={isUpdating || !user || (!isRegistered && isFull)}
            buttonClass={isRegistered ? "btn-error" : "btn-primary"}
            buttonText={getButtonText()}
            onToggle={handleRegistrationToggle}
          />
        </div>
      </div>
    </motion.div>
  );
};
