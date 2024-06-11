import PostDetailsModal from "@/components/Post/PostDetailsModal/PostDetailsModal";
import { PostDetails } from "@/utils/post";
import Users from "@/utils/users";

 

const page = async({params}) => {
    const post = await PostDetails(params.id);
    const users = await Users();
    // console.log(post);
    return (
        <div className="border   border-gray-600">
            <div className="bg-[#1E293B] py-2 z-10 sticky top-0 text-center">
                {
                    post.postUser
                }&apos;s Post
            </div>
           <div className="mt-2 ">
           <PostDetailsModal post={post} users={users}/>
           </div>
        </div>
    );
};

export default page;