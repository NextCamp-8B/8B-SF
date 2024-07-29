import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { FormEvent, useState } from 'react';

export default function ChatbotInput({
  onNewMessage,
}: {
  onNewMessage: () => void;
}) {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const t = useTranslations('Chatbot');

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      return;
    }
    const userId = session?.user.id;
    setIsLoading(true);
    setMessage('');
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, message }),
    });

    if (response.ok) {
      onNewMessage();
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="border-t-2 border-t-grayscale-200">
        <form action="" onSubmit={submitHandler} className="p-4">
          <div className="flex gap-4">
            <input
              type="text"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isLoading}
              className="w-[377px] h-14 border-grayscale-100 border-2 rounded-lg pl-4"
            />
            <button
              type="submit"
              className="w-16 h-14 rounded-lg bg-primary-900"
              disabled={isLoading}
            >
              <span className="text-[#FFFFFF]">{t('send')}</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
