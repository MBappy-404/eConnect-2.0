"use client";

import LeftSideNav from "../Layout/LeftSideNav/LeftSideNav";
import RightSideNae from "../Layout/RightSideNav/RightSideNav";
import MobileNav from "../MobileNav/MobileNav";
import NavbarMobile from "../NavbarMobile/NavbarMobile";
export default function MainLayout({ users, posts,children}) {
  return (
    <div className="bg-[#0F172A]">
      <div className="md:hidden">
        <NavbarMobile users={users} />
      </div>
      <div className="flex justify-center max-w-[1300px] mx-auto">
        {/* LeftSideNav */}
        <div className="lg:w-2/5 w-full hidden md:block">
          <LeftSideNav posts={posts} />
        </div>
        {/* Middle content */}
        <div className="lg:w-3/5 mt-16 md:mt-0 w-full px-1 md:px-0">
          {children}
          <div className="md:hidden sticky bottom-0 z-10">
            <MobileNav />
          </div>
        </div>
        {/* RightSideNav */}
        <div className="w-2/5 hidden md:block">
          <RightSideNae users={users} />
        </div>
      </div>
    </div>
  );
}
