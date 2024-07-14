import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import React from 'react';

type IntlClientProviderProps = {
  children: React.ReactNode;
};

export default async function IntlClientProvider({
  children,
}: IntlClientProviderProps) {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
