"use client";

import { AuthContext } from "@/AuthProvider/Auth";
import { Button, Textarea, Tooltip } from "@nextui-org/react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import badge from "@/assets/verified.svg";
import { useContext, useState } from "react";


const PostDetailsModal = ({ post, users }) => {
  const { user } = useContext(AuthContext);
  const pathname = usePathname();
  const router = useRouter();
  const [enable, setEnable] = useState(false);
  const [loading, setLoading] = useState(false);

  const liked = post?.likes?.some((like) => like.userEmail === user?.email);
  //   custom time format
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

  let name = users
    ?.filter((users) => {
      return users?.email === user?.email;
    })
    .map((eUser) => eUser?.name);
  let updatedName = users
    ?.filter((users) => {
      return users?.email === user?.email;
    })
    .map((eUser) => eUser?.updatedName);
  let postUser = updatedName[0] ? updatedName[0] : name[0];
  let updatedPhoto = users
    ?.filter((users) => {
      return users?.email === user?.email;
    })
    .map((eUser) => eUser?.updatedPhoto);
  let commentUserId = users?.filter((users) => {
    return users?.email === user?.email;
  })
    .map((eUser) => eUser._id);

  const handleComment = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    const comment = form.comment.value;

    // comment info
    // send Database
    const commentData = {
      comment: comment,
      commentUserId: commentUserId[0],
      postId: post._id,
      time: new Date(),
      userName: postUser,
      userEmail: user?.email,
      userPhoto: updatedPhoto ? updatedPhoto[0] : user?.photoURL,
    };

    fetch(` https://e-connect-server-mbappy404s-projects.vercel.app/comments/post/${post._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        if (data.acknowledged) {
          router.refresh();
          setLoading(false);
          setEnable(false);
          form.reset();
        }
      });
  };

  // post like
  const handlePostLike = (id) => {
    const like = {
      userEmail: user?.email,
      userName: updatedName[0] ? updatedName[0] : name[0],
    };
    // console.log(like);
    fetch(` https://e-connect-server-mbappy404s-projects.vercel.app/post/like/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(like),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          router.refresh();
        }
      });
  };
  const photo = updatedPhoto[0] ? updatedPhoto[0]  : (user?.photoURL ? user?.photoURL : null)
  return (
    <div className=" ">
      <div key={post?._id} className="bg-[#1E293B] mt-1">
        <div className="p-2 py-3">
          <div class="flex flex-shrink-0  ">
            <a href="#" class="flex-shrink-0 group block">
              <div class="flex gap-2 items-center">
                <div className="relative border border-gray-600 w-12  h-12 rounded-full overflow-hidden">
                  {post?.postUserPhoto ? (
                    <Image
                      objectFit="cover"
                      src={post?.postUserPhoto}
                      fill
                      alt="Woman paying for a purchase"
                    />
                  ) : (
                    <i class="fa-solid fa-circle-user text-5xl"></i>
                  )}
                </div>
                <div class="flex-col flex   items-start">
                  <Link
                    href={`/user/${post?.userId}`}
                    className="text-base leading-6 hover:underline items-center flex gap-1 font-medium text-white"
                  >
                    {post?.postUser ? post?.postUser : "Someone"}
                    {post?.userEmail === "sadikulsad0810@gmail.com" && (
                      <Image src={badge} width={18} alt="badge" />
                    )}
                  </Link>
                  <span class="text-xs md:text-sm    text-gray-400  ">
                    {moment(post?.time).fromNow()}
                    <Tooltip
                      classNames={{
                        base: [
                          // arrow color
                          "before:bg-gray-600  ",
                        ],
                        content: ["py-2 px-4 shadow-xl", "bg-gray-600"],
                      }}
                      showArrow
                      placement="top"
                      content="Public"
                    >
                      <i class="fa-solid fa-earth-americas text-xs md:text-xs text-gray-500 ml-1.5"></i>
                    </Tooltip>
                  </span>
                </div>
              </div>
            </a>
          </div>

          <div class="mt-3">
            <p class="text-base whitespace-pre-wrap break-all px-2 text-wrap  w-auto font-medium text-white flex-shrink">
              {post?.post}
            </p>

            {post?.image && (
              <div class="overflow-hidden rounded-lg  mt-3  relative">
                <Image

                  src={post?.image}
                  width={700}
                  height={500}
                  objectFit="cover"

                  alt="image"
                />
              </div>
            )}

            <div class="">
              <div class="w-full">
                <div class="flex items-center justify-between mt-2">
                  <Button
                    color="default"
                    onClick={() => handlePostLike(post._id)}
                    className="px-10"
                    variant="light"
                  >
                    {liked ? (
                      <i className="fa-solid fa-heart text-red-500 text-lg"></i>
                    ) : (
                      <i className="fa-regular fa-heart text-lg"></i>
                    )}
                    <p className="">{post.likes?.length || 0}</p>
                  </Button>
                  <Button color="default" className="px-10" variant="light">
                    <svg
                      class="text-center h-6 w-6"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    {post?.comment?.length}
                  </Button>
                  <Button color="default" className="px-10" variant="light">
                    <i class="fa-solid  fa-retweet text-lg"></i>
                    23
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="border-gray-700" />

        <div className="py-2 px-2">
          <h2 className="text-lg p-2 font-medium text-gray-300">Comments</h2>

          {post?.comment?.length ? (
            post?.comment
              ?.slice()
              .reverse()
              .map((comments, index) => (
                <div
                  key={index}
                  className="flex p-2 flex-1  -mt-5 justify-start"
                >
                  <div className="flex justify-center  items-start gap-2">
                    <div className="w-10 h-10 rounded-full mt-6 relative overflow-hidden  ">
                      {comments?.userPhoto ? (
                        <Image
                          objectFit="cover"
                          src={comments.userPhoto}
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
                      <h2 className="text-sm flex gap-1 font-semibold">
                        {comments.userName}
                        {comments?.userEmail === "sadikulsad0810@gmail.com" && (
                          <Image src={badge} width={16} alt="badge" />
                        )}
                      </h2>
                      <div className="text-sm  whitespace-pre-wrap break-all   min-w-[50px] bg-[#233046] p-2 max-w-[280px] md:max-w-[400px] rounded-lg  text-gray-300">
                        {comments.comment}
                      </div>
                      <span class="text-xs    text-gray-400  ">
                        {" "}
                        {moment(comments.time).fromNow()}
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
        </div>

        {pathname !== "/" &&
          pathname !== "/saved" &&
          pathname !== "/profile" &&
          !pathname.startsWith("/user/") &&
          pathname !== "/report" && (
            <div className="py-4 px-2 bg-[#1E293B] border-t border-gray-700 sticky left-0 bottom-0">
              <form onSubmit={handleComment}>
                <div className="flex justify-start items-center  gap-2">
                  <div className="w-10 h-8 -mt-5 relative rounded-full overflow-hidden border border-gray-700  ">
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
                      <i class="fa-solid fa-circle-user text-[36px]  "></i>
                    }
                  </div>
                  <Textarea
                    minRows={2}
                    name="comment"
                    onChange={(e) => setEnable(e.target.value?.length >= 2)}
                    variant="faded"
                    classNames={{
                      inputWrapper: "bg-gray-700",
                    }}
                    placeholder="Write a comment"
                    className="col-span-6  focus:bg-gray-600 text-gray-300  items-center  md:col-span-6"
                  />

                  <Button
                    isDisabled={!enable}
                    isIconOnly
                    isLoading={loading}
                    type="submit"
                  >
                    <i class="fa-solid text-2xl rotate-45 mx-2  fa-location-arrow"></i>
                  </Button>
                </div>
              </form>
            </div>
          )}
      </div>
    </div>
  );
};

export default PostDetailsModal;
