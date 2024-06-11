import SavedPost from "@/components/Saved/SavedPost";
import  SavedPosts  from "@/utils/post";
import Users from "@/utils/users";

 

const page = async() => {
    
    const data = await SavedPosts();

    const users = await Users();
   
    return (
        <div>
            
            <SavedPost saved={data} users={users}/>
        </div>
    );
};

export default page;