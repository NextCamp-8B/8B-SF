import ChatbotContent from './ChatbotContent';
import ChatbotHeader from './ChatbotHeader';
import ChatbotInput from './ChatbotInput';

export default function ChatbotChat({
  closeHandler,
  chatting,
}: {
  closeHandler: () => void;
  chatting: string[] | null;
}) {
  return (
    <>
      <div>
        <div className="h-16">
          <ChatbotHeader closeHandler={closeHandler} />
        </div>
        <div className="w-full h-[488px] flex flex-col justify-center items-center ">
          <ChatbotContent chatting={chatting} />
        </div>
        <div className="h-[88px]">
          <ChatbotInput />
        </div>
      </div>
    </>
  );
}
