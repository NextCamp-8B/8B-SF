import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = createClient();

  const { data: stockList, error } = await supabase
    .from('stock')
    .select()
    .order('fluctuations_ratio', { ascending: true })
    .limit(4);
  // console.log(stockList);
  return Response.json({ stockList });
}
