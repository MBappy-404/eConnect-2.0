"use client";

 
import PostCard from "./PostCard";
const AllPost = ({ posts,users }) => {
  
  return (
    <div>
      {posts?.map((post) => (
        <PostCard key={post._id} users={users} post={post} posts={posts} />
      ))}
    </div>
  );
};

export default AllPost;
