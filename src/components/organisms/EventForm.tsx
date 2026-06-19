import React, { useState } from "react";
import type { Event, EventCategory, EventStatus } from "../../types/event";
import { FormField } from "../atoms/FormField";
import { FormDropdown } from "../atoms/FormDropdown";

type EventFormProps = {
  initialData?: Event;
  onSubmit: (data: Omit<Event, "id" | "attendees">) => void;
  onCancel: () => void;
  isPending: boolean;
  submitButtonText: string;
};

export const EventForm = ({
  initialData,
  onSubmit,
  onCancel,
  isPending,
  submitButtonText,
}: EventFormProps) => {
  const isInitialOnline =
    (initialData?.location &&
      (initialData.location.includes("http") ||
        initialData.location.toLowerCase().includes("online"))) ||
    !initialData?.location;

  const [workshopType, setWorkshopType] = useState<"Online" | "In-Person">(
    isInitialOnline ? "Online" : "In-Person",
  );

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    instructor: initialData?.instructor || "",
    category: (initialData?.category || "workshop") as EventCategory,
    level: initialData?.level || "Beginner",
    location:
      initialData?.location ||
      (isInitialOnline ? "Online (Zoom Link coming soon)" : ""),
    status: (initialData?.status || "published") as EventStatus,
    maxAttendees: initialData?.maxAttendees || 15,
    description: initialData?.description || "",
    date: initialData?.date || "",
    time: initialData?.time || "12:00",
    duration: initialData?.duration || "2 Hours",
    role: initialData?.role || "Instructor",
    requirements: initialData?.requirements || ["Basic knowledge required"],
  });

  const updateField = (
    field: keyof typeof formData,
    value: string | number | string[],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleWorkshopTypeChange = (type: string) => {
    const nextType = type as "Online" | "In-Person";
    setWorkshopType(nextType);

    if (nextType === "Online" && !formData.location.includes("http")) {
      updateField("location", "Online (Zoom Link coming soon)");
    } else if (
      nextType === "In-Person" &&
      (formData.location.includes("http") ||
        formData.location.toLowerCase().includes("online"))
    ) {
      updateField("location", "");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.instructor ||
      !formData.location ||
      !formData.date
    )
      return;

    onSubmit({
      ...formData,
      maxAttendees: Number(formData.maxAttendees),
      createdAt:
        initialData?.createdAt || new Date().toISOString().split("T")[0],
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-base-100 p-8 rounded-3xl border border-base-300 shadow-sm max-w-2xl mx-auto text-base-content"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField
          label="Workshop Title"
          required
          value={formData.title}
          onChange={(e) => updateField("title", e.target.value)}
        />
        <FormField
          label="Instructor Name"
          required
          value={formData.instructor}
          onChange={(e) => updateField("instructor", e.target.value)}
        />
        <FormField
          label="Date"
          type="date"
          required
          value={formData.date}
          onChange={(e) => updateField("date", e.target.value)}
        />
        <FormField
          label="Time"
          type="time"
          required
          value={formData.time}
          onChange={(e) => updateField("time", e.target.value)}
        />
        <FormField
          label="Duration"
          value={formData.duration}
          onChange={(e) => updateField("duration", e.target.value)}
        />

        <FormDropdown
          label="Workshop Hosting Type"
          value={workshopType}
          options={["Online", "In-Person"]}
          onChange={handleWorkshopTypeChange}
        />

        <FormField
          label={
            workshopType === "Online"
              ? "Live Stream Link / Details 🎥"
              : "Venue Location Address 🏢"
          }
          placeholder={
            workshopType === "Online"
              ? "e.g., https://zoom.us/j/..."
              : "e.g., Room A, Berlin Campus"
          }
          required
          value={formData.location}
          onChange={(e) => updateField("location", e.target.value)}
        />

        <FormDropdown
          label="Category"
          value={formData.category}
          options={["workshop", "talk", "networking", "review", "other"]}
          onChange={(val) => updateField("category", val)}
        />
        <FormDropdown
          label="Level"
          value={formData.level}
          options={["Beginner", "Intermediate", "Advanced"]}
          onChange={(val) => updateField("level", val)}
        />
        <FormDropdown
          label="Status"
          value={formData.status}
          options={["draft", "published", "cancelled", "completed"]}
          onChange={(val) => updateField("status", val)}
        />

        <FormField
          label="Max Attendees"
          type="number"
          required
          value={formData.maxAttendees}
          onChange={(e) => updateField("maxAttendees", Number(e.target.value))}
        />
      </div>

      <label className="form-control w-full">
        <div className="label py-1">
          <span className="label-text font-bold text-xs uppercase tracking-wider opacity-70">
            Description
          </span>
        </div>
        <textarea
          value={formData.description}
          onChange={(e) => updateField("description", e.target.value)}
          rows={4}
          className="textarea textarea-bordered w-full bg-base-200/50"
        />
      </label>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-neutral flex-1"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="btn btn-primary flex-1"
        >
          {isPending ? "Saving..." : submitButtonText}
        </button>
      </div>
    </form>
  );
};
