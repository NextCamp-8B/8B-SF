import IntlClientProvider from '@/components/shared/IntlClientProvider';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('Metadata');

  return {
    title: t('interest'),
    description: 'Provide Interst Stocks.',
  };
}

export default async function InterestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <IntlClientProvider>{children}</IntlClientProvider>;
}
