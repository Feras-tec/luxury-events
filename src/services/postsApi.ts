export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export async function fetchPosts(userId?: number): Promise<Post[]> {
  const url = userId
    ? `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    : "https://jsonplaceholder.typicode.com/posts";

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Fehler beim Laden der Posts");
  }

  return res.json();
}
