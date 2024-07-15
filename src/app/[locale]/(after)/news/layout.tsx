import { Metadata } from 'next';
import React from 'react';

type NewsLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'News',
  description: 'Provide news related to US stocks.',
};

export default function NewsLayout({ children }: NewsLayoutProps) {
  return <>{children}</>;
}
