import { TMPProps } from './ChatbotItem';
import SMALLLOGO from '@/assets/logos/small_logo_light.svg';
export default function ChatbotContent({
  chatting,
}: {
  chatting: TMPProps[];
}) {
  return (
    <>
      <div className="flex flex-col w-[448px] h-[396px] overflow-x-auto px-4 no-scrollbar">
        {chatting &&
          chatting.map((chat: TMPProps, idx: number) => {
            if (chat.role === 'bot') {
              return (
                <div
                  key={idx}
                  className="flex items-start space-x-2 w-4/5 break-words p-6"
                >
                  <div className="flex justify-center items-center bg-primary-900 min-w-[48px] max-w-[48px] min-h-[48px] rounded-md">
                    <SMALLLOGO width={28} height={24} />
                  </div>
                  <div className="b5 bg-primary-50 rounded-md p-2">
                    {chat.text}
                  </div>
                </div>
              );
            }
            if (chat.role === 'user') {
              return (
                <div
                  key={idx}
                  className=" flex flex-col b5 w-fit ml-auto space-x-2 break-words bg-grayscale-100 p-2"
                >
                  {chat.text}
                </div>
              );
            }
          })}
      </div>
    </>
  );
}
