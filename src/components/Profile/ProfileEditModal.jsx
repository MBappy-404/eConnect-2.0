import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import EditProfile from "../EditProfile/EditProfile";
const ProfileEditModal = ({ users, isOpen, onOpenChange, onClose }) => {
  return (
    <div>
      <Modal
        size="lg"
        placement="center"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        classNames={{
          body: "bg-[#1E293B] overflow",
          header: "border-b-[1px] border-[#292f46] rounded-t-lg bg-[#1E293B]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
               Update your profile
              </ModalHeader>
              <ModalBody className="rounded-b-lg">
                <EditProfile users={users} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfileEditModal;
