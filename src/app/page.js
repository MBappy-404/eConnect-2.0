import Post from "@/utils/post";
import Story from "@/utils/story";
import Users from "@/utils/users";
import dynamic from "next/dynamic";

// export async function genarateStaticParams() {
//   const posts = await Post();
//   return posts.map((post) => ({
//     id: post._id,
//   }));
// }

const DynamicStory = dynamic(
  () => import("@/components/Create/CreateStory/CreateStory"),
  { ssr: false }
);
const AllPostDynamic = dynamic(
  () => import("@/components/Post/AllPost/AllPost"),
  { ssr: false }
);
const CreatePostDyamic = dynamic(
  () => import("@/components/Create/CreatePost/CreatePost"),
  { ssr: false }
);

const page = async () => {
  // load all posts
  const post = await Post();

  //load all users
  const users = await Users();

  //  load all stories
  const stories = await Story();
  return (
    <section>
      <div className="h-auto">
        {/* <!--middle content--> */}

        <div className="rounded-b-2xl">
          <div className="flex px-2 bg-[#1E293B]  border-x  border-gray-700  py-2">
            <h2 className=" text-lg  font-semibold text-white">Stories</h2>
          </div>

          {/* create story modal  */}
          <div>
            <DynamicStory stories={stories} />
          </div>
        </div>

        {/* create post modal  */}
        <div>
          <CreatePostDyamic />
        </div>

        {/* all posts render  */}
        <div>
          <AllPostDynamic posts={post} users={users} />
        </div>
      </div>
    </section>
  );
};

export default page;
