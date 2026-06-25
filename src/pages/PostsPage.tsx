import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  usePostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} from "../api/usePosts";

export function PostsPage() {
  const queryClient = useQueryClient();

  const [show, setShow] = useState(true);
  const [userId, setUserId] = useState<number | "all">("all");
  const [shouldSimulateError, setShouldSimulateError] =
    useState<boolean>(false);
  const [customStaleTime, setCustomStaleTime] = useState<number>(0);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { data, isPending, isError, error, refetch, isFetching } =
    usePostsQuery(userId, shouldSimulateError, customStaleTime);

  const mutation = useCreatePostMutation(() => {
    setTitle("");
    setBody("");
  });

  const deleteMutation = useDeletePostMutation(userId, shouldSimulateError);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;

    mutation.mutate({
      title,
      body,
      userId: 1,
    });
  };

  const filteredData =
    userId === "all" ? data : data?.filter((post) => post.userId === userId);

  return (
    <div className="p-6 space-y-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Posts Page & Mutations</h1>

      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm space-y-3"
      >
        <h2 className="text-lg font-semibold text-gray-800">
          Neuen Post erstellen
        </h2>

        <div className="grid grid-cols-1 gap-3">
          <input
            type="text"
            placeholder="Titel"
            className="input input-bordered input-sm w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={mutation.isPending}
          />
          <textarea
            placeholder="Inhalt (Body)"
            className="textarea textarea-bordered textarea-sm w-full"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={mutation.isPending}
          />
        </div>

        <button
          type="submit"
          className="btn btn-sm btn-success text-white"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Wird gespeichert..." : "Post Absenden"}
        </button>

        {mutation.isError && (
          <div className="text-xs text-red-600 font-semibold">
            Fehler: {mutation.error.message}
          </div>
        )}
      </form>

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
              className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm flex justify-between items-start gap-4"
            >
              <div className="flex-1">
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
              </div>
              <button
                onClick={() => deleteMutation.mutate(post.id)}
                className="btn btn-xs btn-error text-white"
              >
                Löschen
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
