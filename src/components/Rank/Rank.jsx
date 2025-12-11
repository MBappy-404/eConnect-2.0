"use client";

import { Button, Tab, Tabs } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
 
import TopUsers from "./TopUsers";

const Rank = ({ index, rank, people }) => {
  return (
    <div>
      <ul
        className={`border-t border-gray-600 ${
          index === 1 || index === 2 || index === 3 ? "bg-[#3F3F46]" : ""
        } `}
      >
        <li className="flex  items-center  justify-between py-2 px-2 md:px-4">
          <p className="mr-5 text-base font-semibold">{index}.</p>
          <TopUsers rank={rank} index={index} />
          <div className="flex-1">
            <Link href={`/user/${rank.post_count.userId}`}>
              <h3 className="hover:underline text-sm  flex gap-1 font-semibold text-gray-300">
                {rank.post_count.name ? rank.post_count.name : "Someone"}
                {people?.email === "sadikulsad0810@gmail.com" && (
                  <Image src={badge} width={18} alt="badge" />
                )}
              </h3>
            </Link>
          </div>
          <Button
            variant="light"
            size="sm"
            className=" px-4 text-sm font-semibold text-blue-400 border border-blue-400 rounded-full  "
          >
            Total Post-{rank.post_count.count}
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Rank;
