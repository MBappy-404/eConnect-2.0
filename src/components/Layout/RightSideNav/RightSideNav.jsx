"use client";

import { Badge, Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const RightSideNav = ({ users }) => {
  const pathname = usePathname();
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch top users data
  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        // Step 1: Fetch posts
        const postsResponse = await fetch(
          "https://e-connect-server.vercel.app/post"
        );
        const postsData = await postsResponse.json();

        // Step 2: Count posts per user
        const userPostCounts = {};

        postsData.forEach((post) => {
          const userEmail = post.userEmail;
          const userName = post.postUser;
          const userPhoto = post.postUserPhoto;

          if (userPostCounts[userEmail]) {
            userPostCounts[userEmail].count++;
          } else {
            userPostCounts[userEmail] = {
              count: 1,
              name: userName,
              photo: userPhoto,
              user_email: userEmail,
            };
          }
        });

        // Step 3: Convert to array and sort
        const topUsersArray = Object.values(userPostCounts)
          .sort((a, b) => b.count - a.count)
          .slice(0, 4) // Top 4 users
          .map((user) => ({
            ...user,
            post_count: user.count,
          }));

        setTopUsers(topUsersArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top users:", error);
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, []);

  return (
    <div
      className={`${pathname === "/auth" ? "hidden" : "block"} sticky top-0`}
    >
      <div className="h-auto">
        <div className="max-w-sm rounded-lg m-4 bg-[#1E293B] overflow-hidden shadow-lg">
          <div className="flex px-4 py-3 justify-between">
            <div className="flex-1">
              <h2 className="px-1 text-lg w-48 font-semibold text-white">
                New Peoples
              </h2>
            </div>
          </div>
          <hr className="border-gray-600 mb-4" />
          {users
            ?.slice()
            .reverse()
            .slice(0, 5)
            .map((user) => (
              <div
                key={user._id}
                className="flex mb-3 px-4 py-1 justify-between"
              >
                <div className="flex justify-center items-center gap-4">
                  <Badge
                    showOutline={false}
                    classNames={{ badge: "text-[10px]", content: "-mt-1" }}
                    content="new"
                    color="danger"
                    size="sm"
                  >
                    <div className="w-10 h-10 overflow-hidden relative rounded-full bg-gray-500">
                      {user.updatedPhoto ? (
                        <Image
                          src={user?.updatedPhoto}
                          alt="user"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <i className="fa-solid text-gray-400 fa-circle-user text-[40px]"></i>
                      )}
                    </div>
                  </Badge>
                  <div className="flex flex-col justify-start items-start">
                    <h2 className="text-[13px] font-semibold">
                      {user.updatedName ? user.updatedName : user.name}
                    </h2>
                    <p className="text-xs text-gray-400">Suggested for you</p>
                  </div>
                </div>
                <Button size="sm" radius="full">
                  Follow
                </Button>
              </div>
            ))}
        </div>

        <div className="max-w-sm rounded-lg bg-[#1E293B] overflow-hidden shadow-lg m-4">
          <div className="flex">
            <div className="flex-1 m-2">
              <h2 className="px-4 py-2 text-xl w-48 font-semibold text-white">
                Top Users
              </h2>
            </div>
          </div>

          <hr className="border-gray-600" />

          {loading
            ? // Loading state
              [...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-4 py-3 border-b border-gray-600"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse"></div>
                    <div>
                      <div className="h-3 w-20 bg-gray-700 rounded animate-pulse mb-1"></div>
                      <div className="h-4 w-24 bg-gray-700 rounded animate-pulse mb-1"></div>
                      <div className="h-2 w-16 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="h-8 w-16 bg-gray-700 rounded-full animate-pulse"></div>
                </div>
              ))
            : // Real data
              topUsers.map((user, index) => (
                <div
                  key={user.user_email}
                  className="flex items-center justify-between px-4 py-3 border-b border-gray-600"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden relative bg-gray-700">
                      {user.photo ? (
                        <Image
                          src={user.photo}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <i className="fa-solid fa-circle-user text-[40px] text-gray-400"></i>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">
                          Top . {index + 1}
                      </p>
                      <h2 className="font-bold text-white">{user.name}</h2>
                      <p className="text-xs text-gray-400">
                        {user.post_count} Posts
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    radius="full"
                    variant="light"
                    className="text-gray-400 hover:text-blue-300"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </Button>
                </div>
              ))}

          <div className="flex">
            <div className="flex-1 p-4">
             <Link href="/user-rank">
              <h2 className="px-4 ml-2 w-48 font-bold text-blue-400 cursor-pointer hover:text-blue-300">
                Show more
              </h2>
             </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flow-root m-6 inline">
          <div className="flex-1">
            <p className="text-sm leading-6 font-medium text-gray-500">
              Designed & Developed by Bappy
            </p>
          </div>
          <div className="flex-2">
            <p className="text-sm leading-6 font-medium text-gray-600">
              © 2024 eConnect.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideNav;
