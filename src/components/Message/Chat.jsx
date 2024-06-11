"use client";
import { useContext, useEffect, useRef, useState } from "react";
import style from "./style.module.css";
import { AuthContext } from "@/AuthProvider/Auth";
import { receiveMessage } from "@/utils/message";
import Image from "next/image";
import Loader from "./Loader";
const Chat = ({ users, newMessage }) => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState();
 
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

  const [messages, setMessages] = useState([]);
  const endMessageFocus = useRef(null);
  const prevMessageLength = useRef(0);

  useEffect(() => {
    const fetchMessages = async () => {
      ;
      try {
        // Replace 'yourMessageApiEndpoint' with your actual API endpoint
        const response = await fetch(" https://e-connect-server.vercel.app/messages");
        const data = await response.json();
        setMessages(data);
       
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

     fetchMessages()
  }, [messages]);

  useEffect(() => {
    // Scroll to bottom only when new messages arrive
    if (messages.length > prevMessageLength.current) {
      endMessageFocus.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevMessageLength.current = messages.length;
  }, [messages]);


  // send message
  const handleSendMessage = () => {
    const messageInfo = {
      name: postUser ? postUser : user?.displayName,
      message: message?.length >= 1 ? message : "like",
      photo: userPhoto[0] ? userPhoto[0] : user?.photoURL,
      email: user?.email,
    };
    // console.log(data);

    fetch(" https://e-connect-server.vercel.app/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.acknowledged) {
          setMessage("");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <div class="w-full flex antialiased text-gray-200 bg-[#1E293B] ">
        <div class="flex-1 flex flex-col ">
          <main class="flex-grow    flex flex-row">
            <section
              id="chat"
              class={` flex flex-col flex-auto  border border-gray-700`}
            >
              <div className="  sticky top-0  z-10 bg-[#1E293B] w-full  border-b border-gray-600   ">
                <div class="chat-header px-6  py-4 flex flex-row flex-none justify-between items-center shadow">
                  <div class="flex">
                    <div class="w-12 h-12 mr-4 relative flex flex-shrink-0">
                      <img
                        class="shadow-md rounded-full w-full h-full object-cover"
                        src="https://randomuser.me/api/portraits/women/33.jpg"
                        alt=""
                      />
                    </div>
                    <div class="text-sm">
                      <p class="font-bold">eConnect-Room</p>
                      <p>Active 1h ago</p>
                    </div>
                  </div>

                  <div class="flex justify-end  ">
                    <a
                      href="#"
                      class="block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        class="w-full h-full fill-current text-blue-500"
                      >
                        <path d="M11.1735916,16.8264084 C7.57463481,15.3079672 4.69203285,12.4253652 3.17359164,8.82640836 L5.29408795,6.70591205 C5.68612671,6.31387329 6,5.55641359 6,5.00922203 L6,0.990777969 C6,0.45097518 5.55237094,3.33066907e-16 5.00019251,3.33066907e-16 L1.65110039,3.33066907e-16 L1.00214643,8.96910337e-16 C0.448676237,1.13735153e-15 -1.05725384e-09,0.445916468 -7.33736e-10,1.00108627 C-7.33736e-10,1.00108627 -3.44283713e-14,1.97634814 -3.44283713e-14,3 C-3.44283713e-14,12.3888407 7.61115925,20 17,20 C18.0236519,20 18.9989137,20 18.9989137,20 C19.5517984,20 20,19.5565264 20,18.9978536 L20,18.3488996 L20,14.9998075 C20,14.4476291 19.5490248,14 19.009222,14 L14.990778,14 C14.4435864,14 13.6861267,14.3138733 13.2940879,14.7059121 L11.1735916,16.8264084 Z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      class="block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2 ml-4"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        class="w-full h-full fill-current text-blue-500"
                      >
                        <path d="M0,3.99406028 C0,2.8927712 0.894513756,2 1.99406028,2 L14.0059397,2 C15.1072288,2 16,2.89451376 16,3.99406028 L16,16.0059397 C16,17.1072288 15.1054862,18 14.0059397,18 L1.99406028,18 C0.892771196,18 0,17.1054862 0,16.0059397 L0,3.99406028 Z M8,14 C10.209139,14 12,12.209139 12,10 C12,7.790861 10.209139,6 8,6 C5.790861,6 4,7.790861 4,10 C4,12.209139 5.790861,14 8,14 Z M8,12 C9.1045695,12 10,11.1045695 10,10 C10,8.8954305 9.1045695,8 8,8 C6.8954305,8 6,8.8954305 6,10 C6,11.1045695 6.8954305,12 8,12 Z M16,7 L20,3 L20,17 L16,13 L16,7 Z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      class="block rounded-full hover:bg-gray-700 bg-gray-800 w-10 h-10 p-2 ml-4"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        class="w-full h-full fill-current text-blue-500"
                      >
                        <path d="M2.92893219,17.0710678 C6.83417511,20.9763107 13.1658249,20.9763107 17.0710678,17.0710678 C20.9763107,13.1658249 20.9763107,6.83417511 17.0710678,2.92893219 C13.1658249,-0.976310729 6.83417511,-0.976310729 2.92893219,2.92893219 C-0.976310729,6.83417511 -0.976310729,13.1658249 2.92893219,17.0710678 Z M9,11 L9,10.5 L9,9 L11,9 L11,15 L9,15 L9,11 Z M9,5 L11,5 L11,7 L9,7 L9,5 Z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              

              <div
                id="chat-scroll"
                class={`${style["chat-scroll"]} flex flex-col  space-y-0 px-1 pb-3   overflow-hidden  `}
              >
               {
                !messages.length ? <Loader/> : 
                <>
                 {messages?.map((message, i) => (
                  <div class="chat-message" key={i + 1}>
                    {message?.email !== user?.email ? (
                      //   message receive
                      <div class="flex items-end">
                        <div class="flex flex-col space-y-2    text-xs   mx-2 order-2 mb-2 items-start">
                          <span className=" -mb-1 ml-1 block text-gray-400 text-[10px]">
                            {message?.email === "sadikulsad0810@gmail.com" ? 
                              <>CEO</>
                            : 
                              <>{message?.name}</>
                            }
                          </span>
                          <div>
                            {message.message === "like" ? (
                             <button class="flex   flex-shrink-0 focus:outline-none transform scale-x(1)    block text-blue-600 hover:text-blue-700 w-6 h-6">
                             <svg
                               viewBox="0 0 20 20"
                               class="w-full h-full fill-current"
                             >
                               <path d="M8.9989564,0 C10.1041021,0 11,0.886706352 11,1.99810135 L11,8 L18.0026083,8 C19.1057373,8 20,8.88772964 20,10 L20,12 L17.7033667,18.1243554 C17.3149079,19.1602453 16.0980496,20 14.9914698,20 L7.00853025,20 C5.8992496,20 5,19.1125667 5,18.000385 L5,10 L8,3 L8,0 L8.9989564,0 L8.9989564,0 Z M3,10 L0,10 L0,20 L3,20 L3,10 L3,10 Z" />
                             </svg>
                           </button>
                            ) : (
                              <div class="px-4 break-all py-2 text-sm  max-w-[250px] md:max-w-[300px] rounded-lg rounded-bl-none block bg-[#374151] text-gray-200">
                                {message?.message}
                              </div>
                            )}
                          </div>
                        </div>
                        {message.photo ? (
                          <img
                            src={message.photo}
                            alt="My profile"
                            class="w-5 h-5 md:w-8  border-gray-600 border  object-cover md:h-8 rounded-full order-1"
                          />
                        ) : (
                           <i className="fas fa-user-circle text-[18px]   md:text-[30px]       rounded-full "></i>
                        )}
                      </div>
                    ) : (
                      // message send
                      <div class="chat-message ">
                        <div class="flex items-end justify-end my-1">
                          {
                            message.message === "like" ? <button class="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6">
                            <svg
                              viewBox="0 0 20 20"
                              class="w-full h-full fill-current"
                            >
                              <path d="M11.0010436,0 C9.89589787,0 9.00000024,0.886706352 9.0000002,1.99810135 L9,8 L1.9973917,8 C0.894262725,8 0,8.88772964 0,10 L0,12 L2.29663334,18.1243554 C2.68509206,19.1602453 3.90195042,20 5.00853025,20 L12.9914698,20 C14.1007504,20 15,19.1125667 15,18.000385 L15,10 L12,3 L12,0 L11.0010436,0 L11.0010436,0 Z M17,10 L20,10 L20,20 L17,20 L17,10 L17,10 Z" />
                            </svg>
                          </button> : <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 mb-2 order-1 items-end">
                             
                            <div>
                              <div class="px-4 break-all py-2 text-sm max-w-[250px] md:max-w-[300px]  block rounded-lg  rounded-br-none bg-blue-600 text-white ">
                                {message?.message}
                              </div>
                            </div>
                          </div>
                          }
                          {message.photo ? (
                            <img
                              src={message.photo}
                              alt="My profile"
                              class="w-4 h-4   border-gray-600 border   file: rounded-full order-1"
                            />
                          ) : (
                            <i className="fas fa-user-circle text-[10px]        rounded-full "></i>
                          )}
                        </div>
                      </div>
                    )}
                    <div ref={endMessageFocus} />
                  </div>
                ))}
                </>
               }
              </div>

              <div class="chat-footer sticky bottom-0   flex-none">
                <div class="flex flex-row items-center   bg-gray-800    md:bottom-0 bottom-10 p-3">
                  <div class="relative flex-grow ">
                    <label>
                      <input
                        class="rounded-full py-2 pl-3 pr-10 w-full border border-gray-600 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
                        type="text"
                        placeholder="Aa"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <button
                        type="button"
                        class="absolute top-0 right-0 mt-2 mr-3 flex flex-shrink-0 focus:outline-none block text-blue-600 hover:text-blue-700 w-6 h-6"
                      >
                        <svg
                          viewBox="0 0 20 20"
                          class="w-full h-full fill-current"
                        >
                          <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM6.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2.16 3a6 6 0 0 1-11.32 0h11.32z" />
                        </svg>
                      </button>
                    </label>
                  </div>

                  {message?.length >= 1 ? (
                    <button
                      onClick={handleSendMessage}
                      type="button"
                      class="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
                    >
                      <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                        <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={handleSendMessage}
                      type="button"
                      class="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        class="w-full h-full fill-current"
                      >
                        <path d="M11.0010436,0 C9.89589787,0 9.00000024,0.886706352 9.0000002,1.99810135 L9,8 L1.9973917,8 C0.894262725,8 0,8.88772964 0,10 L0,12 L2.29663334,18.1243554 C2.68509206,19.1602453 3.90195042,20 5.00853025,20 L12.9914698,20 C14.1007504,20 15,19.1125667 15,18.000385 L15,10 L12,3 L12,0 L11.0010436,0 L11.0010436,0 Z M17,10 L20,10 L20,20 L17,20 L17,10 L17,10 Z" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Chat;
