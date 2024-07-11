'use client';

import { FormEvent, useState } from 'react';

export default function ChatbotInput() {
  const [message, setMessage] = useState<string>('');

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    //
    const target = e.target as typeof e.target & {
      message: { value: string };
    };

    const message = target.message.value;

    const userId = 1;

    const response = await fetch(`/api/chatbot?user_id=${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: message,
        temperature: 0.1,
        top_p: 0.1,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setMessage('');
    }
  };

  return (
    <>
      <div className="border-t-2 border-t-grayscale-200">
        <form action="" onSubmit={submitHandler} className="p-4">
          <div className="flex gap-4">
            <input
              type="text"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
