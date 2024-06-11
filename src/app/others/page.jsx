import Image from "next/image";
import ceo from "../../assets/ceo.webp";
import leftLight from "@/assets/leftGradient.webp";
import rightLight from "@/assets/rightGradient.webp";
const page = () => {
  return (
    <div>
      <div className="bg-[#1E293B] min-h-[100vh] rounded-2xl flex justify-center items-center overflow-hidden     ">
        <div className="relative  flex flex-col items-center justify-center">
          <div className="container">
           
            <div className="max-w-[400px] bg-[#28364e]  border border-gray-600   shadow-lg rounded-xl p-6">
              <div className="flex flex-col">
                <div className="">
                  <div className="relative  w-full mb-3">
                    <div className=" relative  overflow-hidden   h-64    p-3">
                      <Image src={ceo} alt="ceo" fill objectFit="cover" />
                    </div>
                  </div>
                  <div className="flex-auto justify-evenly">
                    <div className="text-xl text-gray-300 font-semibold mt-1">
                      MD.Saroar Jahan
                    </div>
                    <p className="text-sm text-gray-400">
                      Founder & CEO eConnect
                    </p>
                    <div className="py-3 text-gray-300 text-justify md:text-left">
                      <p>
                        eConnect isn&apos;t just another social
                        platform—it&apos;s your virtual hub for making
                        meaningful connections, discovering awesome content, and
                        staying in the loop with what matters most to you.
                        Whether you&apos;re passionate about photography, love
                        discussing the latest tech trends, or simply enjoy
                        connecting with like-minded individuals, eConnect has a
                        place for you
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
