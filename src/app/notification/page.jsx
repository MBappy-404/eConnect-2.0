import Notification from "@/components/Notification/Notification";
import  Post  from "@/utils/post";
 

 

const page = async() => {
     const data = await Post();
    return (
        <div>
            <Notification notifications={data}/>
        </div>
    );
};

export default page;