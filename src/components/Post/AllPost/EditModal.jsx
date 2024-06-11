"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  Tooltip,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";

const EditModal = ({ post, onOpenChange, isOpen,onClose }) => {
  const router = useRouter();
  const[loading,setLoading] = useState(false);
  const { addToast } = useToasts()
  const handleUpdatePost = (e) => {
    e.preventDefault();
   setLoading(true)

    const form = e.target;

    const updateText = {
      updateText: form.updateText.value,
    };
    // console.log(updatePost);
    fetch(` https://e-connect-server.vercel.app/post/update/${post._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateText),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.acknowledged) {
          router.refresh();
          setLoading(false)
          addToast('Your post has been updated', { appearance: 'success', autoDismiss: true });
          onClose();
          form.reset();
        }
      });
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        backdrop="blur"
        size="xl"
        classNames={{
          body: "py-0 bg-[#1E293B] overflow-y-auto",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "bg-[#1E293B] rounded-t-xl border-b border-[#292f46]",
          footer: "bg-[#1E293B] rounded-b-xl border-t border-[#292f46]",
          // closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
        placement="center"
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Update Your Post
                <p className="text-xs font-normal">You can update only text</p>
              </ModalHeader>
              <form onSubmit={handleUpdatePost}>
                {/* modal body  */}
                <ModalBody>
                  <div className="border p-3 border-gray-600">
                    <div class="flex gap-2  items-center">
                      <div className="relative border border-gray-600 w-12  h-12 rounded-full overflow-hidden">
                        {post?.postUserPhoto ? (
                          <Image
                            objectFit="cover"
                            src={post.postUserPhoto}
                            fill
                            alt="user"
                          />
                        ) : (
                          <i class="fa-solid fa-circle-user text-5xl"></i>
                        )}
                      </div>
                      <div class="flex-col flex   items-start">
                        <p class="text-base leading-6 font-medium text-white">
                          {post?.postUser}
                        </p>
                        <span class="text-xs md:text-sm    text-gray-400  ">
                          Public
                          <Tooltip
                            classNames={{
                              base: [
                                // arrow color
                                "before:bg-gray-600  ",
                              ],
                              content: ["py-2 px-4 shadow-xl", "bg-gray-600"],
                            }}
                            showArrow
                            placement="top"
                            content="Public"
                          >
                            <i class="fa-solid fa-earth-americas text-xs md:text-xs text-gray-500 ml-1.5"></i>
                          </Tooltip>
                        </span>
                      </div>
                    </div>
                    <Textarea
                      minRows={3}
                      defaultValue={post?.post}
                      name="updateText"
                      variant="faded"
                      classNames={{
                        inputWrapper: "bg-gray-700",
                      }}
                      placeholder="Write something..."
                      className="col-span-6  mt-4  focus:bg-gray-600 text-gray-300  items-center  md:col-span-6"
                    />
                  </div>
                </ModalBody>
                {/* modal footer  */}

                <ModalFooter className="flex justify-end   gap-2">
                  <Button color="primary" isLoading={loading} type="submit">
                    Update
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

export default EditModal;
