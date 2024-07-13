"use client";
import { AuthContext } from "@/AuthProvider/Auth";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
 

const EditProfile = ({ users, onClose }) => {
   
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { user } = useContext(AuthContext);
  const filterUser = users.filter((users) => {
    return users.email === user?.email;
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  let userId = users
    .filter((users) => {
      return users.email === user?.email;
    })
    .map((eUser) => eUser._id);

  let savedPhoto = users
    .filter((users) => {
      return users.email === user?.email;
    })
    .map((eUser) => eUser.updatedPhoto);
  let photo = savedPhoto[0];

  const handleUpdate = (data) => {
    setLoading(true);
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);

    const updateInfo = {
      updatedEmail: data.email,
      updatedName: data.name,
      bio: data.bio,
      phone: data.phone,
      college: data.college,
      work: data.work,
      address: data.address,
      facebook: data.facebook,
      twitter: data.twitter,
      instagram: data.instagram,
    };

    if (data.image[0]) {
      // update with image
      fetch(
        "https://api.imgbb.com/1/upload?key=e4f70e097c1b45d34e9cdba2c6851894",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((res) => res.json())
        .then((imageData) => {
          console.log(imageData);
          if (imageData.success) {
            const updatedInfo = { image: imageData.data.url, ...updateInfo };

            // data for profile picture update post
            const postInfo = {
              userId: userId[0],
              postUser: data.name,
              type: "profilePicture",
              like: 0,
              comment: [],
              image: imageData.data.url,
              time: new Date(),
              userEmail: user?.email,
              postUserPhoto: imageData.data.url,
            };

            // post for update profile
            fetch("https://e-connect-server.vercel.app/post", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(postInfo),
            })
              .then((res) => res.json())
              .then((data) => {
                // console.log(data);
              });

            // update profile info
            fetch(`https://e-connect-server.vercel.app/user?email=${user?.email}`, {
              method: "PUT",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(updatedInfo),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                if (data.acknowledged || data.matchedCount) {
                  setLoading(false);
                  router.refresh();
                
                  onClose();
                }
              });
          }
        });
    } else {
      // update without image
      const updatedInfo = { image: photo, ...updateInfo };
      fetch(`https://e-connect-server.vercel.app/user?email=${user?.email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.acknowledged || data.matchedCount) {
            setLoading(false);
            router.refresh();
          
            onClose();
          }
        });
    }
  };

  return (
    <div>
      {filterUser?.map((eUser) => (
        <form
          key={eUser._id}
          className="bg-[#1E293B]  py-4 m-auto rounded-2xl"
          onSubmit={handleSubmit(handleUpdate)}
        >
          <div className="relative z-0 mb-6 w-full group">
            <input
              defaultValue={
                eUser.updatedEmail ? eUser.updatedEmail : user.email
              }
              type="email"
              {...register("email", {})}
              className="block py-2.5 px-0 w-full text-sm text-gray-400 font-semibold bg-transparent border-0 border-b-2 border-gray-500 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />

            <label
              for="floating_email"
              className="absolute text-sm text-gray-300  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              defaultValue={
                eUser.updatedName ? eUser.updatedName : user.displayName
              }
              type="text"
              {...register("name", {})}
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-400 font-semibold bg-transparent border-0 border-b-2 border-gray-500 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />

            <label
              for="floating_password"
              className="absolute text-sm text-gray-300  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              defaultValue={eUser.bio}
              type="text"
              {...register("bio", {})}
              id="floating_repeat_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-400 font-semibold bg-transparent border-0 border-b-2 border-gray-500 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />

            <label
              for="floating_repeat_password"
              className="absolute text-sm text-gray-300  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Bio
            </label>
          </div>
          <div className="grid xl:grid-cols-2 xl:gap-6">
            <div className="relative z-0 mb-6 w-full group">
              <input
                defaultValue={eUser.address}
                type="text"
                {...register("address", {})}
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-400 font-semibold bg-transparent border-0 border-b-2 border-gray-500 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />

              <label
                for="floating_first_name"
                className="absolute text-sm text-gray-300  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Address
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                defaultValue={eUser.college}
                type="text"
                {...register("college", {})}
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-400 font-semibold bg-transparent border-0 border-b-2 border-gray-500 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />

              <label
                for="floating_last_name"
                className="absolute text-sm text-gray-300  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                University/College
              </label>
            </div>
          </div>
          <div className="grid xl:grid-cols-2 xl:gap-6">
            <div className="relative z-0 mb-6 w-full group">
              <input
                defaultValue={eUser.phone}
                type="text"
                {...register("phone", {})}
                id="floating_phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-400 font-semibold bg-transparent border-0 border-b-2 border-gray-500 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />

              <label
                for="floating_phone"
                className="absolute text-sm text-gray-300  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                defaultValue={eUser.work}
                type="text"
                {...register("work", {})}
                id="floating_company"
                className="block py-2.5 px-0 w-full text-sm text-gray-400 font-semibold bg-transparent border-0 border-b-2 border-gray-500 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />

              <label
                for="floating_company"
                className="absolute text-sm text-gray-300  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Company/Work place
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                defaultValue={eUser.facebook}
                type="text"
                {...register("facebook", {})}
                id="floating_facebook"
                className="block py-2.5 px-0 w-full text-sm text-gray-400 font-semibold bg-transparent border-0 border-b-2 border-gray-500 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />

              <label
                for="floating_facebook"
                className="absolute text-sm text-gray-300  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Facebook Profile URL
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                defaultValue={eUser.instagram}
                type="text"
                {...register("instagram", {})}
                id="floating_instagram"
                className="block py-2.5 px-0 w-full text-sm text-gray-400 font-semibold bg-transparent border-0 border-b-2 border-gray-500 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />

              <label
                for="floating_instagram"
                className="absolute text-sm text-gray-300  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Instagram Profile URL
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                defaultValue={eUser.twitter}
                type="text"
                {...register("twitter", {})}
                id="floating_twitter"
                className="block py-2.5 px-0 w-full text-sm text-gray-400 font-semibold bg-transparent border-0 border-b-2 border-gray-500 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />

              <label
                for="floating_twitter"
                className="absolute text-sm text-gray-300  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Twitter Profile URL
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full  group">
              <input
                type="file"
                {...register("image", {})}
                id="floating_photo"
                className="block cursor-pointer mt-2 py-2.5 px-0 w-full text-sm text-gray-400 font-semibold bg-transparent border-0 border-b-2 border-gray-500 appearance-none   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />

              <label
                for="floating_photo"
                className="absolute cursor-pointer  text-[17.5px] text-gray-300  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:-translate-y-6"
              >
                Update Profile Photo
              </label>
            </div>
          </div>
          {/* submit  buttons */}
          <div className="flex justify-between">
            <Button onClick={onClose} type="button" size="md">
              Not Now
            </Button>

            <Button isLoading={loading} type="submit" size="md" color="primary">
              Update
            </Button>
          </div>
        </form>
      ))}
    </div>
  );
};

export default EditProfile;
