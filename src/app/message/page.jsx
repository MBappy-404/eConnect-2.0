import Chat from "@/components/Message/Chat";
import { receiveMessage } from "@/utils/message";
import Users from "@/utils/users";

 

const page = async() => {
    // load  users data for post
    const users = await Users();
    const messages = await receiveMessage();
    return (
        <div>
            <Chat users={users} messages={messages}/>
        </div>
    );
};

export default page;