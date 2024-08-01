"use client";

import { AuthContext } from "@/AuthProvider/Auth";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import badge from "@/assets/verified.svg";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const Peoples = ({ people }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  let name = people.name 
  let updatedName = people.updatedName
  const liked = people?.likes?.some(like => like.userEmail === user?.email)
  // console.log(liked);
  const handleUserFollower = (id) => {
    const like = {
      userEmail: user?.email,
      userName: updatedName ? updatedName : name,
    };
    // console.log(like);
    fetch(` https://e-connect-server-mbappy404s-projects.vercel.app/user/like/${id}`, {
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
    <ul  className="">
            <li className="flex items-center justify-between py-3 px-2 md:px-4">
              <div
                className={`relative overflow-hidden w-12 ${
                  !people.photo && !people.updatedPhoto ? "" : "border"
                } border-gray-500   h-12 rounded-full   mr-4`}
              >
                {!people.updatedPhoto && !people.photo ? (
                  <i className="fa-solid text-gray-400 fa-circle-user  text-5xl"></i>
                ) : (
                  <Image
                    src={
                      people?.updatedPhoto
                        ? people?.updatedPhoto
                        : people?.image
                    }
                    alt="user"
                    objectFit="cover"
                    fill
                  />
                )}
              </div>
              <div className="flex-1">
                <Link href={`/user/${people._id}`}>
                  <h3 className="hover:underline text-base  flex gap-1 font-medium text-gray-300">
                    {people?.updatedName ? people?.updatedName : people?.name}
                    {people?.email === "sadikulsad0810@gmail.com" &&  <Image src={badge} width={18} alt="badge" />}
                  </h3>
                </Link>
                <p className="text-gray-400  font-medium text-base">
                  Followers: {people?.likes ? people?.likes?.length : 0}
                </p>
              </div>
              <Button size="sm" isDisabled={liked}  variant="light"
                onClick={() => handleUserFollower(people?._id)}
                className=" px-4 text-sm font-semibold text-blue-400 border border-blue-400 rounded-full  "
              >
               {liked ? <i className="fa-solid fa-user-check"></i> : "Connect"}
              </Button>
            </li>
          </ul>
    </div>
  );
};

export default Peoples;
