import Peoples from "@/components/Peoples/Peoples";
import Users from "@/utils/users";

const page = async () => {
  const peoples = await Users();
  return (
    <div>
      <div className="bg-[#1E293B]    border-x border-gray-600 shadow-md rounded-md overflow-hidden mb-2  mx-auto mt-2">
        <div className=" py-2">
          <h2 className="text-xl font-semibold px-2 text-gray-300">
            Top Users
          </h2>
        </div>
        {peoples.slice().map((people) => (
          <Peoples key={people._id} people={people} />
        ))}
      </div>
    </div>
  );
};

export default page;
