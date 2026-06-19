import type { Workshop } from "../types/event";

const LOCAL_STORAGE_KEY = "event_board_workshops";

const initialWorkshops: Workshop[] = [
  {
    id: "1",
    title: "React Basics Workshop",
    instructor: "Sarah Al-Farsi",
    role: "Instructor",
    date: "2026-06-20",
    time: "10:00",
    duration: "3 Hours",
    category: "workshop",
    level: "Beginner",
    description: "Learn the core principles of React.",
    requirements: ["Basic JavaScript knowledge"],
    location: "Hamburg / Online",
    status: "published",
    maxAttendees: 15,
    attendees: [
      {
        id: "a1",
        name: "Marc Schneider",
        role: "UX Designer",
        email: "marc@example.com",
      },
      {
        id: "a2",
        name: "Leila Ahmed",
        role: "Frontend Lead",
        email: "leila@example.com",
      },
    ],
    createdAt: "2026-06-17",
  },
  {
    id: "2",
    title: "Node.js Advanced Architecture",
    instructor: "John Doe",
    role: "Senior Architect",
    date: "2026-06-25",
    time: "14:00",
    duration: "4 Hours",
    category: "talk",
    level: "Advanced",
    description: "Deep dive into Event Loop and microservices.",
    requirements: ["Good Node.js understanding"],
    location: "Campus Room 4",
    status: "published",
    maxAttendees: 10,
    attendees: [
      {
        id: "a3",
        name: "Feras",
        role: "Web Developer",
        email: "feras@example.com",
      },
    ],
    createdAt: "2026-06-17",
  },
];

export const workshopService = {
  getAllWorkshops: async (): Promise<Workshop[]> => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialWorkshops));
      return initialWorkshops;
    }
    return JSON.parse(data);
  },

  getWorkshopById: async (id: string): Promise<Workshop> => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    const workshops: Workshop[] = data ? JSON.parse(data) : initialWorkshops;
    const workshop = workshops.find((w) => w.id === id);
    if (!workshop) throw new Error("Workshop not found");
    return workshop;
  },

  createWorkshop: async (newWorkshop: Workshop): Promise<Workshop> => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    const workshops: Workshop[] = data ? JSON.parse(data) : [];
    workshops.push(newWorkshop);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(workshops));
    return newWorkshop;
  },

  updateWorkshop: async (updatedWorkshop: Workshop): Promise<Workshop> => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    let workshops: Workshop[] = data ? JSON.parse(data) : [];
    workshops = workshops.map((w) =>
      w.id === updatedWorkshop.id ? updatedWorkshop : w,
    );
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(workshops));
    return updatedWorkshop;
  },

  deleteWorkshop: async (id: string): Promise<void> => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    let workshops: Workshop[] = data ? JSON.parse(data) : [];
    workshops = workshops.filter((w) => w.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(workshops));
  },
};
