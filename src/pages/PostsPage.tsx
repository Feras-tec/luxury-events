import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPosts } from "../services/postsApi";
import type { Post } from "../services/postsApi";

export function PostsPage() {
  const queryClient = useQueryClient();

  const [show, setShow] = useState(true);
  const [userId, setUserId] = useState<number | "all">("all");
  const [shouldSimulateError, setShouldSimulateError] =
    useState<boolean>(false);
  const [customStaleTime, setCustomStaleTime] = useState<number>(0);

  const { data, isPending, isError, error, refetch, isFetching } = useQuery<
    Post[]
  >({
    queryKey: ["posts", userId, shouldSimulateError],
    queryFn: () =>
      fetchPosts(userId === "all" ? undefined : userId, shouldSimulateError),
    staleTime: customStaleTime,
  });

  const filteredData =
    userId === "all" ? data : data?.filter((post) => post.userId === userId);

  return (
    <div className="p-6 space-y-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Posts Page</h1>

      <div className="p-4 bg-gray-100 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-200">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-red-600 font-semibold cursor-pointer">
            <input
              type="checkbox"
              className="checkbox checkbox-error"
              checked={shouldSimulateError}
              onChange={(e) => setShouldSimulateError(e.target.checked)}
            />
            <span>Simulate API Error</span>
          </label>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">staleTime Config:</span>
            <select
              className="select select-bordered select-sm"
              value={customStaleTime}
              onChange={(e) => setCustomStaleTime(Number(e.target.value))}
            >
              <option value={0}>0 Seconds (Stale Instantly)</option>
              <option value={10000}>10 Seconds Fresh</option>
              <option value={30000}>30 Seconds Fresh</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col justify-end gap-2">
          <div className="flex gap-2">
            <button
              className="btn btn-sm btn-outline btn-warning w-1/2"
              onClick={() =>
                queryClient.invalidateQueries({
                  queryKey: ["posts", userId, shouldSimulateError],
                })
              }
            >
              Invalidate Cache
            </button>
            <button
              className="btn btn-sm btn-outline btn-info w-1/2"
              onClick={() =>
                queryClient.refetchQueries({
                  queryKey: ["posts", userId, shouldSimulateError],
                })
              }
            >
              Manual Refetch
            </button>
          </div>
        </div>
      </div>

      <div className="text-xs p-2 bg-blue-50 text-blue-800 rounded border border-blue-200 flex justify-between">
        <span>staleTime: {customStaleTime / 1000}s</span>
        <strong>{isFetching ? "Synchronizing..." : "Cache Idle"}</strong>
      </div>

      <div className="flex gap-2 items-center flex-wrap">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setShow(!show)}
        >
          {show ? "Hide List" : "Show List"}
        </button>

        <button className="btn btn-secondary btn-sm" onClick={() => refetch()}>
          Reload
        </button>

        <select
          className="select select-bordered select-sm"
          value={userId}
          onChange={(e) =>
            setUserId(e.target.value === "all" ? "all" : Number(e.target.value))
          }
        >
          <option value="all">All Users</option>
          <option value={1}>User 1</option>
          <option value={2}>User 2</option>
          <option value={3}>User 3</option>
        </select>
      </div>

      {isPending && (
        <div className="p-8 text-center text-blue-600 font-bold">
          Loading...
        </div>
      )}

      {isError && (
        <div className="p-4 bg-red-100 text-red-700 rounded border border-red-300 font-semibold">
          Error: {error.message}
        </div>
      )}

      {show && filteredData && !isError && (
        <ul className="space-y-4">
          {filteredData.slice(0, 10).map((post) => (
            <li
              key={post.id}
              className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono bg-gray-200 px-2 py-0.5 rounded text-gray-700">
                  ID: {post.id}
                </span>
                <span className="text-xs text-gray-500 font-semibold">
                  User ID: {post.userId}
                </span>
              </div>
              <h3 className="font-bold text-md text-gray-900 capitalize mb-1">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {post.body}
              </p>
            </li>
          ))}
        </ul>
      )}

      {!show && (
        <div className="p-10 text-center text-gray-400 italic border border-dashed border-gray-300 rounded-xl bg-gray-50">
          List view is unmounted. Cache records remain preserved.
        </div>
      )}

      <div className="text-xs opacity-60 font-mono text-right">
        Filter State: {userId}
      </div>
    </div>
  );
}
