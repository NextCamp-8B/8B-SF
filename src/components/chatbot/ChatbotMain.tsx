import ChatbotItem from './ChatbotItem';
import { TMP_CHATBOT } from '@/constants';

export default function ChatbotMain() {
  return (
    <>
      <ChatbotItem chatting={TMP_CHATBOT} />
    </>
  );
}
