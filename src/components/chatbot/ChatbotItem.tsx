'use client';

import FAB from '@/assets/icons/fab.svg';
import { useState } from 'react';
import ChatbotChat from './ChatbotChat';
import { useSession } from 'next-auth/react';

export default function ChatbotItem({}: {}) {
  const [openActive, setOpenActive] = useState<Boolean>(false);
  const [chatting, setChatting] = useState<string[] | null>(null);

  const openHandler = () => {
    setOpenActive(true);
  };

  const closeHandler = () => {
    setOpenActive(false);
  };

  const { data: session, status } = useSession();
  // useEffect(() => {
  //   const userId = session?.user.id;
  //   if (openActive) {
  //     const fetchChatbot = async () => {
  //       const response = await fetch(
  //         `/api/chatbot?user_id=${userId}`,
  //       );

  //       if (response.ok) {
  //         const data = await response.json();
  //         setChatting(data.chat);
  //       }
  //     };
  //     fetchChatbot();
  //   }
  // }, [openActive, session]);

  return (
    <>
      {openActive === false ? (
        <div
          className="w-20 h-20 bg-primary-900 rounded-full relative flex justify-center items-center hover:brightness-150 cursor-pointer"
          onClick={() => openHandler()}
        >
          <FAB width={40} color={'white'} />
        </div>
      ) : (
        <div
          className={`w-[480px] h-[640px] bg-[white] flex justify-center items-center rounded-t-[40px] shadow-2xl duration-300 ease-out ${
            openActive ? 'opacity-100 scale-100' : ''
          }`}
        >
          <ChatbotChat
            closeHandler={closeHandler}
            chatting={chatting}
          />
        </div>
      )}
    </>
  );
}
