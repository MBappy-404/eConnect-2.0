"use client";

import { useState } from "react";
import PostCard from "./PostCard";

const AllPost = ({ posts, users }) => {
  const PAGE_SIZE = 10; // how many posts per load

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visiblePosts = posts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  return (
    <div>
      {/* visible posts */}
      {visiblePosts.map((post) => (
        <PostCard
          key={post._id}
          users={users}
          post={post}
          posts={visiblePosts}
        />
      ))}

      {/* load more button */}
      {visibleCount < posts.length && (
        <div className="flex justify-center py-4">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default AllPost;
