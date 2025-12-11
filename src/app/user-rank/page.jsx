import Rank from "@/components/Rank/Rank";
import  Post  from "@/utils/post";
import Users from "@/utils/users";

const page = async () => {
  const peoples = await Users();
  const posts = await Post();

  // Step 1: Count the number of posts each user has created
  const userPostCounts = {};

  posts.forEach((post) => {
    const userEmail = post.userEmail;
    const userName = post.postUser;
    const userPhoto = post.postUserPhoto;
    const userId = post.userId;

    if (userPostCounts[userEmail]) {
      userPostCounts[userEmail].count++;
    } else {
      userPostCounts[userEmail] = {
        count: 1,
        name: userName,
        photo: userPhoto,
        userId,
      };
    }
  });

   
  const userPostCountsArray = Object.keys(userPostCounts).map((email) => ({
    user_email: email,
    post_count: userPostCounts[email],
  }));
 
  const topUser = userPostCountsArray.sort(
    (a, b) => b.post_count.count - a.post_count.count
  );

 
  

  // console.log(`Posts by ${specificUserEmail}:`, filteredPosts);
  return (
    <div>
      <div className="bg-[#1E293B]    border border-gray-600 shadow-md rounded-md overflow-hidden mb-2  mx-auto mt-2">
        <div className=" py-2 px-2 ">
          <h2 className="text-xl font-semibold text-gray-300">
            Top Users
          </h2>
          <p className="text-sm ">eConnect top users by activities</p>
        </div>
        {topUser.map((rank,i) => (
          <Rank  key={rank.user_email} index={i+1} rank={rank} people={peoples} />
        ))}

        
      </div>
    </div>
  );
};

export default page;
