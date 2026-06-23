export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) {
    throw new Error("Fehler beim Laden der Beiträge");
  }

  return response.json();
}
export async function createPost(newPost: {
  title: string;
  body: string;
  userId: number;
}) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  if (!response.ok) {
    throw new Error("Fehler beim Erstellen des Posts");
  }

  return response.json();
}
