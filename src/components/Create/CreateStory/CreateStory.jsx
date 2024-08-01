"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Avatar,
} from "@nextui-org/react";
import "swiper/css";
import "swiper/css/free-mode";
import { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { AuthContext } from "@/AuthProvider/Auth";
import Users from "@/utils/users";
import { useRouter } from "next/navigation";
import ViewStory from "./ViewStory";
 
const CreateStory = ({stories}) => {
  const [openStory,setOpenStory] = useState(false)
  const [storyId,setStoryId] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
   const {user} = useContext(AuthContext);
    

  const handleOpen = () => {
    onOpen();
  };

  //   preview image
  const [showName, setShowName] = useState({});
  const [showImagePreview, setShowImagePreview] = useState({});
  const fileInputRef = useRef();
  const [users,setUsers] = useState([])
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

  let name = users.filter(users => { return users.email === user?.email }).map(eUser => eUser.name)
  let updatedName = users.filter(users => { return users.email === user?.email }).map(eUser => eUser.updatedName)
  let photo = users.filter(users => { return users.email === user?.email }).map(eUser => eUser.updatedPhoto)
  const postUser = updatedName[0] ? updatedName[0] : name[0];

  // create story 
  const router = useRouter();
 const createStory = () =>{
  const image = fileInputRef.current.files[0];
 
  // console.log(image.name);
  if (user) {
    if (image) {
      // Post with photo
      let formData = new FormData();
      formData.append("image", image);

      fetch(
        "https://api.imgbb.com/1/upload?key=f2c11278b0c7405521c7d060f7caf053",
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
              userName: postUser,
              userPhoto: photo ? photo[0] : user?.photoURL
      
              
            };
            console.log(post);
            fetch(" https://e-connect-server-mbappy404s-projects.vercel.app/story", {
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
              
                setShowName("");
                setShowImagePreview("");
                fileInputRef.current.value = "";
                onClose();
              });
          }
        });
    } else{
      alert("Please select image")
    }
  }
 }


  return (
    <div className="overflow-hidden bg-[#1E293B] border border-gray-700 rounded-b-2xl">
      <div className="flex cursor-pointer w-[550px]  px-1 py-3 items-center">
        {/* Story Slider  */}
        <Swiper slidesPerView={5} autoplay={{ delay: 3000 }} className="mySwiper">
          <SwiperSlide className="py-2 px-2">
            <Avatar
              onClick={handleOpen}
              showFallback
              isBordered
              className="w-20 h-20 border-2 border-dashed border-gray-500"
              fallback={<i class="fa-solid text-xl text-gray-400 fa-camera"></i>}
            />
             <p className="text-[11px]  text-center -ml-3  text-gray-300 mt-2">Add Story</p>
          </SwiperSlide>
          {/* Load Stories  */}
          {stories?.slice().reverse().map((story) => (
            <SwiperSlide onClick={()=>setOpenStory(true)} key={story._id}  className="py-2  px-1  rounded-full">
              <div onClick={() => setStoryId(story._id)} className="flex justify-center mx-auto flex-col">
                <Avatar
                  showFallback
                  className="w-20  h-20 block"
                  isBordered
                  color="primary"
                  fallback={
                    <div className="w-20 h-20">
                      <Image
                        src={story.image}
                        alt="story"
                        layout="fill"
                        objectFit="cover"
                        placeholder="blur"
                        blurDataURL="data:..."
                      />
                    </div>
                  }
                />
                {/* story username  */}
                <p className="text-[11px]  text-center -ml-6 text-gray-300 mt-2">
                  {story?.userName?.length > 10
                    ? story?.userName?.slice(0, 10) + "..."
                    : story?.userName}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
            <>
              <ModalHeader className="flex flex-col  gap-1">
                Create Story
              </ModalHeader>
              <ModalBody>
                <h4 className="text-base">Make a photo story</h4>
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
                      className=" mx-auto flex max-w-[600px] flex-col cursor-pointer h-[200px] items-center justify-center space-y-3 rounded-lg     border-gray-700 p-6 bg-[#1E293B]"
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
                <Button color="primary" onClick={createStory} >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* pass data on view story  */}
      <ViewStory storyId={storyId} stories={stories} openStory={openStory} setOpenStory={setOpenStory}/>
    </div>
  );
};

export default CreateStory;
