"use client";

import { AuthContext } from "@/AuthProvider/Auth";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

const LeftSideNav = ({ posts }) => {
  const pathname = usePathname();
  const { user, logOut } = useContext(AuthContext);
  const handleLogout = (link) => {
    if (link === "Logout") {
      logOut();
    }
  };
  const menuItems = [
    {
      name: "Home",
      link: "/",
      icon: (
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
        >
          <path
            fill="white"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 19v-8.5a1 1 0 0 0-.4-.8l-7-5.25a1 1 0 0 0-1.2 0l-7 5.25a1 1 0 0 0-.4.8V19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1z"
          />
        </svg>
      ),
    },
    {
      name: "Message",
      link: "/message",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
        </svg>
      ),
    },
    {
      name: "Notifications",
      link: "/notification",
      notification: true,
      icon: (
        <svg
          fill="white"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          id="notification"
          class="icon glyph"
        >
          <path d="M21,17H20V10A8,8,0,0,0,4,10v7H3a1,1,0,0,0,0,2H8.13a4,4,0,0,0,7.74,0H21a1,1,0,0,0,0-2Zm-9,3a2,2,0,0,1-1.73-1h3.46A2,2,0,0,1,12,20Z"></path>
        </svg>
      ),
    },
    {
      name: "Peoples",
      link: "/people",
      icon: (
        <svg
          fill="white"
          width="24px"
          height="24px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          xmlSpace="preserve"
        >
          <path d="M7.5,5C5.6,5,4,6.6,4,8.5S5.6,12,7.5,12S11,10.4,11,8.5S9.4,5,7.5,5z M16.5,5C14.6,5,13,6.6,13,8.5s1.6,3.5,3.5,3.5 S20,10.4,20,8.5S18.4,5,16.5,5z M7.5,14C2.6,14,1,18,1,18v2h13v-2C14,18,12.4,14,7.5,14z M16.5,14c-1.5,0-2.7,0.4-3.6,0.9 c1.4,1.2,2,2.6,2.1,2.7l0.1,0.2V20h8v-2C23,18,21.4,14,16.5,14z" />
          <rect className="st0" width="24" height="24" fill="none" />
        </svg>
      ),
    },
    {
      name: "Saved",
      link: "/saved",
      icon: (
        <svg
          fill="white"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="primary"
            d="M18,2H6A2,2,0,0,0,4,4V21a1,1,0,0,0,.5.86,1,1,0,0,0,1,0L12,18.15l6.5,3.72A1,1,0,0,0,19,22a.9.9,0,0,0,.5-.14A1,1,0,0,0,20,21V4A2,2,0,0,0,18,2Z"
          ></path>
        </svg>
      ),
    },
    {
      name: "Report",
      link: "/report",
      icon: (
        <svg
          fill="white"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          version="1.2"
          baseProfile="tiny"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21.171 15.398l-5.912-9.854c-.776-1.293-1.963-2.033-3.259-2.033s-2.483.74-3.259 2.031l-5.912 9.856c-.786 1.309-.872 2.705-.235 3.83.636 1.126 1.878 1.772 3.406 1.772h12c1.528 0 2.77-.646 3.406-1.771.637-1.125.551-2.521-.235-3.831zm-9.171 2.151c-.854 0-1.55-.695-1.55-1.549 0-.855.695-1.551 1.55-1.551s1.55.696 1.55 1.551c0 .854-.696 1.549-1.55 1.549zm1.633-7.424c-.011.031-1.401 3.468-1.401 3.468-.038.094-.13.156-.231.156s-.193-.062-.231-.156l-1.391-3.438c-.09-.233-.129-.443-.129-.655 0-.965.785-1.75 1.75-1.75s1.75.785 1.75 1.75c0 .212-.039.422-.117.625z" />
        </svg>
      ),
    },
    {
      name: "My Rank",
      link: "/user-rank",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" > <path d="M20 4H17V3C17 2.44772 16.5523 2 16 2H8C7.44772 2 7 2.44772 7 3V4H4C3.44772 4 3 4.44772 3 5V7C3 9.355 4.816 11.2877 7.176 11.9335C7.61204 14.0737 9.58614 15.5963 12 15.5963C14.4139 15.5963 16.388 14.0737 16.824 11.9335C19.184 11.2877 21 9.355 21 7V5C21 4.44772 20.5523 4 20 4ZM5 7V6H7V8.2465C5.863 8.0145 5 7.087 5 7ZM19 7C19 7.087 18.137 8.0145 17 8.2465V6H19V7ZM14 11.5963H10C9.448 11.5963 9 11.1483 9 10.5963V5H15V10.5963C15 11.1483 14.552 11.5963 14 11.5963Z" /> <path d="M10 18C8.89543 18 8 18.8954 8 20H16C16 18.8954 15.1046 18 14 18H10ZM6 22C6 21.4477 6.44772 21 7 21H17C17.5523 21 18 21.4477 18 22V23C18 23.5523 17.5523 24 17 24H7C6.44772 24 6 23.5523 6 23V22Z" /> </svg>
      ),
    },
    {
      name: "Profile",
      link: "/profile",
      icon: (
        <svg
          fill="white"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          id="user"
          data-name="Flat Color"
          xmlns="http://www.w3.org/2000/svg"
          class="icon flat-color"
        >
          <path
            id="primary"
            d="M21,20a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2,6,6,0,0,1,6-6h6A6,6,0,0,1,21,20Zm-9-8A5,5,0,1,0,7,7,5,5,0,0,0,12,12Z"
          ></path>
        </svg>
      ),
    },
    {
      name: "Others",
      link: "/others",
      icon: (
        <svg
          fill="white"
          width="24px"
          height="24px"
          viewBox="0 0 512 512"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Layer_1" />

          <g id="Layer_2">
            <g>
              <g>
                <rect
                  class="st0"
                  height="76.69"
                  width="76.69"
                  x="81.84"
                  y="81.84"
                />
              </g>

              <g>
                <rect
                  class="st0"
                  height="76.69"
                  width="76.69"
                  x="217.66"
                  y="81.84"
                />
              </g>

              <g>
                <rect
                  class="st0"
                  height="76.69"
                  width="76.69"
                  x="353.47"
                  y="81.84"
                />
              </g>

              <g>
                <rect
                  class="st0"
                  height="76.69"
                  width="76.69"
                  x="81.84"
                  y="217.66"
                />
              </g>

              <g>
                <rect
                  class="st0"
                  height="76.69"
                  width="76.69"
                  x="217.66"
                  y="217.66"
                />
              </g>

              <g>
                <rect
                  class="st0"
                  height="76.69"
                  width="76.69"
                  x="353.47"
                  y="217.66"
                />
              </g>

              <g>
                <rect
                  class="st0"
                  height="76.69"
                  width="76.69"
                  x="81.84"
                  y="353.47"
                />
              </g>

              <g>
                <rect
                  class="st0"
                  height="76.69"
                  width="76.69"
                  x="217.66"
                  y="353.47"
                />
              </g>

              <g>
                <rect
                  class="st0"
                  height="76.69"
                  width="76.69"
                  x="353.47"
                  y="353.47"
                />
              </g>
            </g>
          </g>
        </svg>
      ),
    },
    {
      name: "Logout",
      icon: (
        <svg
          fill="white"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 24 24"
        >
          <path d="M17,2H7C5.3,2,4,3.3,4,5v6h8.6l-2.3-2.3c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l4,4c0.4,0.4,0.4,1,0,1.4c0,0,0,0,0,0l-4,4c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l2.3-2.3H4v6c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3V5C20,3.3,18.7,2,17,2z" />
        </svg>
      ),
    },
  ];
  return (
    <div
      className={`${
        pathname === "/auth" ? "hidden" : "block"
      }   sticky top-0 left-0   text-white  `}
    >
      <nav className="mr-4 bg-[#1E293B] ">
        <div className="relative flex flex-col pl-20 max-w-[270px]   overflow-auto  h-screen  ">
          <a href="javascript:void(0)" className="pt-2">
            <img
              src="https://readymadeui.com/readymadeui-white.svg"
              alt="logo"
              className="w-[150px]"
            />
          </a>
          <ul className="space-y-3 my-10  flex-1  ">
            {menuItems?.map((item) => (
              <li
                key={item?.name}
                onClick={() => handleLogout(item?.name)}
                className={` transition-all duration-100 rounded-full ${
                  pathname === item?.link
                    ? "bg-gray-700 font-bold"
                    : "font-medium "
                } hover:bg-gray-700 px-4 py-2`}
              >
                <Link
                  href={item.link ? item.link : "#"}
                  className="flex items-center  align-middle justify-start w-full"
                >
                  <span className="mr-3">{item?.icon}</span>
                  <Badge
                    classNames={{
                      badge: "translate-x-9",
                      content: "font-normal",
                    }}
                    isInvisible={!item?.notification}
                    content={
                      posts?.filter((post) => post.userEmail != user?.email)
                        .length
                    }
                    shape="circle"
                    color="danger"
                    showOutline={false}
                  >
                    <span className="text-base   text-gray-100 tracking-wide">
                      {item?.name}
                    </span>
                  </Badge>
                </Link>
              </li>
            ))}
          </ul>
          {/* <div className="sticky bottom-1  ">
            <Popover
              showArrow
              placement="bottom"
              className="sticky bottom-0 overflow-hidden"
            >
              <PopoverTrigger>
                <div className="flex flex-wrap items-center  mb-5 cursor-pointer border border-gray-500 rounded-full px-2 py-1">
                  <div className="overflow-hidden relative rounded-full border-2 border-white">
                    <Image
                      src="https://readymadeui.com/profile.webp"
                      width={30}
                      height={30}
                      objectFit="cover"
                      alt="profile"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-white">John Doe</p>
                    <p className="text-xs text-gray-300">Active free account</p>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-1  border border-gray-700   bg-[#1E293B] ">
                <Card className="max-w-[300px]  bg-[#1E293B]">
                  <CardHeader className="justify-between">
                    <div className="flex gap-3">
                      <Avatar
                        isBordered
                        radius="full"
                        size="md"
                        src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                      />
                      <div className="flex flex-col items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">
                          Zoey Lang
                        </h4>
                        <h5 className="text-small tracking-tight text-default-500">
                          @zoeylang
                        </h5>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="px-3 py-0">
                    <p className="text-small pl-px text-default-500">
                      Full-stack developer, @getnextui lover she/her
                      <span aria-label="confetti" role="img">
                        🎉
                      </span>
                    </p>
                  </CardBody>
                  <CardFooter className="gap-3">
                    <div className="flex gap-1">
                      <p className="font-semibold text-default-600 text-small">
                        4
                      </p>
                      <p className=" text-default-500 text-small">Following</p>
                    </div>
                    <div className="flex gap-1">
                      <p className="font-semibold text-default-600 text-small">
                        97.1K
                      </p>
                      <p className="text-default-500 text-small">Followers</p>
                    </div>
                  </CardFooter>
                </Card>
              </PopoverContent>
            </Popover>
          </div> */}
        </div>
      </nav>
    </div>
  );
};

export default LeftSideNav;
