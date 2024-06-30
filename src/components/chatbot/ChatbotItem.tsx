'use client';

import FAB from '@/assets/icons/fab.svg';
import { useState } from 'react';
import ChatbotChat from './ChatbotChat';

export type TMPProps = {
  role: 'bot' | 'user';
  text: string;
};

export default function ChatbotItem({
  chatting,
}: {
  chatting: TMPProps[];
}) {
  const [openActive, setOpenActive] = useState<Boolean>(false);

  const openHandler = () => {
    setOpenActive(true);
  };

  const closeHandler = () => {
    setOpenActive(false);
  };

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
