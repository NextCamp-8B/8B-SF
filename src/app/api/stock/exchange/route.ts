import supabase from '@/lib/supabaseClient';
import dayjs from 'dayjs';

export async function GET() {
  try {
    const today = dayjs().format('YYYYMMDD');
    const response = await fetch(
      `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=${process.env.NEXT_PUBLIC_KOREA_EXIM_API_KEY}&searchdate=${today}&data=AP01`,
    );

    const data: ExchangeData[] = await response.json();
    data.forEach(async (d) => {
      const rate = Number(d.deal_bas_r.replaceAll(',', ''));
      if (d.cur_unit === 'USD') {
        await supabase
          .from('exchange-rate')
          .update({ exchange_rate: rate })
          .eq('locale', 'en');
      } else if (d.cur_unit === 'KRW') {
        await supabase
          .from('exchange-rate')
          .update({ exchange_rate: rate })
          .eq('locale', 'ko');
      } else if (d.cur_unit === 'JPY(100)') {
        await supabase
          .from('exchange-rate')
          .update({ exchange_rate: rate })
          .eq('locale', 'ja');
      } else if (d.cur_unit === 'EUR') {
        await supabase
          .from('exchange-rate')
          .update({ exchange_rate: rate })
          .eq('locale', 'fr');
      } else if (d.cur_unit === 'CNH') {
        await supabase
          .from('exchange-rate')
          .update({ exchange_rate: rate })
          .eq('locale', 'zh');
      }
    });
  } catch (error) {
    console.error('Exchange API Error', error);
  } finally {
    const { data: exchangeRate, error } = await supabase
      .from('exchange-rate')
      .select('locale, exchange_rate');
    return Response.json(exchangeRate);
  }
}

type ExchangeData = {
  result: number;
  cur_unit: string;
  ttb: string;
  tts: string;
  deal_bas_r: string;
  bkpr: string;
  yy_efee_r: string;
  ten_dd_efee_r: string;
  kftc_bkpr: string;
  kftc_deal_bas_r: string;
  cur_nm: string;
};

export const dynamic = 'force-dynamic';
