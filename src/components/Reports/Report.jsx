"use client";
import { useContext } from "react";
import PostCard from "../Post/AllPost/PostCard";
import { AuthContext } from "@/AuthProvider/Auth";
import Image from "next/image";
import noReport from "@/assets/no-report.svg";

const Report = ({ reports, users }) => {
  const { user } = useContext(AuthContext);
  let report = reports?.filter((elem) => {
    return elem.Reports?.some((ele) => {
      return ele?.postMail === user?.email;
    });
  });

  let allReports = reports;
  
  return (
    <div className=" ">
      <div className="bg-[#1E293B] rounded-b-xl border border-gray-700 border-x border-b">
        <h2 className="text-lg py-2 px-2 font-medium text-gray-300">
          Reported post: {report?.length ? report?.length : "Not Found"}
        </h2>
      </div>
      {!report?.length && (
        <div className="h-screen flex justify-center flex-col items-center">
          <div>
            <Image width={200} height={200} src={noReport} alt="no report" />
          </div>
          <p className="mt-3">Congratulation</p>
          <p> You have No restrictions any post !</p>
        </div>
      )}
      { (user?.email === "sadikulsad0810@gmail.com" ? allReports : report)?.reverse().slice().reverse().map((post) => (
        <PostCard key={post._id} post={post} users={users} />
      ))}
    </div>
  );
};

export default Report;
