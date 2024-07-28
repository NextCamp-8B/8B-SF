import { useState, useEffect, useCallback } from 'react';
import ChatbotContent from './ChatbotContent';
import ChatbotHeader from './ChatbotHeader';
import ChatbotInput from './ChatbotInput';
import { useSession } from 'next-auth/react';
import { useChatbotStore } from '@/store/chatbotStore';

export default function ChatbotChat({
  closeHandler,
}: {
  closeHandler: () => void;
}) {
  const setChatLog = useChatbotStore((state) => state.setChatLog);
  const chatLog = useChatbotStore((state) => state.chatLog);
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [typingStatus, setTypingStatus] = useState<boolean[]>([]);
  const fetchChatbot = useCallback(async () => {
    const user_id = session?.user.id;
    if (user_id) {
      const response = await fetch(`/api/chatbot?user_id=${user_id}`);
      if (response.ok) {
        const data = await response.json();
        setChatLog(data.chat);
        setTypingStatus(data.typingStatus);
      }
    }
  }, [session?.user.id, setChatLog]);
  useEffect(() => {
    if (session?.user.id) {
      fetchChatbot();
    }
  }, [fetchChatbot, session?.user.id]);

  const handleNewMessage = () => {
    setIsLoading(true);
    setTimeout(() => {
      fetchChatbot().then(() => setIsLoading(false));
    }, 1000);
  };

  return (
    <>
      <div>
        <div className="h-16">
          <ChatbotHeader closeHandler={closeHandler} />
        </div>
        <div className="w-full h-[488px] flex flex-col justify-center items-center">
          <ChatbotContent
            chatting={chatLog}
            isLoading={isLoading}
            typingStatus={typingStatus}
            session={session}
          />
        </div>
        <div className="h-[88px]">
          <ChatbotInput onNewMessage={handleNewMessage} />
        </div>
      </div>
    </>
  );
}
