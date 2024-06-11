"use client";

import React, { useContext } from "react";

import Image from "next/image";
import badge from "@/assets/verified.svg";
import profileBg from "@/assets/profile.png";
import facebook from "@/assets/facebook.svg";
import instagram from "@/assets/instagram.svg";
import twitter from "@/assets/twitter.svg";
import { AuthContext } from "@/AuthProvider/Auth";
import PostCard from "../Post/AllPost/PostCard";
import { useRouter } from "next/navigation";
 

const VisitProfile = ({ people, posts, users }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  let name = people.name;
  let updatedName = people.updatedName;
  const liked = people?.likes?.some((like) => like.userEmail === user?.email);
  const handleUserFollower = (id) => {
    const like = {
      userEmail: user?.email,
      userName: updatedName ? updatedName : name,
    };
    // console.log(like);
    fetch(` https://e-connect-server.vercel.app/user/like/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(like),
    })
      .then((res) => res.json())
      .then((data) => {
        //  console.log(data);
        if (data.acknowledged) {
          router.refresh();
        }
      });
  };

  return (
    <div>
      <div className="max-w-2xl  sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto  mt-2   shadow-xl rounded-lg text-gray-200">
        <div
          key={people._id}
          className="bg-[#1E293B] border border-gray-700 rounded-2xl "
        >
          <div className="rounded-t-lg h-32 relative overflow-hidden">
            <Image src={profileBg} fill objectFit="cover" alt="profile" />
          </div>
          <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
            {
              people?.updatedPhoto ? <Image
              placeholder="blur"
              objectFit="cover"
              blurDataURL="data:..."
              src={people?.updatedPhoto }
              fill
              alt="profile"
            /> : <i className="fa-solid bg-white fa-circle-user text-[124px]"></i>
            }
          </div>
          <div className="text-center mt-2">
            <div className="flex gap-1 items-center justify-center">
              <h2 className="font-bold text-lg ">
                {people?.updatedName ? people?.updatedName : people?.name}
              </h2>
              {people?.email === "sadikulsad0810@gmail.com" && (
                <Image src={badge} width={18} alt="badge" />
              )}
            </div>
            <p className="text-gray-400">{people?.bio}</p>
          </div>

          {/* social links  */}
          <div className="flex justify-center mt-5 gap-3">
            {people.facebook && (
              <a href={people.facebook} target="_blank">
                <Image src={facebook} alt="facebook" width={30} />{" "}
              </a>
            )}
            {people.instagram && (
              <a href={people.instagram} target="_blank">
                <Image src={instagram} alt="facebook" width={30} />{" "}
              </a>
            )}
            {people.twitter && (
              <a href={people.twitter} target="_blank">
                <Image src={twitter} alt="facebook" width={30} />{" "}
              </a>
            )}
          </div>

          <div className=" px-1 md:px-10 py-4 gap-2 md:gap-5 flex justify-between mt-2">
            <button className="w-full block mx-auto rounded-full bg-gray-700 hover:shadow-lg font-semibold text-white px-2 py-2">
              Followers : {people?.likes ? people?.likes?.length : 0}
            </button>
            <button
              onClick={() => handleUserFollower(people._id)}
              disabled={liked}
              className={`w-full block mx-auto rounded-full bg-gray-700 hover:shadow-lg font-semibold text-white px-2 py-2 ${
                liked ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {liked ? "Following" : "Follow"}
            </button>
          </div>

          <div className=" mt-2 border-b px-2 border-gray-700 pb-3">
            <h2 className="font-bold text-lg ">About</h2>
          </div>

          <div key={people._id} className="px-2">
            <div className="py-2 grid grid-cols-1 text-white content-center space-y-3">
              <p className="">
                Name:
                {people.updatedName ? (
                  <span className="ml-1">{people?.updatedName}</span>
                ) : (
                  <span className="ml-1">{people?.name}</span>
                )}
              </p>

              {people.work && (
                <p>
                  Work: <span className="ml-1"> {people.work}</span>
                </p>
              )}

              {people.college && (
                <p>
                  Studies: <span className="ml-1">{people.college}</span>
                </p>
              )}

              {people.address && (
                <p>
                  Address: <span className="ml-1">{people.address}</span>
                </p>
              )}
            </div>
          </div>
          {posts
          ?.filter((userPost) => {return userPost.userEmail === people?.email}).length ?  <h2 className="text-lg py-3 px-2   -mb-1 font-semibold">Posts</h2> :  <h2 className="text-lg py-3 px-2   -mb-1 font-semibold">No Posts</h2>} 
         
        </div>

        {posts
          ?.filter((userPost) => {
            return userPost.userEmail === people?.email;
          })
          .map((post) => (
            <PostCard key={post._id} post={post} users={users} />
          ))}
      </div>
    </div>
  );
};

export default VisitProfile;
