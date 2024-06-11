"use client";

import { AuthContext } from "@/AuthProvider/Auth";
import PostCard from "../Post/AllPost/PostCard";
import { useContext } from "react";
import Image from "next/image";

const SavedPost = ({ saved, users }) => {
  const { user } = useContext(AuthContext);
  let savedPost = saved.filter((elem) => { return elem.savedUser?.some((ele) => { return ele.savedEmail === user?.email }) }).map(post => post.savedUser)
 
  return (
    <div className=" ">
      <h2 className="text-lg py-2 px-2 bg-[#1E293B] rounded-b-xl border border-gray-700 border-x border-b font-medium text-gray-300">
        Saved Post: {savedPost?.length ? savedPost?.length : "Not Found Saved"}
      </h2>
      {!savedPost?.length && (
        <div className="h-screen flex justify-center flex-col items-center">
          <div>
            <Image
              width={200}
              height={200}
              src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-9887654-8019228.png?f=webp"
              alt="not found"
            />
          </div>
          <p>You didn&apos;t save any post !</p>
        </div>
      )}
      {saved.filter((elem) => {return elem.savedUser?.some((ele) => {return ele.savedEmail === user?.email})}).reverse().map((post) => (
          <PostCard key={post._id} post={post} users={users} />
        ))}
    </div>
  );
};

export default SavedPost;
