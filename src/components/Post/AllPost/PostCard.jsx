"use client";

import { AuthContext } from "@/AuthProvider/Auth";
import badge from "@/assets/verified.svg";
import Comment from "@/components/Comments/Comment";
import {
  Popover,
  PopoverTrigger,
  Tooltip,
  PopoverContent,
  Button,
  useDisclosure,
  Chip,
  Badge,
} from "@nextui-org/react";
import moment from "moment";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { useContext, useState } from "react";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import Link from "next/link";
import ReportModal from "@/components/Reports/ReportModal/ReportModal";
import TopUserBadge from "./TopUserBadge";

const PostCard = ({ post, users,posts}) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  let name = users
    ?.filter((users) => {
      return users?.email === user?.email;
    })
    .map((eUser) => eUser?.name);
  let updatedName = users
    ?.filter((users) => {
      return users?.email === user?.email;
    })
    ?.map((eUser) => eUser?.updatedName);
  const liked = post?.likes?.some((like) => like?.userEmail === user?.email);

  // console.log(post.Reports?.map(reportedItem=> reportedItem.messageReport));
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

  // saved post
  const handleSaved = () => {
    const savedUser = {
      users: user?.email,
    };

    fetch(` https://e-connect-server.vercel.app/post/saved/${post._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(savedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.acknowledged) {
          router.refresh();
          router.push("/saved");
        }
      });
  };

  // hide post
  const handleHiddenPost = (id) => {
    document.getElementById(id).style.display = "none";
  };

  const handlePostLike = (id) => {
    const like = {
      userEmail: user?.email,
      userName: updatedName[0] ? updatedName[0] : name[0],
    };
    // console.log(like);
    fetch(` https://e-connect-server.vercel.app/post/like/${id}`, {
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


  // filter top users 
  const userPostCounts = {};

  posts?.forEach((post) => {
    const userEmail = post.userEmail;
    const userName = post.postUser;
    const userPhoto = post.postUserPhoto;
    const userId = post.userId;

    if (userPostCounts[userEmail]) {
      userPostCounts[userEmail].count++;
    } else {
      userPostCounts[userEmail] = {
        count: 1,
        name: userName,
        photo: userPhoto,
        userId,
      };
    }
  });

  console.log(userPostCounts);
  // Step 2: Convert the userPostCounts object into an array of objects
  const userPostCountsArray = Object.keys(userPostCounts).map((email) => ({
    user_email: email,
    post_count: userPostCounts[email],
  }));

  // console.log(userPostCountsArray);
  // Step 3: Sort the users by the number of posts in descending order
  const topUser = userPostCountsArray.sort(
    (a, b) => b.post_count.count - a.post_count.count
  );



   
  return (
    <div className=" ">
      <div
        key={post._id}
        id={post._id}
        className="bg-[#1E293B] mt-2 border border-gray-700 rounded-2xl "
      >
        <div className="p-2 py-3">
          <div className="flex  items-center  justify-between">
            <div className="flex gap-3 items-center">
             <TopUserBadge post={post} topUser={topUser} />
              <div className="flex">
                <div className="flex-col flex  items-start">
                  <div className="flex gap-1 items-center">
                    <Link
                      href={`/user/${post?.userId}`}
                      className="text-base leading-6 hover:underline items-center flex gap-[3px] font-medium text-white"
                    >
                      {post?.postUser ? post?.postUser : "Someone"}
                      {post?.userEmail === "sadikulsad0810@gmail.com" && (
                        <Image src={badge} width={18} alt="badge" />
                      )}
                    </Link>
                    <div>
                      <p className="text-[14.5px] text-gray-300">
                        {post.type === "profilePicture" &&
                          "update his profile picture"}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs     text-gray-400  ">
                    {moment(post.time).fromNow()}
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
                      <i className="fa-solid fa-earth-americas text-xs md:text-xs text-gray-500 ml-1.5"></i>
                    </Tooltip>
                  </span>
                </div>
              </div>
            </div>

            {/* save, report, delete, edit menu  */}
            <div className="  rounded-full ">
              {!isOpen && !openDeleteModal && !openReportModal && (
                <Popover
                  shadow="md"
                  showArrow
                  placement="bottom-end"
                  classNames={{
                    base: [
                      // arrow color
                      "before:bg-gray-600",
                    ],
                    content: [
                      "py-2 border   border-default-200",
                      "bg-[#1E293B]",
                    ],
                  }}
                >
                  {/* open menu  button */}
                  <PopoverTrigger>
                    <Button isIconOnly variant="light" className="rounded-full">
                      <i className="fa-solid text-lg text-gray-300   fa-ellipsis"></i>
                    </Button>
                  </PopoverTrigger>

                  {/* menu content */}
                  <PopoverContent className="w-[220px]  flex items-center ">
                    <div className=" flex flex-col justify-start w-full gap-2 py-1">
                      {/* show save button by posted user   */}
                      {(post.userEmail === user?.email ||
                        user?.email === "sadikulsad0810@gmail.com") && (
                        <Button
                          onClick={onOpen}
                          variant="light"
                          className="flex justify-start  items-center"
                          size="sm"
                        >
                          <i className="fa-solid mr-2   fa-square-pen text-lg text-gray-300"></i>
                          <p className="font-medium text-sm -ml-0.5">
                            Edit This Post
                          </p>
                        </Button>
                      )}

                      <Button
                        onClick={handleSaved}
                        variant="light"
                        className="flex justify-start items-center"
                        size="sm"
                      >
                        <i className="fa-solid mr-2 fa-bookmark text-lg text-gray-300"></i>
                        <p className="font-medium text-sm">Save This Post</p>
                      </Button>

                      {/* show delete button by posted user  */}

                      {(post.userEmail === user?.email ||
                        user?.email === "sadikulsad0810@gmail.com") && (
                        <Button
                          onPress={() => setOpenDeleteModal(true)}
                          variant="light"
                          className="flex justify-start items-center"
                          size="sm"
                        >
                          <i className="fa-solid mr-2  fa-trash text-lg text-gray-300"></i>
                          <p className="font-medium text-sm -ml-[1px]">
                            {" "}
                            Delete This Post
                          </p>
                        </Button>
                      )}

                      {/* report post  */}
                      <Button
                        onPress={() => setOpenReportModal(true)}
                        variant="light"
                        className="flex justify-start items-center"
                        size="sm"
                      >
                        <i className="fa-solid mr-2  fa-triangle-exclamation text-lg text-gray-300"></i>
                        <p className="font-medium text-sm -ml-[2px]">
                          Report This Post
                        </p>
                      </Button>
                      {/* hidden post  */}
                      <Button
                        onClick={() => handleHiddenPost(post._id)}
                        variant="light"
                        className="flex justify-start items-center"
                        size="sm"
                      >
                        <i className="fa-solid mr-2  fa-eye-slash text-lg text-gray-300 fa-lg"></i>
                        <p className="font-medium text-sm -ml-[2px]">
                          Hide This Post
                        </p>
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              )}

              {/* Edit modal  */}
              <EditModal
                post={post}
                onOpen={onOpen}
                onOpenChange={onOpenChange}
                isOpen={isOpen}
                onClose={onClose}
              />

              {/* report modal  */}
              <ReportModal
                id={post._id}
                name={name}
                updatedName={updatedName}
                email={post?.userEmail}
                openReportModal={openReportModal}
                setOpenReportModal={setOpenReportModal}
              />

              {/* Delete modal */}
              <DeleteModal
                id={post._id}
                openDeleteModal={openDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
              />
            </div>
          </div>

          <div className="mt-3">
            <p className="text-base px-2   whitespace-pre-wrap break-all  text-white flex-shrink">
              {post.post}
            </p>

            {post?.image && (
              <div className="overflow-hidden border border-gray-700 rounded-lg w-full object-cover mt-3 h-96 relative">
                <Image
                  objectFit="cover"
                  src={post.image}
                  fill
                  alt="Woman paying for a purchase"
                />
              </div>
            )}

            <div className="">
              <div className="w-full">
                <div className="flex items-center justify-between mt-2">
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
                      className="text-center h-6 w-6"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    {post.comment?.length}
                  </Button>
                  <Button color="default" className="px-10" variant="light">
                    <i className="fa-solid  fa-retweet text-lg"></i>
                    23
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-gray-700" />

        {pathname === "/report" ? (
          <div>
            <div className=" text-white text-sm p-3">
              <h2 className="text-red-400 font-medium text-medium">
                You have {post.Reports?.length} restriction this post
              </h2>
              <div className="flex pt-2 pb-1 flex-wrap gap-2">
                {post.Reports?.map((reportedItem, i) => (
                  <Chip
                    key={i + 1}
                    color="danger"
                    variant="shadow"
                    className="text-xs"
                  >
                    {reportedItem.messageReport
                      ? reportedItem.messageReport
                      : "Restricted"}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Comment comments={post.comment} post={post} users={users} />
        )}
      </div>
    </div>
  );
};

export default PostCard;
