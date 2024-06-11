import Report from "@/components/Reports/Report";
import  UserReport  from "@/utils/post";
import Users from "@/utils/users";


const page = async() => {
    const data = await UserReport();

    const users = await Users();

    return (
        <div>
            <Report reports={data} users={users}/>

            {
                data?.length === 0 && <h1 className="text-center text-3xl font-bold">No Report Found</h1>
            }
        </div>
    );
};

export default page;