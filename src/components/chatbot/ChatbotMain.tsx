import IntlClientProvider from '../shared/IntlClientProvider';
import ChatbotItem from './ChatbotItem';

export default function ChatbotMain() {
  return (
    <>
      <IntlClientProvider>
        <ChatbotItem />
      </IntlClientProvider>
    </>
  );
}
