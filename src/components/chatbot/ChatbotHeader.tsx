import Close from '@/assets/icons/close.svg';
import { MouseEventHandler } from 'react';

interface ChatbotHeaderProps {
  closeHandler: MouseEventHandler<HTMLDivElement>;
}

export default function ChatbotHeader({
  closeHandler,
}: ChatbotHeaderProps) {
  return (
    <div className="w-full flex items-center bg-primary-900 rounded-t-[40px] h-16 absolute top-0 ">
      <div className="b1 font-bold text-background-100 py-4 pl-8">
        나우챗봇
      </div>
      <div
        className="ml-auto mr-6 cursor-pointer"
        onClick={closeHandler}
      >
        <Close width={32} />
      </div>
    </div>
  );
}
