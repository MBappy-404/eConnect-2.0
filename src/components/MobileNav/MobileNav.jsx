"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MobileNav = () => {
  const pathname = usePathname();
  const menuItems = [
    {
      name: "Home",
      link: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="24"
          height="24"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z"></path>
        </svg>
      ),
    },
    {
      name: "Message",
      link: "/message",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="28"
          height="28"
          fill="white"
          viewBox="0 0 64 64"
        >
          <path d="M32,10c13.785,0,25,8.951,25,19.954S45.785,49.907,32,49.907c-0.646,0-1.311-0.022-1.983-0.065	c-7.369,5.504-13.411,6.251-13.672,6.281c-0.076,0.009-0.152,0.013-0.228,0.013c-0.7,0-1.356-0.368-1.72-0.979	c-0.402-0.678-0.369-1.528,0.084-2.172c0.023-0.033,1.966-2.8,4.003-6.234C11.346,43.104,7,36.827,7,29.954	C7,18.951,18.215,10,32,10z"></path>
        </svg>
      ),
    },
    {
      name: "Notifications",
      link: "/notification",
      notification: true,
      icon: (
        <svg
          width="25px"
          height="25px"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 2C10.3431 2 9 3.34315 9 5V6.08282C6.6147 6.55927 5 8.57356 5 11V16L3.29289 17.7071C2.90237 18.0976 3.09763 18.7803 3.70711 18.7803H20.2929C20.9024 18.7803 21.0976 18.0976 20.7071 17.7071L19 16V11C19 8.57356 17.3853 6.55927 15 6.08282V5C15 3.34315 13.6569 2 12 2ZM9 20C9 21.1046 9.89543 22 11 22H13C14.1046 22 15 21.1046 15 20H9Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      name: "Peoples",
      link: "/people",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
    {
      name: "Profile",
      link: "/profile",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25" fill="white" ><path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
      
      ),
    },
  ];

  return (
    <div className={`${pathname === "/message" && "hidden" } fixed bottom-0 left-0 right-0 bg-gray-800 text-white    p-4`}>
      <ul className=" flex justify-between  items-center ">
        {menuItems?.map((item) => (
          <li
            key={item?.name}
            className={` transition-all duration-100 rounded-full ${
              pathname === item?.link ? "bg-gray-700 font-bold" : "font-medium "
            } hover:bg-gray-700 px-4 py-2`}
          >
            <Link
              href={item.link}
              className="flex items-center justify-start w-full"
            >
              <span className="">{item?.icon}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileNav;
