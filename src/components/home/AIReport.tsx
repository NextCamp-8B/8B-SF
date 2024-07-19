import { getTranslations } from 'next-intl/server';
import ReportWrapper from './ReportWrapper';
import { Stock } from '@/types/stock';
import Badge from '../shared/Badge';
export default async function AIReport({
  name,
  stocks,
}: {
  name: string | null;
  stocks: Array<Stock>;
}) {
  const t = await getTranslations('Home');

  return (
    <div className="flex flex-col w-full max-w-[1200px] mt-4">
      <div className="flex gap-4">
        <h2 className="h4 font-bold text-primary-900 mb-6">
          {t('ai_report', { nickname: name })}
        </h2>
        <Badge type="primary" direction="left" />
      </div>
      <ReportWrapper stocks={stocks} />
    </div>
  );
}
