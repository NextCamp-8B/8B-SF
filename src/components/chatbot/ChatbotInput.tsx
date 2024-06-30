'use client';

import { FormEvent, useState } from 'react';
import { TMPProps } from './ChatbotItem';

export default function ChatbotInput() {
  const [chatting, setChatting] = useState<TMPProps[]>([]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    //
    const target = e.target as typeof e.target & {
      message: { value: string };
    };

    const message = target.message.value;

    console.log('role : user', message);
  };

  return (
    <>
      <div className="border-t-2 border-t-grayscale-200">
        <form action="" onSubmit={submitHandler} className="p-4">
          <div className="flex gap-4">
            <input
              type="text"
              id="message"
              className="w-[377px] h-14 border-grayscale-100 border-2 rounded-lg pl-4"
            />

            <button
              type="submit"
              className="w-16 h-14 rounded-lg bg-primary-900 "
            >
              <span className="text-[#FFFFFF]"> 전송 </span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
