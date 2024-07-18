import ChatbotMain from '@/components/chatbot/ChatbotMain';
import HeadersNav from '@/components/headers/HeadersNav';
import { auth as getSession } from '@/auth';
import { redirect } from 'next/navigation';

import { SessionContext } from '@/components/shared/SessionContext';
export default async function AfterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  // 세션이 없거나 세션 만료 시간이 현재 시간보다 이전인 경우 리다이렉트
  if (
    !session ||
    (session.expires && new Date(session.expires) <= new Date())
  ) {
    return redirect('/login/error?error=SessionExpired');
  }

  return (
    <div
      className={`min-w-full w-fit  min-h-dvh bg-background-100 pt-32 pb-20 px-14 text-grayscale-900 flex justify-center`}
    >
      <SessionContext>
        <HeadersNav />
        {children}
        <div className="fixed bottom-10 right-16 ">
          <ChatbotMain />
        </div>
      </SessionContext>
    </div>
  );
}
