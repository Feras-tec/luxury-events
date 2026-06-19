export type EventStatus = "draft" | "published" | "cancelled" | "completed";

export type EventCategory =
  | "workshop"
  | "talk"
  | "networking"
  | "review"
  | "other";

export interface Attendee {
  id: string;
  name: string;
  role: string;
  email: string;
}

export interface Event {
  id: string;
  title: string;
  instructor: string;
  role: string;
  date: string;
  time: string;
  duration: string;
  category: EventCategory;
  level: string;
  description: string;
  requirements: string[];
  location: string;
  status: EventStatus;
  maxAttendees: number;
  attendees: Attendee[];
  createdAt: string;
}

export type Workshop = Event;
