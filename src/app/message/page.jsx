 
import Users from "@/utils/users";
import dynamic from "next/dynamic";

const ChatDynamic = dynamic(() => import("@/components/Message/Chat"), { ssr: false }); //disabled server side rendering

const page = async () => {
  // load  users data for post
  const users = await Users();

  return (
    <div>
      <ChatDynamic users={users} />
    </div>
  );
};

export default page;
