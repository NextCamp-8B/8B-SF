import { createClient } from '@/utils/supabase/server';

// view 내림차순으로 데이터 GET
export async function GET(request: Request) {
  const supabase = createClient();
  const { data: stocks, error } = await supabase
    .from('stock')
    .select('stock_id, stock_name, stock_code')
    .order('view', { ascending: false });

  return new Response(JSON.stringify({ stocks: stocks }), {
    status: 200,
  });
}

// 클릭시 stock의 view 증가
export async function POST(request: Request) {
  const supabase = createClient();
  const { stock_id } = await request.json();

  const { data: stock, error: fetchError } = await supabase
    .from('stock')
    .select('view')
    .eq('stock_id', stock_id)
    .single();

  const newView = stock && stock.view + 1;

  if (stock) {
    const { data, error: updateError } = await supabase
      .from('stock')
      .update({ view: newView })
      .eq('stock_id', stock_id)
      .single();
  }

  // console.log(newView);
  return new Response(JSON.stringify({ stock: stock }), {
    status: 200,
  });
}
