"use client";

import { AuthContext } from "@/AuthProvider/Auth";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

const Notification = ({ notifications }) => {
  console.log(notifications);
  
  const {user} = useContext(AuthContext);
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s",
      s: "Just Now", // Customize seconds format
      m: "1 min ago", // Customize 1 minute format
      mm: "%d min ago", // Customize other minutes format
      h: "1 hour ago",
      hh: "%d hours ago",
      d: "1 day ago",
      dd: "%d days ago",
      M: "1 month ago",
      MM: "%d months ago",
      y: "1 year ago",
      yy: "%d years ago",
    },
  });

  return (
    <div>
      <div class="bg-[#1E293B] mt-2 px-1 md:px-4 py-3 rounded-lg border-x border-gray-600 shadow-md ">
        <div class="flex items-center justify-between">
          <span class="font-medium text-lg">Notifications</span>
        </div>
        {notifications.filter((post)=>post?.userEmail != user?.email).slice().map((notification) => (
          <Link href={`post-details/${notification._id}`}
            key={notification._id}
            class="flex items-center  hover:bg-gray-700  transition-all duration-300  rounded-lg px-2 py-3 cursor-pointer"
          >
            <div class="flex   overflow-hidden  border border-gray-600  relative w-12 h-12 rounded-full ">
              {notification?.postUserPhoto ? (
                <Image
                  objectFit="cover"
                  src={notification.postUserPhoto}
                  fill
                  alt="Woman paying for a purchase"
                />
              ) : (
                <i class="fa-solid fa-circle-user text-5xl"></i>
              )}
            </div>
            <div className="ml-3">
              <span className="font-semibold tracking-tight text-gray-300 text-base">
                {notification.postUser ? notification.postUser : "Someone"}
              </span>
              <span className="text-sm ml-2 leading-none font-semibold text-gray-400 ">
              {notification.type === "profilePicture" ? "Update his profile picture." :<>  {notification.image ? "Posted a photo" : "Write a post"}.</>}
              </span>
              {notification.post && notification.post.length > 15 ? (
                <p className="text-sm leading-4    opacity-70">
                  &quot;{notification.post.slice(0, 15)}...&quot;
                </p>
              ) : (
                <p className="text-sm leading-4    opacity-70">
                  {notification.post ? (
                    <>&quot;{notification.post}&quot;</>
                  ) : (
                    ""
                  )}
                </p>
              )}
              <span className="text-xs block text-gray-400 font-medium leading-4">
                {" "}
                {moment(`${notification.time}`).fromNow()}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Notification;
