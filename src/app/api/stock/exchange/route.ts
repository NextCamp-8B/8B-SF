import supabase from '@/lib/supabaseClient';

export async function GET() {
  try {
    const response = await fetch(
      `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=${process.env.NEXT_PUBLIC_KOREA_EXIM_API_KEY}&data=AP01`,
    );

    const data: ExchangeData[] = await response.json();

    data.forEach((d) => {
      const rate = Number(d.deal_bas_r.replaceAll(',', ''));
      if (d.cur_unit === 'USD') {
        supabase
          .from('exchange-rate')
          .update({ exchange_rate: rate })
          .eq('locale', 'en');
      } else if (d.cur_unit === 'KRW') {
        supabase
          .from('exchange-rate')
          .update({ exchange_rate: rate })
          .eq('locale', 'ko');
      } else if (d.cur_unit === 'JPY(100)') {
        supabase
          .from('exchange-rate')
          .update({ exchange_rate: rate })
          .eq('locale', 'ja');
      } else if (d.cur_unit === 'EUR') {
        supabase
          .from('exchange-rate')
          .update({ exchange_rate: rate })
          .eq('locale', 'fr');
      } else if (d.cur_unit === 'CNH') {
        supabase
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
