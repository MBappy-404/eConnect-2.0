import Profile from "@/components/Profile/Profile";
import  Post  from "@/utils/post";
import Users from "@/utils/users";

const page = async() => {
     const users = await Users();

    const posts = await Post();
  return (
    <div>
      <Profile users={users} posts={posts}/>
    </div>
  );
};

export default page;
