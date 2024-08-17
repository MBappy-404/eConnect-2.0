export default async function Post() {
  const res = await fetch("https://e-connect-server.vercel.app/post", {
    next: {
      revalidate: 0,
    },
  });
  return res.json();
}

export async function SavedPosts() {
  const res = await fetch("https://e-connect-server.vercel.app/post/saved");
  return res.json();
}

export async function PostDetails(id) {
  const res = await fetch(
    `https://e-connect-server.vercel.app/postDetails/${id}`,
    {
      next: {
        revalidate: 0,
      },
    }
  );
  return res.json();
}

export async function UserReport() {
  const res = await fetch("https://e-connect-server.vercel.app/post/report", {
    next: {
      revalidate: 0,
    },
  });
  return res.json();
}
