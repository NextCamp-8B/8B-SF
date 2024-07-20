import { getTranslations } from 'next-intl/server';
import ReportWrapper from './ReportWrapper';
import { Stock } from '@/types/stock';
import Badge from '../shared/Badge';
import IntlClientProvider from '../shared/IntlClientProvider';
export default async function AIReport({
  nickname,
  stocks,
  isEn = false,
}: {
  nickname: string | null;
  stocks: Array<Stock>;
  isEn?: boolean;
}) {
  const t = await getTranslations('Home');

  return (
    <div className="flex flex-col w-full max-w-[1200px] mt-4 mb-[-16px]">
      <div className="flex gap-4">
        <h2 className="h4 font-bold text-primary-900 mb-6">
          {t('ai_report', { nickname })}
        </h2>
        <Badge type="primary" direction="left" />
      </div>
      <IntlClientProvider>
        <ReportWrapper stocks={stocks} isEn={isEn} />
      </IntlClientProvider>
    </div>
  );
}
