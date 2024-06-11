export default async function Story(){

    const res = await fetch('https://e-connect-server.vercel.app/story',{
        next:{
            revalidate: 0,
        }
    });
    return  res.json();
}

export async function StoryDetails(id) {
    const res = await fetch(`https://e-connect-server.vercel.app/story/${id}`, {
      cache: "no-store",
    });
    return  res.json();
  }