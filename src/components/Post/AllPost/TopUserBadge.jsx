"use client";
import { Avatar, Badge, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import top1 from "@/assets/1.png";
import top2 from "@/assets/2.png";
import top3 from "@/assets/3.png";

const TopUserBadge = ({ post, topUser }) => {
  const index = topUser
    .map((user, index) => ({ email: user.user_email, index: index + 1 }))
    .filter((user) => user.email === post.userEmail)
    .map((user) => user.index);
  console.log(index);
  return (
    <div>
      <Tooltip
        isDisabled={index[0] > 3}
        classNames={{
          base: [
            // arrow color
            "before:bg-gray-600  ",
          ],
          content: ["py-2 px-4 shadow-xl", "bg-gray-600"],
        }}
        showArrow
        placement="right"
        content="Top User"
      >
        <div className="relative  ">
          {!post.postUserPhoto ? (
            <Avatar showFallback src="https://images.unsplash.com/broken" />
          ) : (
            <>
              {index[0] === 1 || index[0] === 2 || index[0] === 3 ? (
                <Badge
                  isOneChar
                  content={
                    index[0] === 1 ? (
                      <Image
                        src={top1}
                        alt="top"
                        className=""
                        width={300}
                        height={300}
                      />
                    ) : index[0] === 2 ? (
                      <Image
                        src={top2}
                        alt="top"
                        className=""
                        width={300}
                        height={300}
                      />
                    ) : (
                      <Image
                        src={top3}
                        alt="top"
                        className=""
                        width={300}
                        height={300}
                      />
                    )
                  }
                  showOutline={false}
                  placement="bottom-right"
                >
                  <Avatar
                    isBordered
                    color="warning"
                    radius="full"
                    src={post.postUserPhoto}
                  />
                </Badge>
              ) : (
                <Avatar size="md" radius="full" src={post.postUserPhoto} />
              )}
            </>
          )}
        </div>
      </Tooltip>
    </div>
  );
};

export default TopUserBadge;
