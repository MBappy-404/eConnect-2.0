import { AuthContext } from "@/AuthProvider/Auth";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import Image from "next/image";
import { useContext, useState } from "react";
import PostDetailsModal from "../Post/PostDetailsModal/PostDetailsModal";
import { useRouter } from "next/navigation";

const CommentModal = ({ post, users, isOpen, onOpenChange }) => {
  const { user } = useContext(AuthContext);
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  let name = users
    ?.filter((users) => {
      return users.email === user?.email;
    })
    .map((eUser) => eUser.name);
  let updatedName = users
    ?.filter((users) => {
      return users.email === user?.email;
    })
    .map((eUser) => eUser.updatedName);
  let postUser = updatedName[0] ? updatedName[0] : name[0];
  let updatedPhoto = users
    ?.filter((users) => {
      return users.email === user?.email;
    })
    .map((eUser) => eUser?.updatedPhoto);
  let commentUserId = users
    .filter((users) => {
      return users.email === user?.email;
    })
    .map((eUser) => eUser._id);
  const handleComment = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    const comment = form.comment.value;

    // comment info
    // send Database
    const commentData = {
      comment: comment,
      commentUserId: commentUserId[0],
      postId: post._id,
      time: new Date(),
      userName: postUser,
      userEmail: user?.email,
      userPhoto: updatedPhoto ? updatedPhoto[0] : user?.photoURL,
    };

    fetch(` https://e-connect-server-mbappy404s-projects.vercel.app/comments/post/${post._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.acknowledged) {
          setEnabled(false);
          setLoading(false);
          router.refresh();
          form.reset();
        }
      });
  };

  const photo = updatedPhoto[0] ? updatedPhoto[0] : (user?.photoURL ? user?.photoURL : null)
  return (
    <div>
      <Modal
        className="min-h-[90vh] sticky overflow-hidden"
        isOpen={isOpen}
        backdrop="blur"
        size="2xl"
        classNames={{
          body: " bg-[#1E293B]   px-1 md:px-3 py-0 overflow-y-auto",
          base: "border-[#292f46] bg-[#19172c]  text-[#a8b0d3]",
          header: "bg-[#1E293B] rounded-t-xl border-b border-[#292f46]",
          footer: "bg-[#1E293B] rounded-b-xl border-t border-[#292f46]",
          // closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
        placement="auto"
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 py-2 md:py-3 text-center">
                {post.postUser}&apos;s Post{" "}
              </ModalHeader>
              {/* modal body  */}
              <ModalBody>
                <div className="border border-gray-600">
                  <PostDetailsModal post={post} users={users} />
                </div>
              </ModalBody>
              {/* modal footer  */}
              <form onSubmit={handleComment}>
                <ModalFooter className="flex justify-start items-center py-2 md:py-3  gap-2">
                  <div className="w-10 h-10 relative -mt-4 rounded-full overflow-hidden border border-gray-700  ">
                    {photo ?
                      <>
                        <Image
                          src={photo}
                          objectFit="cover"
                          fill
                          placeholder="blur"
                          blurDataURL="data:..."
                          alt="user"
                        />
                      </> :
                      <i class="fa-solid fa-circle-user text-[38px]  "></i>
                    }
                  </div>
                  <Textarea
                    minRows={2}
                    name="comment"
                    variant="faded"
                    onChange={(e) => setEnabled(e.target?.value?.length >= 2)}
                    classNames={{
                      inputWrapper: "bg-gray-700",
                    }}
                    placeholder="Write a comment"
                    className="col-span-6 w-[85%] focus:bg-gray-600 text-gray-300  items-center  md:col-span-6"
                  />

                  <Button isIconOnly isDisabled={!enabled} isLoading={loading} type="submit">
                    <i class="fa-solid text-2xl rotate-45 fa-location-arrow"></i>
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CommentModal;
