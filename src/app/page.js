import CreatePost from "@/components/Create/CreatePost/CreatePost";
import CreateStory from "@/components/Create/CreateStory/CreateStory";
import AllPost from "@/components/Post/AllPost/AllPost";
import  Post  from "@/utils/post";
import Story from "@/utils/story";
import Users from "@/utils/users";

import React from "react";

const Home = async () => {
  // load all posts
  const post = await Post();

  //load all users
  const users = await Users();

  //  load all stories
  const stories = await Story();
  return (
    <div>
      <div className="h-auto">
        {/* <!--middle content--> */}

        <div className="rounded-b-2xl">
          <div className="flex px-2 bg-[#1E293B]  border-x  border-gray-700  py-2">
            <h2 className=" text-lg  font-semibold text-white">Stories</h2>
          </div>
          
          <CreateStory stories={stories} />
        </div>

        <CreatePost />

        <AllPost posts={post} users={users} />
      </div>
    </div>
  );
};

export default Home;
