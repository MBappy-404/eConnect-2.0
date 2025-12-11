"use client";
import { AuthContext } from "@/AuthProvider/Auth";
import React, { useContext } from "react";
import PostCard from "../Post/AllPost/PostCard";
import Image from "next/image";
import badge from "@/assets/verified.svg";
import profileBg from "@/assets/profile.png";
import facebook from "@/assets/facebook.svg";
import instagram from "@/assets/instagram.svg";
import twitter from "@/assets/twitter.svg";
import { useDisclosure } from "@nextui-org/react";
import ProfileEditModal from "./ProfileEditModal";
import { FaBriefcase, FaEnvelope, FaGraduationCap, FaMailBulk, FaMapMarkerAlt, FaPhone, FaUserFriends } from "react-icons/fa";

const Profile = ({ users, posts }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="max-w-2xl  sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto  mt-2   shadow-xl rounded-lg text-gray-200">
        {users
          ?.filter((users) => {
            return users.email === user?.email;
          })
          .map((eUser) => (
            <div key={eUser._id} className="bg-[#1E293B] border border-gray-700 rounded-2xl">
              <div className="rounded-t-lg h-32 relative overflow-hidden">
                <Image src={profileBg} fill objectFit="cover" alt="profile" />
              </div>
              <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">

                {
                  eUser?.updatedPhoto ? <Image
                    placeholder="blur"
                    objectFit="cover"
                    blurDataURL="data:..."
                    src={eUser?.updatedPhoto}
                    fill
                    alt="profile"
                  /> : <i className="fa-solid bg-white fa-circle-user text-[124px]"></i>
                }
              </div>
              <div className="text-center mt-2">
                <div className="flex gap-1 items-center justify-center">
                  <h2 className="font-bold text-lg ">
                    {eUser?.updatedName ? eUser?.updatedName : eUser?.name}
                  </h2>
                  {user?.email === "sadikulsad0810@gmail.com" && <Image src={badge} width={18} alt="badge" />}
                </div>
                <p className="text-gray-400">{eUser?.bio}</p>
              </div>

              {/* social links  */}
              <div className="flex justify-center mt-5 gap-3">
                {eUser.facebook && (
                  <a href={eUser.facebook} target="_blank">
                    <Image src={facebook} alt="facebook" width={30} />{" "}
                  </a>
                )}
                {eUser.instagram && (
                  <a href={eUser.instagram} target="_blank">
                    <Image src={instagram} alt="facebook" width={30} />{" "}
                  </a>
                )}
                {eUser.twitter && (
                  <a href={eUser.twitter} target="_blank">
                    <Image src={twitter} alt="facebook" width={30} />{" "}
                  </a>
                )}
              </div>

              <div className=" px-1 md:px-10 py-4 gap-2 md:gap-5 flex justify-between mt-2">
                <button className="w-full block mx-auto rounded-full bg-gray-700 hover:shadow-lg font-semibold text-white px-2 py-2">
                  Followers : {eUser?.likes ? eUser?.likes?.length : 0}
                </button>
                <button onClick={onOpen} className="w-full text-center block mx-auto rounded-full bg-gray-700 hover:shadow-lg font-semibold text-white px-2 py-2">
                  Edit Profile
                </button>
                <ProfileEditModal users={users} isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />
              </div>

              <div className=" mt-2 border-b px-2 border-gray-700 pb-3">
                <h2 className="font-bold text-lg ">About</h2>
              </div>

              <div className="lg:col-span-1 space-y-6 sm:space-y-8">
                  {/* About Card */}
                  <div className="   p-2 ">
                    
                    <div className="space-y-4">
                      {eUser.work && (
                        <div className="flex items-start gap-3">
                          <FaBriefcase className="text-cyan-400 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-400">Work</p>
                            <p className="text-white">{eUser.work}</p>
                          </div>
                        </div>
                      )}
                      
                      {eUser.college && (
                        <div className="flex items-start gap-3">
                          <FaGraduationCap className="text-cyan-400 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-400">Education</p>
                            <p className="text-white">{eUser.college}</p>
                          </div>
                        </div>
                      )}
                      
                      {eUser.address && (
                        <div className="flex items-start gap-3">
                          <FaMapMarkerAlt className="text-cyan-400 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-400">Location</p>
                            <p className="text-white">{eUser.address}</p>
                          </div>
                        </div>
                      )}
                      
                      {eUser.phone && (
                        <div className="flex items-start gap-3">
                          <FaPhone className="text-cyan-400 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-400">Phone</p>
                            <p className="text-white">{eUser.phone}</p>
                          </div>
                        </div>
                      )}
                      
                      {eUser.email && (
                        <div className="flex items-start gap-3">
                          <FaEnvelope className="text-cyan-400 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-400">Email</p>
                            <p className="text-white break-all">{eUser.email}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

               
                </div>

              <h2 className="text-lg py-3 px-2   -mb-1 font-semibold">
                {posts?.filter(posts=>posts.userEmail === user?.email)?.length ? "My Posts" : <>No Posts</>} 
              </h2>
            </div>
          ))}
        {posts
          ?.filter((posts) => {
            return posts.userEmail === user?.email;
          })
          .map((post) => (
            <PostCard key={post._id} post={post} users={users} posts={posts} />
          ))}
      </div>
    </div>
  );
};

export default Profile;
