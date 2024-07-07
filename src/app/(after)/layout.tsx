import ChatbotMain from '@/components/chatbot/ChatbotMain';
import HeadersNav from '@/components/headers/HeadersNav';
export default function AfterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`min-w-full min-h-dvh bg-background-100 pt-32 pb-20 px-14 text-grayscale-900 flex justify-center`}
    >
      <HeadersNav />
      {children}
      <div className="fixed bottom-10 right-16 ">
        <ChatbotMain />
      </div>
    </div>
  );
}
