export default async function Post() {
  const res = await fetch(
    "https://e-connect-server-mbappy404s-projects.vercel.app/post",
    {
      next: {
        revalidate: 0,
      },
    }
  );
  return res.json();
}

export async function SavedPosts() {
  const res = await fetch(
    "https://e-connect-server-mbappy404s-projects.vercel.app/post/saved");
  return res.json();
}

export async function PostDetails(id) {
  const res = await fetch(
    `https://e-connect-server-mbappy404s-projects.vercel.app/postDetails/${id}`,
    {
      cache: "no-store",
    }
  );
  return res.json();
}

export async function UserReport() {
  const res = await fetch(
    "https://e-connect-server-mbappy404s-projects.vercel.app/post/report",
    {
      cache: "no-store",
    }
  );
  return res.json();
}
