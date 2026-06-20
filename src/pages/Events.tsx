import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useUser } from "@clerk/clerk-react";
import { useEvents } from "../hooks/useEvents";
import { SearchBar } from "../components/molecules/SearchBar";
import { FilterBar } from "../components/molecules/FilterBar";
import { EventCard } from "../components/molecules/EventCard";

export const Events = () => {
  const { data: workshops = [], isLoading, isError } = useEvents();
  const { user, isSignedIn } = useUser();

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  const isAdmin =
    isSignedIn &&
    user?.primaryEmailAddress?.emailAddress === "fr0000911@gmail.com";

  const userCreatedCount = workshops.filter(
    (workshop) => workshop.instructor === (user?.fullName || user?.username),
  ).length;

  const LIMIT_FOR_REGULAR_USER = 1;
  const canCreateMore = isAdmin || userCreatedCount < LIMIT_FOR_REGULAR_USER;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-12 text-error">Error loading data</div>
    );

  const filteredWorkshops = workshops.filter((workshop) => {
    const matchesSearch =
      workshop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workshop.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      workshop.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const sortedWorkshops = [...filteredWorkshops].sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "date")
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    return 0;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-base-content tracking-tight">
            Explore Workshops
          </h1>
          <p className="text-sm text-base-content/60 mt-1">
            Discover and register for upcoming technical sessions.
          </p>
        </div>

        {!isSignedIn ? (
          <Link
            to="/sign/sign-in"
            className="btn btn-outline btn-sm rounded-xl"
          >
            Sign In to Create
          </Link>
        ) : canCreateMore ? (
          <Link
            to="/events/new"
            className="btn btn-primary btn-sm rounded-xl px-6"
          >
            Create New Workshop
          </Link>
        ) : (
          <div
            className="tooltip tooltip-left"
            data-tip="You have reached your workshop creation limit (Max: 1)"
          >
            <button
              disabled
              className="btn btn-neutral btn-sm rounded-xl px-6 opacity-50 cursor-not-allowed"
            >
              Limit Reached 🚫
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 bg-base-200/50 p-4 rounded-2xl border border-base-200 items-center">
        <div className="w-full lg:flex-1">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4 items-center">
          <FilterBar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-bordered select-sm w-full sm:w-48 bg-base-100 rounded-xl"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort Alphabetically</option>
          </select>
        </div>
      </div>

      {sortedWorkshops.length === 0 ? (
        <div className="text-center py-12 bg-base-100 rounded-2xl border border-base-200 text-base-content/50 text-sm">
          No workshops found matching your criteria. 🔍
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sortedWorkshops.map((workshop) => (
            <motion.div key={workshop.id} variants={itemVariants}>
              <EventCard workshop={workshop} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};
