import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const supabase = createClient();
  const url = new URL(request.url);
  const searchText =
    url.searchParams.get('searchText')?.toLowerCase() || '';

  const { data: stocks, error } = await supabase
    .from('stock')
    .select('*')
    .or(
      `stock_name.ilike.%${searchText}%,stock_code.ilike.%${searchText}%, description_ko.ilike.%${searchText}%`,
    );

  return new Response(JSON.stringify({ stocks: stocks }), {
    status: 200,
  });
}
