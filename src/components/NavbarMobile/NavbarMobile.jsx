"use client";
import React, { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  Avatar,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import Link from "next/link";
import { AuthContext } from "@/AuthProvider/Auth";
import Image from "next/image";

const App = ({ users }) => {
  const { logOut, user } = useContext(AuthContext);

  const handleLogout = (link) => {
    if (link === "Logout") {
      logOut();
    }
  };
  let updatedPhoto = users
    ?.filter((users) => {
      return users?.email === user?.email;
    })
    .map((eUser) => eUser?.updatedPhoto);

  let photo = updatedPhoto[0] ? updatedPhoto[0] : user?.photoURL;
  console.log(photo);

  const menuItems = [
    {
      name: "saved",
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
          viewBox="0 0 36 36"
          version="1.1"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>warning-solid</title>
          <path
            class="clr-i-solid clr-i-solid-path-1"
            d="M30.33,25.54,20.59,7.6a3,3,0,0,0-5.27,0L5.57,25.54A3,3,0,0,0,8.21,30H27.69a3,3,0,0,0,2.64-4.43ZM16.46,12.74a1.49,1.49,0,0,1,3,0v6.89a1.49,1.49,0,1,1-3,0ZM18,26.25a1.72,1.72,0,1,1,1.72-1.72A1.72,1.72,0,0,1,18,26.25Z"
          ></path>
          <rect x="0" y="0" width="36" height="36" fill-opacity="0" />
        </svg>
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
      name: "My Rank",
      link: "/user-rank",
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
      name: "Crypto",
      link: "/eConnectCrypto",
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
    // {
    //   name: "Others",
    //   link: "/others",
    //   icon: (
    //     <svg
    //       fill="white"
    //       width="24px"
    //       height="24px"
    //       viewBox="0 0 512 512"
    //       version="1.1"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <g id="Layer_1" />

    //       <g id="Layer_2">
    //         <g>
    //           <g>
    //             <rect
    //               class="st0"
    //               height="76.69"
    //               width="76.69"
    //               x="81.84"
    //               y="81.84"
    //             />
    //           </g>

    //           <g>
    //             <rect
    //               class="st0"
    //               height="76.69"
    //               width="76.69"
    //               x="217.66"
    //               y="81.84"
    //             />
    //           </g>

    //           <g>
    //             <rect
    //               class="st0"
    //               height="76.69"
    //               width="76.69"
    //               x="353.47"
    //               y="81.84"
    //             />
    //           </g>

    //           <g>
    //             <rect
    //               class="st0"
    //               height="76.69"
    //               width="76.69"
    //               x="81.84"
    //               y="217.66"
    //             />
    //           </g>

    //           <g>
    //             <rect
    //               class="st0"
    //               height="76.69"
    //               width="76.69"
    //               x="217.66"
    //               y="217.66"
    //             />
    //           </g>

    //           <g>
    //             <rect
    //               class="st0"
    //               height="76.69"
    //               width="76.69"
    //               x="353.47"
    //               y="217.66"
    //             />
    //           </g>

    //           <g>
    //             <rect
    //               class="st0"
    //               height="76.69"
    //               width="76.69"
    //               x="81.84"
    //               y="353.47"
    //             />
    //           </g>

    //           <g>
    //             <rect
    //               class="st0"
    //               height="76.69"
    //               width="76.69"
    //               x="217.66"
    //               y="353.47"
    //             />
    //           </g>

    //           <g>
    //             <rect
    //               class="st0"
    //               height="76.69"
    //               width="76.69"
    //               x="353.47"
    //               y="353.47"
    //             />
    //           </g>
    //         </g>
    //       </g>
    //     </svg>
    //   ),
    // },
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
    <div>
      <Navbar
        classNames={{ base: "bg-[#1E293B]" }}
        shouldHideOnScroll
        className="fixed shadow-md top-0 border-b border-gray-700"
      >
        <NavbarBrand>
          <Image
            src="/logo.png"
            alt="logo"
            width={40}
            height={40}
            className="w-[40px]"
          />
        </NavbarBrand>

        <NavbarContent justify="end">
          <div className="flex items-center gap-4">
            {user ? (
              <Dropdown
                showArrow
                classNames={{
                  base: "before:bg-default-200 mt-1",
                  content: "py-1 px-1 border border-default-200 bg-[#1E293B]",
                }}
                placement="bottom-end"
              >
                <DropdownTrigger>
                  {photo ? (
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      src={photo}
                    />
                  ) : (
                    ""
                  )}
                </DropdownTrigger>
                <DropdownMenu>
                  {menuItems.map((item) => (
                    <DropdownItem
                      key={item.name}
                      onClick={() => handleLogout(item.name)}
                    >
                      <Link
                        href={item.link ? item.link : "#"}
                        className="text-inherit flex py-1 items-center gap-2 text-base text-semibold"
                      >
                        <span>{item.icon}</span> {item.name}
                      </Link>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
                W
              </Dropdown>
            ) : (
              <Link href="/auth">
                {" "}
                <Button size="sm" flat color="primary">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </NavbarContent>
      </Navbar>
    </div>
  );
};

export default App;
