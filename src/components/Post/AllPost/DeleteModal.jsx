"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

import { useRouter } from "next/navigation";
import { useState } from "react";
 

const DeleteModal = ({ id, openDeleteModal, setOpenDeleteModal }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
 
  const handleDelete = () => {
    setLoading(true);
    fetch(` https://e-connect-server-mbappy404s-projects.vercel.app/post/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.acknowledged) {
          setOpenDeleteModal(false);
          router.refresh();
          
          setLoading(false);
        }
      });
  };

  return (
    <div>
      <Modal
        isOpen={openDeleteModal}
        backdrop="blur"
        size="lg"
        classNames={{
          body: "py-0 bg-[#1E293B] overflow-y-auto",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "bg-[#1E293B] rounded-t-xl border-b border-[#292f46]",
          footer: "bg-[#1E293B] rounded-b-xl border-t border-[#292f46]",
          // closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
        placement="center"
        scrollBehavior="inside"
        onClose={() => setOpenDeleteModal(false)}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              Delete Post
            </ModalHeader>

            {/* modal body  */}
            <ModalBody className="py-5">
              <p> Are you sure you want to delete this post?</p>
            </ModalBody>
            {/* modal footer  */}

            <ModalFooter className="flex justify-end   gap-2">
              <Button onClick={() => setOpenDeleteModal(false)} color="primary">
                Not Now
              </Button>
              <Button
                onClick={handleDelete}
                isLoading={loading}
                color="primary"
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeleteModal;
