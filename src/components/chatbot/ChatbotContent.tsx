'use client';

import SMALLLOGO from '@/assets/logos/small_logo_light.svg';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function ChatbotContent({
  chatting,
}: {
  chatting: string[] | null;
}) {
  const [chatLog, setChatLog] = useState<string[] | null>(chatting);
  const { data: session, status } = useSession();
  const t = useTranslations('Chatbot');
  useEffect(() => {
    const user_id = session?.user.id;

    const fetchChatbot = async () => {
      const response = await fetch(`/api/chatbot?user_id=${user_id}`);

      if (response.ok) {
        const data = await response.json();
        setChatLog(data.chat);
      }
    };
    fetchChatbot();
  }, [session?.user.id]);
  return (
    <>
      <div className="flex flex-col w-[448px] h-[396px] overflow-x-auto px-4 no-scrollbar">
        <div className="flex items-start  space-x-2 w-4/5 break-words p-6">
          <div className="flex justify-center items-center bg-primary-900 min-w-[48px] max-w-[48px] min-h-[48px] rounded-md">
            <SMALLLOGO width={28} height={24} />
          </div>
          <div className="max-w-full b5 bg-primary-50 rounded-lg p-2">
            {t('comment')}
          </div>
        </div>
        {chatLog &&
          chatLog.map((chat, index) => {
            if (index % 2 === 1) {
              return (
                <div
                  key={index}
                  className="flex items-start  space-x-2 w-4/5 break-words p-6"
                >
                  <div className="flex justify-center items-center bg-primary-900 min-w-[48px] max-w-[48px] min-h-[48px] rounded-md">
                    <SMALLLOGO width={28} height={24} />
                  </div>
                  <div className="max-w-full b5 bg-primary-50 rounded-lg p-2">
                    {chat}
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className=" flex flex-col b5 max-w-[300px] rounded-lg ml-auto space-x-2 break-words bg-grayscale-100 p-2"
                >
                  {chat}
                </div>
              );
            }
          })}
      </div>
    </>
  );
}
