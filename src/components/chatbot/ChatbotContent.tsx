'use client';

import SMALLLOGO from '@/assets/logos/small_logo_light.svg';
import { useTranslations } from 'next-intl';
import { useEffect, useState, useRef } from 'react';
import SkeletonChatbotContent from '../skeleton/chatbot/SkeletonChatbotContent';

export default function ChatbotContent({
  chatting,
  isLoading,
}: {
  chatting: string[] | null;
  isLoading: boolean;
}) {
  const [chatLog, setChatLog] = useState<string[] | null>(chatting);
  const t = useTranslations('Chatbot');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const skeletonChatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setChatLog(chatting);
  }, [chatting]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatLog]);

  useEffect(() => {
    if (
      isLoading &&
      chatContainerRef.current &&
      skeletonChatContainerRef.current
    ) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [isLoading]);

  const chatFormat = (chat: string) => {
    return chat.split('.').map((sentence, index) => (
      <div key={index}>
        {sentence.trim()}
        {sentence && '.'}
      </div>
    ));
  };

  return (
    <div
      className="flex flex-col w-[448px] h-[396px] overflow-x-auto px-4 no-scrollbar"
      ref={chatContainerRef}
    >
      <div className="flex items-start space-x-2 w-4/5 break-words p-6">
        <div className="flex justify-center items-center bg-primary-900 min-w-[48px] max-w-[48px] min-h-[48px] rounded-md">
          <SMALLLOGO width={28} height={24} />
        </div>
        <div className="max-w-full b5 bg-primary-50 rounded-lg p-2">
          {t('comment')}
        </div>
      </div>
      {chatLog &&
        chatLog.map((chat, index) =>
          index % 2 === 1 ? (
            <div
              key={index}
              className="flex items-start space-x-2 w-4/5 break-words p-6"
            >
              <div className="flex justify-center items-center bg-primary-900 min-w-[48px] max-w-[48px] min-h-[48px] rounded-md">
                <SMALLLOGO width={28} height={24} />
              </div>
              <div className="max-w-full b5 bg-primary-50 rounded-lg p-2">
                {chatFormat(chat)}
              </div>
            </div>
          ) : (
            <div
              key={index}
              className="flex flex-col b5 max-w-[300px] rounded-lg ml-auto space-x-2 break-words bg-grayscale-100 p-2"
            >
              {chat}
            </div>
          ),
        )}
      {isLoading && (
        <div ref={skeletonChatContainerRef}>
          <SkeletonChatbotContent />{' '}
        </div>
      )}
    </div>
  );
}
