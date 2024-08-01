export default async function Users() {
  const res = await fetch(
    "https://e-connect-server-mbappy404s-projects.vercel.app/users",
    {
      next: {
        revalidate: 0,
      },
    }
  );

  return res.json();
}

export async function UsersDetails(id) {
  const res = await fetch(
    `https://e-connect-server-mbappy404s-projects.vercel.app/user/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}
