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

  console.log(userPostCounts);
  // Step 2: Convert the userPostCounts object into an array of objects
  const userPostCountsArray = Object.keys(userPostCounts).map((email) => ({
    user_email: email,
    post_count: userPostCounts[email],
  }));

  // console.log(userPostCountsArray);
  // Step 3: Sort the users by the number of posts in descending order
  const topUser = userPostCountsArray.sort(
    (a, b) => b.post_count.count - a.post_count.count
  );

  // Step 4: Output the sorted list of users by their post count
  // console.log("Users sorted by post count:", userPostCountsArray);

  // The user with the most posts
  const mostActiveUser = userPostCountsArray[0];
  console.log(
    `The user with the most posts is: ${mostActiveUser.user_email} with ${mostActiveUser.post_count} posts.`
  );

  // Step 5: Sort posts by user email alphabetically
  const sortedPostsByEmail = posts.sort((a, b) => {
    if (a.user_email < b.user_email) return -1;
    if (a.user_email > b.user_email) return 1;
    return 0;
  });

  console.log("Posts sorted by user email:", sortedPostsByEmail);

  // Step 6: Optionally filter posts by user email (if needed)
  const specificUserEmail = "user2@example.com"; // change this to the email you want to filter by
  const filteredPosts = posts.filter(
    (post) => post.user_email === specificUserEmail
  );

  console.log(`Posts by ${specificUserEmail}:`, filteredPosts);
  return (
    <div>
      <div className="bg-[#1E293B]    border border-gray-600 shadow-md rounded-md overflow-hidden mb-2  mx-auto mt-2">
        <div className=" py-2">
          <h2 className="text-xl font-semibold px-2 text-gray-300">
            Top Users
          </h2>
        </div>
        {topUser.map((rank,i) => (
          <Rank  key={rank.user_email} index={i+1} rank={rank} people={peoples} />
        ))}

        
      </div>
    </div>
  );
};

export default page;
