import EditProfile from "@/components/EditProfile/EditProfile";
import Users from "@/utils/users";

 

const page = async() => {
    const users = await Users();
    return (
        <div>
            <EditProfile users={users}/>
        </div>
    );
};

export default page;