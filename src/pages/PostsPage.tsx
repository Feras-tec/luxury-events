import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!res.ok) {
    throw new Error("Error loading posts");
  }

  return res.json();
}

export function PostsPage() {
  //  Client State
  const [show, setShow] = useState(true);
  const [userId, setUserId] = useState<number | "all">("all");

  //  Server State with Query Key (Filter included)
  const { data, isPending, isError, error, refetch } = useQuery<Post[]>({
    queryKey: ["posts", userId],
    queryFn: fetchPosts,
  });

  // filter logic (Client side)
  const filteredData =
    userId === "all" ? data : data?.filter((post) => post.userId === userId);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Posts Page</h1>

      {/* Client State Controls */}
      <div className="flex gap-2">
        <button className="btn btn-primary" onClick={() => setShow(!show)}>
          Toggle List
        </button>

        <button className="btn btn-secondary" onClick={() => refetch()}>
          Reload
        </button>

        <select
          className="select select-bordered"
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

      {/* Loading */}
      {isPending && <p>Loading...</p>}

      {/* Error */}
      {isError && <p>{error.message}</p>}

      {/* Success */}
      {show && filteredData && (
        <ul className="space-y-2">
          {filteredData.slice(0, 10).map((post) => (
            <li key={post.id} className="p-3 border rounded">
              <h3 className="font-bold">{post.title}</h3>
              <p className="text-sm opacity-70">User: {post.userId}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Info */}
      <div className="text-sm opacity-70">Current Filter: {userId}</div>
    </div>
  );
}
