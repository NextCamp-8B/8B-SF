import IntlClientProvider from '@/components/shared/IntlClientProvider';

export default async function InterestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <IntlClientProvider>{children}</IntlClientProvider>;
}
