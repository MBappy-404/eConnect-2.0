"use client";

import { Badge, Button, User } from "@nextui-org/react";
import Image from "next/image";
import { usePathname} from "next/navigation";

const RightSideNav = ({users}) => {
   const pathname = usePathname()
    return (
        <div className={`${pathname === "/auth"  ? "hidden" : "block"} sticky top-0   `}>
            <div className="  h-auto   ">
            {/* Right Menu */}

            <div className="max-w-sm rounded-lg  m-4   bg-[#1E293B]  overflow-hidden shadow-lg">
            <div class="flex  px-4 py-3 justify-between">
                <div class="flex-1">
                  <h2 class="px-1  text-lg w-48 font-semibold text-white">
                    New Peoples
                  </h2>
                </div>
                
              </div>
              <hr  className="border-gray-600 mb-4"/>
             {
              users?.slice().reverse().slice(0, 5).map((user) => (
                <div key={user._id} className="flex mb-3 px-4 py-1 justify-between">
                <div className="flex justify-center items-center gap-4">
                  <Badge  showOutline={false} classNames={{ badge: "text-[10px]", content:"-mt-1" }} content="new" color="danger" size="sm">
                  <div className="w-10 h-10 overflow-hidden relative rounded-full bg-gray-500">
                   {
                    user.updatedPhoto ?  <Image src={user?.updatedPhoto} objectFit="cover"  blurDataURL="data:..."  placeholder="blur" alt="user" fill/> : <i className="fa-solid text-gray-400 fa-circle-user  text-[40px]"></i>
                   }
                  </div>
                   </Badge>
                  <div className="flex flex-col justify-start items-start">
                    <h2 className=" text-[13px] font-semibold">{user.updatedName ? user.updatedName : user.name}</h2>
                    <p className="text-xs text-gray-400">Suggested for you</p>
                  </div>
                </div>
                <Button size="sm" radius="full">Follow</Button>
              </div>
              ))
             }
             
               
            </div>
            {/* Second Trending Tweet Section */}
            <div class="max-w-sm rounded-lg bg-[#1E293B] overflow-hidden shadow-lg m-4">
              <div class="flex">
                <div class="flex-1 m-2">
                  <h2 class="px-4 py-2 text-xl w-48 font-semibold text-white">
                    Top Users
                  </h2>
                </div>
                 
              </div>

              <hr class="border-gray-600" />

              <div class="flex">
                <div class="flex-1">
                  <p class="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">
                    1 . Trending
                  </p>
                  <h2 class="px-4 ml-2 w-48 font-bold text-white">
                    #Microsoft363
                  </h2>
                  <p class="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">
                    5,466 Tweets
                  </p>
                </div>
                <div class="flex-1 px-4 py-2 m-2">
                  <a
                    href=""
                    class=" text-2xl rounded-full text-gray-400 hover:bg-gray-600 hover:text-blue-300 float-right"
                  >
                    <svg
                      class="m-2 h-5 w-5"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <hr class="border-gray-600" />

              <div class="flex">
                <div class="flex-1">
                  <p class="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">
                    2 . Politics . Trending
                  </p>
                  <h2 class="px-4 ml-2 w-48 font-bold text-white">
                    #HI-Fashion
                  </h2>
                  <p class="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">
                    8,464 Tweets
                  </p>
                </div>
                <div class="flex-1 px-4 py-2 m-2">
                  <a
                    href=""
                    class=" text-2xl rounded-full text-gray-400 hover:bg-gray-600 hover:text-blue-300 float-right"
                  >
                    <svg
                      class="m-2 h-5 w-5"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <hr class="border-gray-600" />

              <div class="flex">
                <div class="flex-1">
                  <p class="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">
                    3 . Rock . Trending
                  </p>
                  <h2 class="px-4 ml-2 w-48 font-bold text-white">#Ferrari</h2>
                  <p class="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">
                    5,586 Tweets
                  </p>
                </div>
                <div class="flex-1 px-4 py-2 m-2">
                  <a
                    href=""
                    class=" text-2xl rounded-full text-gray-400 hover:bg-gray-600 hover:text-blue-300 float-right"
                  >
                    <svg
                      class="m-2 h-5 w-5"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <hr class="border-gray-600" />

              <div class="flex">
                <div class="flex-1">
                  <p class="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">
                    4 . Auto Racing . Trending
                  </p>
                  <h2 class="px-4 ml-2 w-48 font-bold text-white">#vettel</h2>
                  <p class="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">
                    9,416 Tweets
                  </p>
                </div>
                <div class="flex-1 px-4 py-2 m-2">
                  <a
                    href=""
                    class=" text-2xl rounded-full text-gray-400 hover:bg-gray-600 hover:text-blue-300 float-right"
                  >
                    <svg
                      class="m-2 h-5 w-5"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <hr class="border-gray-600" />

              <div class="flex">
                <div class="flex-1 p-4">
                  <h2 class="px-4 ml-2 w-48 font-bold text-blue-400">
                    Show more
                  </h2>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flow-root m-6 inline">
              <div className="flex-1">
                <a href="#">
                  <p className="text-sm leading-6 font-medium text-gray-500">
                   Designed & Developed by Bappy 
                  </p>
                </a>
              </div>
              <div className="flex-2">
                <p className="text-sm leading-6 font-medium text-gray-600">
                  {" "}
                  © 2024 eConnect.
                </p>
              </div>
            </div>
          </div>
        </div>
    );
};

export default RightSideNav;