"use client";
import { Avatar, Badge } from "@nextui-org/react";
import top1 from "@/assets/1.png"
import top2 from "@/assets/2.png"
import top3 from "@/assets/3.png"
import Image from "next/image";
const TopUsers = ({ rank, index }) => {
  
 
   

  return (
    <div>
      <div className={`relative  mr-4`}>
        {!rank.post_count.photo ? (
           <Avatar showFallback src='https://images.unsplash.com/broken' />
        ) : (
          <>
            {index === 1 || index === 2 || index === 3  ? (
              <Badge
                isOneChar
                content={index === 1 ? <Image src={top1} alt="top" className="" width={300} height={300}/> : index === 2 ? <Image src={top2} alt="top" className="" width={300} height={300}/> : <Image src={top3} alt="top" className="" width={300} height={300}/> }
                showOutline={false}
                placement="bottom-right"
              >
                <Avatar
                  isBordered
                  color="warning"
                  radius="full"
                  src={rank.post_count.photo}
                />
              </Badge>
            ) : (
              <Avatar size="md" radius="full" src={rank.post_count.photo} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TopUsers;
