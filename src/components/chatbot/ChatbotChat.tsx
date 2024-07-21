import { useState, useEffect, useCallback } from 'react';
import ChatbotContent from './ChatbotContent';
import ChatbotHeader from './ChatbotHeader';
import ChatbotInput from './ChatbotInput';
import { useSession } from 'next-auth/react';

export default function ChatbotChat({
  closeHandler,
  chatting,
}: {
  closeHandler: () => void;
  chatting: string[] | null;
}) {
  const [chatLog, setChatLog] = useState<string[] | null>(chatting);
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchChatbot = useCallback(async () => {
    const user_id = session?.user.id;
    if (user_id) {
      const response = await fetch(`/api/chatbot?user_id=${user_id}`);
      if (response.ok) {
        const data = await response.json();
        setChatLog(data.chat);
      }
    }
  }, [session?.user.id]);

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
          <ChatbotContent chatting={chatLog} isLoading={isLoading} />
        </div>
        <div className="h-[88px]">
          <ChatbotInput onNewMessage={handleNewMessage} />
        </div>
      </div>
    </>
  );
}
