import VisitProfile from "@/components/VisitProfile/VisitProfile";
import  Post  from "@/utils/post";
import Users, { UsersDetails } from "@/utils/users";
 

 

    const page = async({params}) => {
    const post = await Post();
    const user = await UsersDetails(params.id);
    const users = await Users();
    return (
        <div>
            <VisitProfile people={user} posts={post} users={users}/>
        </div>
    );
};

export default page;