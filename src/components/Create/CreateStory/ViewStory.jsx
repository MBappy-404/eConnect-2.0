"use client";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
const ViewStory = ({ storyId, stories, openStory, setOpenStory }) => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const [isSingleView, setIsSingleView] = useState(false);

  useEffect(() => {
    const index = stories
      .slice()
      .reverse()
      .findIndex((story) => story._id === storyId);
    if (index !== -1) {
      setCurrentSlider(index);
      setIsSingleView(true);
    }
  }, [storyId, stories]);

  const prevSlider = () => {
    setCurrentSlider((currentSlider) =>
      currentSlider === 0 ? stories.length - 1 : currentSlider - 1
    );
    setIsSingleView(false); // Exit single view mode when navigating to the previous story
  };

  const nextSlider = () => {
    setCurrentSlider((currentSlider) =>
      currentSlider === stories.length - 1 ? 0 : currentSlider + 1
    );
    if (isSingleView) {
      setIsSingleView(false); // Exit single view mode if in single view mode
    }
  };

  return (
    <div>
      <Modal
        size="full"
        isOpen={openStory}
        hideCloseButton={true}
        className="overflow-hidden bg-[#1E293B]"
        onClose={() => setOpenStory(false)}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex y-1.5  border-b border-gray-700 justify-between items-center">
              <h1 className="text-2xl font-semibold">Stories</h1>
              <i
                onClick={() => setOpenStory(false)}
                className="fa-solid fa-xmark cursor-pointer mr-2"
              ></i>
            </ModalHeader>
            <ModalBody className="px-2">
              <div className="w-full relative overflow-hidden">
                {/* arrow left */}
                <button
                  onClick={prevSlider}
                  className="absolute top-1/2 left-3 z-50 flex justify-center items-center bg-[#344766] border border-[#425b81] rounded-full w-10 h-10 "
                >
                  <svg
                    className="w-4 h-4 md:w-6 md:h-6 icon"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                  >
                    <g strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fill="#0095FF"
                        d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"
                      ></path>
                    </g>
                  </svg>
                </button>
                {/* arrow right */}
                <button
                  onClick={nextSlider}
                  className="absolute top-1/2 z-50 right-3  flex justify-center items-center bg-[#344766] border border-[#425b81] rounded-full w-10 h-10 "
                >
                  <svg
                    className="w-4 h-4 md:w-6 md:h-6 icon"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                    transform="rotate(180)"
                  >
                    <g strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fill="#0095FF"
                        d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"
                      ></path>
                    </g>
                  </svg>
                </button>

                {/* Carousel container */}
                <div
                  className={`ease-linear min-w-full flex transform-gpu ${isSingleView ? "duration-0" : "duration-500 "
                    }`}
                  style={{ transform: `translateX(-${currentSlider * 100}%)` }}
                >
                  {/* sliders */}
                  {stories
                    .slice()
                    .reverse()
                    .map((story, inx) => (
                      <div key={story._id} className="min-w-full  ">
                        <div className=" max-w-[400px] flex items-center rounded-2xl border border-gray-600   bg-black  relative overflow-hidden   min-h-[90vh] mx-auto">
                          <div className="absolute flex gap-2 items-center top-3 left-3">
                            <div className="relative  overflow-hidden w-12 h-12 rounded-full border border-gray-600    ">
                              {story.userPhoto ? (
                                <Image
                                  src={story.userPhoto}
                                  className="border border-gray-800"
                                  fill
                                  objectFit="cover"
                                  alt="userPhoto"
                                />
                              ) : (
                                <i className="fa-solid fa-circle-user text-5xl"></i>
                              )}
                            </div>
                            <h2 className="text-sm text-gray-300 font-bold">
                              {story.userName}
                            </h2>
                          </div>

                          <Image
                            src={story.image}
                            className="mx-auto  bg-black/20 "
                            width={450}
                            height={450}
                            alt={`Slider - ${inx + 1}`}
                          />



                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ViewStory;
