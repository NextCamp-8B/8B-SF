import { createClient } from '@/utils/supabase/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get('page'));
  const limit = searchParams.get('limit')
    ? Number(searchParams.get('limit'))
    : 20;

  const supabase = createClient();

  const { data: stockList, error } = await supabase
    .from('stock')
    .select()
    .order('stock_name', { ascending: true })
    .range(page * limit, page * limit + limit - 1);

  const { count } = await supabase
    .from('stock')
    .select('*', { count: 'exact', head: true });
  // console.log(stockList);
  return Response.json({
    stockList,
    lastPage: Number(Math.ceil(count! / limit)),
  });
}
