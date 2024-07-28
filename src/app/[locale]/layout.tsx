import '../globals.css';
import localFont from 'next/font/local';
import { getLocale, getTranslations } from 'next-intl/server';

const pretendard = localFont({
  src: '../../assets/fonts/subset-PretendardVariable-Regular.woff2',
  display: 'swap',
  variable: '--font-pretendard',
});

export async function generateMetadata() {
  const t = await getTranslations('Metadata');
  return {
    title: {
      template: `%s | ${t('app_name')}`,
      default: t('app_name'),
    },
    description: 'AI ANALYSIS REPORT PLATFORM',
  };
}

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={`${pretendard.variable}`}>
      <body className={`${pretendard.className}`}>
        {children}
        <div id="root-modal"></div>
      </body>
    </html>
  );
}
