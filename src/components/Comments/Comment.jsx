"use client";

import { AuthContext } from "@/AuthProvider/Auth";
import { Button } from "@nextui-org/react";
import moment from "moment";
import Image from "next/image";
import { useContext } from "react";
import {
  useDisclosure,
} from "@nextui-org/react";
import badge from "@/assets/verified.svg";
import { useRouter } from "next/navigation";
import CommentModal from "./CommentModal";
import Link from "next/link";

const Comment = ({ comments, post, users }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const { user } = useContext(AuthContext);
  let name = users
    ?.filter((users) => {
      return users.email === user?.email;
    })
    .map((eUser) => eUser.name);
  let updatedName = users
    ?.filter((users) => {
      return users.email === user?.email;
    })
    .map((eUser) => eUser.updatedName);
  let postUser = updatedName[0] ? updatedName[0] : name[0];
  let updatedPhoto = users
    ?.filter((users) => {
      return users.email === user?.email;
    })
    .map((eUser) => eUser?.updatedPhoto);
  let commentUserId = users
    .filter((users) => {
      return users.email === user?.email;
    })
    .map((eUser) => eUser._id);

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

  const photo = updatedPhoto[0] ? updatedPhoto[0]  : (user?.photoURL ? user?.photoURL : null)
  return (
    <div className="">
      <h2 className="text-lg p-2 font-medium text-gray-300">
        {comments?.length > 0 && "Comments"}
      </h2>
      {comments?.length ? (
        comments
          ?.slice()
          .reverse()
          .slice(0, 3)
          .map((comment, index) => (
            <div key={index} className="flex p-2 flex-1  -mt-5 justify-start">
              <div className="flex justify-center  items-start gap-2">
                <div className="w-10 h-10 border mt-5 border-gray-600 rounded-full relative overflow-hidden  ">
                  
            
                  {comment?.userPhoto ? (
                    <Image
                      objectFit="cover"
                      src={comment.userPhoto}
                      fill
                      placeholder="blur"
                      blurDataURL="data:..."
                      alt="user"
                    />
                  ) : (
                    <i class="fa-solid fa-circle-user text-[40px]  "></i>
                  )}
                </div>
                <div className="flex flex-col pt-5 items-start">
                  <h2 className="text-sm font-semibold items-center flex gap-1">{comment.userName}
                  {comment?.userEmail === "sadikulsad0810@gmail.com" &&  <Image src={badge} width={16} alt="badge" />}
                  </h2>
                  <div className="text-sm  whitespace-pre-wrap break-all  min-w-[50px] bg-[#233046] p-2 max-w-[280px] md:max-w-[400px] rounded-lg  text-gray-300">
                    {comment?.comment?.length > 30 ? comment?.comment.slice(0, 80) + "....See more" : comment?.comment}
                  </div>
                  <span class="text-xs    text-gray-400  ">
                    {" "}
                    {moment(comment.time).fromNow()}
                  </span>
                </div>
              </div>
            </div>
          ))
      ) : (
        <h2 className="text-base p-2 font-medium text-gray-300">
          No comments yet
        </h2>
      )}

      {comments?.length > 3 && (
        <Link href={`/post-details/${post._id}`} className="text-base cursor-pointer hover:text-blue-400  p-2 pb-3 font-medium text-gray-300">
          View all comments
        </Link>
      )}

      <hr class="border-gray-700" />

      <div className="py-4 px-2">
        <div className="flex justify-start items-center gap-2">
          <div className="w-10 h-10 relative rounded-full overflow-hidden border border-gray-700  ">
            {photo ? 
            <>
            <Image
              src={photo}
              objectFit="cover"
              fill
              placeholder="blur"
              blurDataURL="data:..."
              alt="user"
            />
            </> : 
             <i class="fa-solid fa-circle-user text-[38px]  "></i>
            }
          </div>
          {/* modal open button  */}
          <div className="w-[50%] ">
            <Button
              onClick={onOpen}
              className="w-full bg-[#2d3d58] hover:bg-[#364969]  transition-all duration-300 text-gray-400 flex justify-start px-5 font-semibold"
            >
              Add a comment.....
            </Button>
          </div>

          {/* modal  */}
          <CommentModal
            post={post}
            users={users}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            commentUserId={commentUserId}
            postUser={postUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Comment;
