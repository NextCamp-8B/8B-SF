'use client';

import SMALLLOGO from '@/assets/logos/small_logo_light.svg';
import { useTranslations } from 'next-intl';
import { useEffect, useState, useRef } from 'react';
import SkeletonChatbotContent from '../skeleton/chatbot/SkeletonChatbotContent';
import { Session } from 'next-auth';

export default function ChatbotContent({
  chatting,
  isLoading,
  typingStatus,
  session,
}: {
  chatting: string[] | null;
  isLoading: boolean;
  typingStatus: boolean[];
  session: Session | null;
}) {
  const [chatLog, setChatLog] = useState<string[] | null>(chatting);
  const t = useTranslations('Chatbot');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const skeletonChatContainerRef = useRef<HTMLDivElement>(null);
  const [displayedChats, setDisplayedChats] = useState<string>('');

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

  useEffect(() => {
    if (chatting && typingStatus[chatting.length - 1] === true) {
      let currentIndex = 0;
      setDisplayedChats('');
      const interval = setInterval(() => {
        if (currentIndex < chatting[chatting.length - 1].length) {
          setDisplayedChats(
            (prev) =>
              prev + chatting[chatting.length - 1][currentIndex - 1],
          );
          currentIndex++;
        } else {
          clearInterval(interval);

          fetch('/api/chatbot/status', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              status: false,
              user_id: session?.user.id,
              displayedchat: chatting[chatting.length - 1],
            }),
          }).then((response) => response.json());
        }
      }, 20);

      return () => clearInterval(interval);
    }
  }, [chatting, typingStatus, session]);

  const chatFormat = (chat: string) => {
    // 정규 표현식을 사용하여 문장의 끝에 있는 마침표만 분리
    const sentences = chat.match(/(?:\d+\.\d+|[^.!?])+[.!?]*/g) || [];
    return sentences.map((sentence, index) => (
      <div key={index}>{sentence.trim()}</div>
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
                {typingStatus[index] === false ? (
                  chatFormat(chat)
                ) : (
                  <div>{chatFormat(displayedChats)}</div>
                )}
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
