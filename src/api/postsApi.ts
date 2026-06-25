export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export type NewPost = Omit<Post, "id">;

export async function fetchPosts(
  userId?: number,
  triggerError?: boolean,
): Promise<Post[]> {
  const url = triggerError
    ? "https://jsonplaceholder.typicode.com/invalid-route-error-simulation"
    : userId
      ? `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      : "https://jsonplaceholder.typicode.com/posts";

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Fehler beim Laden der Posts");
  }
  return res.json();
}

export async function createPost(newPost: NewPost): Promise<Post> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  if (!res.ok) {
    throw new Error("Fehler beim Erstellen des Posts");
  }

  return res.json();
}
export async function deletePost(id: number): Promise<void> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Fehler beim Löschen des Posts");
  }
}
