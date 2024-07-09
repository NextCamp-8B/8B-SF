'use client';

import { SessionProvider } from 'next-auth/react';

type SessionContext = {
  children: React.ReactNode;
};

export const SessionContext = ({ children }: SessionContext) => {
  return <SessionProvider>{children}</SessionProvider>;
};
