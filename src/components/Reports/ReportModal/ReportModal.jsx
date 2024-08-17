"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { useState } from "react";
 
const ReportModal = ({
  id,
  name,
  updatedName,
  email,
  openReportModal,
  setOpenReportModal,
}) => {
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
 
  const report = [
    { name: "Hate Speech" },
    { name: "Nudity Post" },
    { name: "Toxic Behavior" },
    { name: "Religious Affiliation" },
    { name: "Something Else" },
  ];

  const handleReport = () => {
    setLoading(true);
    const report = {
      messages: value,
      reportUser: updatedName ? updatedName : name,
      postUserMail: email,
    };

    fetch(`https://e-connect-server.vercel.app/post/report/${id}`,{
      method: 'PUT',
      headers:{
           'content-type': 'application/json',
      },
      body: JSON.stringify(report)
      })
      .then(res => res.json())
      .then(data => {
           // console.log(data);
           if(data.acknowledged){
            setValue(null)
            setOpenReportModal(false)
             setLoading(false)
             router.refresh()
             
           }
      })
  };

  return (
    <div>
      <Modal
        isOpen={openReportModal}
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
        onClose={() => setOpenReportModal(false)}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              Report Post
            </ModalHeader>

            {/* modal body  */}
            <ModalBody className="py-5">
              <div>
                <h2 className="font-medium text-lg">Select a problem</h2>
                <ul className="">
                  {report.map((item) => (
                    <li
                      onClick={() => setValue(item.name)}
                      key={item.name}
                      className={`${
                        value === item.name
                          ? "bg-blue-500"
                          : "hover:bg-[#374151] "
                      } rounded-full py-2 text-white border border-gray-700 my-2 cursor-pointer transition-all duration-100 flex justify-between items-center px-3 font-semibold`}
                    >
                      {item.name}
                      {value === item.name && (
                        <svg
                          className="inline ml-2 w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </ModalBody>
            {/* modal footer  */}

            <ModalFooter className="flex justify-end   gap-2">
              <Button onClick={() => setOpenReportModal(false)} color="primary">
                Not Now
              </Button>
              <Button onClick={handleReport} disabled={!value}  isLoading={loading} color="primary">
                Submit
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ReportModal;
