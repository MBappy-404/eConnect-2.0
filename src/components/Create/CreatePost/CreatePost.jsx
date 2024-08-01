"use client";
import { AuthContext } from "@/AuthProvider/Auth";
import { Post } from "@/utils/post";
import Users from "@/utils/users";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
 

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [enable,setEnable] = useState(false)
   
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);
  const handleOpen = () => {
    onOpen();
  };

  const [showName, setShowName] = useState({});
  const [showImagePreview, setShowImagePreview] = useState({});
  const fileInputRef = useRef();
  const router = useRouter();

  // load  users data for post
  let updatedName = users
    .filter((users) => {
      return users.email === user?.email;
    })
    .map((eUser) => eUser.updatedName);
  let name = users
    .filter((users) => {
      return users.email === user?.email;
    })
    .map((eUser) => eUser?.name);
  let userPhoto = users
    .filter((users) => {
      return users.email === user?.email;
    })
    .map((eUser) => eUser?.updatedPhoto);
  let userId = users
    .filter((users) => {
      return users.email === user?.email;
    })
    .map((eUser) => eUser._id);
  const postUser = updatedName[0] ? updatedName[0] : name[0];

  //   preview image
  const handleClearFile = () => {
    setShowName("");
    setShowImagePreview("");
    fileInputRef.current.value = "";
  };

  // load users
  useEffect(() => {
    const loadUser = async () => {
      const usersData = await Users();
      setUsers(usersData);
    };
    loadUser();
  }, []);

  // create Post
  const createPost = (data) => {
    setLoading(true);
    // post info
    const postInfo = {
      post: data?.post,
      userId: userId[0],
      postUser: postUser,
      like: 0,
      comment: [],
      time: new Date(),
      userEmail: user?.email,
      postUserPhoto: userPhoto ? userPhoto[0] : user?.photoURL,
    };

    const image = fileInputRef.current.files[0];
    // console.log(image.name);

    if (image) {
      // Post with photo
      let formData = new FormData();
      formData.append("image", image);

      fetch(
        "https://api.imgbb.com/1/upload?key=e4f70e097c1b45d34e9cdba2c6851894",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((res) => res.json())
        .then((imageData) => {
          // console.log(imageData);
          if (imageData.success) {
            const post = {
              image: imageData.data.url,
              ...postInfo,
            };
            // console.log(post);
            fetch(" https://e-connect-server-mbappy404s-projects.vercel.app/post", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(post),
            })
              .then((res) => res.json())
              .then((data) => {
                // console.log(data);
                router.refresh();
               
                setLoading(false);
                setShowName("");
                setShowImagePreview("");
                fileInputRef.current.value = "";
                onClose();
              });
          }
        });
    } else {
      const post = postInfo;

      fetch(" https://e-connect-server-mbappy404s-projects.vercel.app/post", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(post),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          router.refresh();
         
          setLoading(false);
          onClose();
        });
    }
  };

  return (
    <div>
      <div class="flex pt-3 pb-1   gap-1 items-center">
        <div class="flex w-full gap-2 bg-[#233046] rounded-xl border border-gray-700 p-2.5">
          <Button
            onPress={handleOpen}
            className="bg-[#2d3d58] hover:bg-[#364969]  transition-all duration-300 cursor-pointer flex items-center justify-center w-full text-sm rounded-md  "
          >
            Write Your Status
          </Button>

          {/* Modal  */}

          <Button
            isIconOnly
            onPress={handleOpen}
            className="p-2 cursor-pointer hover:bg-[#364969]  transition-all duration-300 bg-[#2d3d58] rounded-lg"
          >
            <svg
              class="text-center h-7 w-6"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </Button>
        </div>

        {/* modal  */}
        <Modal
          size="lg"
          classNames={{
            body: "py-6 overflow",
            base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
            header: "border-b-[1px] border-[#292f46]",
            footer: "border-t-[1px] border-[#292f46]",
            closeButton: "hover:bg-white/5 active:bg-white/10",
          }}
          placement="center"
          backdrop="blur"
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalContent>
            {(onClose) => (
              <form onSubmit={handleSubmit(createPost)}>
                <ModalHeader className="flex flex-col  gap-1">
                  Create Post
                </ModalHeader>
                <ModalBody>
                  <Textarea
                  
                    {...register("post", {})}
                    classNames={{
                      inputWrapper: "bg-[#1E293B]",
                      label: "text-base",
                    }}
                    onChange={(e) => setEnable(e.target.value?.length >= 2)}
                    label="What do you have in mind?"
                    labelPlacement="outside"
                    placeholder="Write about your status....."
                    className="col-span-12  md:col-span-6"
                  />

                  {/* preview image  */}
                  <div className=" ">
                    {showName?.name ? (
                      <div
                        style={{
                          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${showImagePreview})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        className=" mx-auto flex max-w-[600px]   h-[200px] items-center gap-x-6  rounded-lg border-2   border-gray-800 p-2 bg-[#1E293B]"
                      >
                        {/* <img className="size-full h-full w-full   rounded-lg object-cover" src={showImagePreview} alt={showName?.name} /> */}
                        <div className="flex  py-2 px-4 justify-center bg-[#1E293B]  gap-3 rounded-md mx-auto items-center space-y-1.5 overflow-hidden">
                          <p className=" text-xs text-gray-300">
                            {(showName.size / 1024).toFixed(1)} KB
                          </p>
                          <div
                            className="   cursor-pointer  "
                            onClick={handleClearFile}
                          >
                            <i className="fa-solid fa-xmark text-xl"></i>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <label
                        className=" mx-auto flex max-w-[600px] cursor-pointer flex-col h-[200px] items-center justify-center space-y-3 rounded-lg     border-gray-700 p-6 bg-[#1E293B]"
                        htmlFor="file5"
                      >
                        <i className="fa-solid text-5xl fa-cloud-arrow-up"></i>
                        <div className="space-y-1.5 text-center">
                          <h5 className="whitespace-nowrap text-base font-medium tracking-tight ">
                            Upload your file
                          </h5>
                          <p className="text-sm text-gray-500">
                            File Should be in PNG, JPEG or JPG formate
                          </p>
                        </div>
                      </label>
                    )}

                    <input
                      ref={fileInputRef}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const imageFile = e.target.files[0];
                          setShowName(imageFile);
                          setShowImagePreview(URL.createObjectURL(imageFile));
                        }
                      }}
                      className="hidden"
                      id="file5"
                      type="file"
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button type="submit" isLoading={loading} isDisabled={!enable} color="primary">
                    Create
                  </Button>
                </ModalFooter>
              </form>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default CreatePost;
