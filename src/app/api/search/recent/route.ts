import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const supabase = createClient();
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');

  // 최근 조회한 stock_id 찾기
  const { data: stocks, error: stocksError } = await supabase
    .from('recent_search_stocks')
    .select('stock_id')
    .eq('id', userId)
    .order('created_at', { ascending: false });

  if (stocksError) {
    console.log('최근 조회 fetch 실패:', stocksError);
    return new Response(
      JSON.stringify({ error: '최근 조회 fetch 실패' }),
      {
        status: 500,
      },
    );
  }
  //
  const stockDetailsPromises = stocks.map(async (stock) => {
    const { data, error } = await supabase
      .from('stock')
      .select('stock_id, stock_name, stock_code')
      .eq('stock_id', stock.stock_id)
      .single();

    return data;
  });

  const stockDetails = await Promise.all(stockDetailsPromises);

  const validStockDetails = stockDetails.filter(
    (stock) => stock !== null,
  );

  return new Response(JSON.stringify({ stocks: validStockDetails }), {
    status: 200,
  });
}

// 최근 검색어 추가
export async function POST(request: Request) {
  const supabase = createClient();

  const { stockId, userId } = await request.json();

  const { data: existingData, error: selectError } = await supabase
    .from('recent_search_stocks')
    .select('*')
    .eq('id', userId)
    .eq('stock_id', stockId)
    .single();

  if (existingData !== null) {
    // 이미 조회한 것이라면 업데이트
    const { data: updateData, error: updateError } = await supabase
      .from('recent_search_stocks')
      .update({ created_at: new Date().toISOString() })
      .eq('id', userId)
      .eq('stock_id', stockId);

    return new Response(JSON.stringify({ updateData }), {
      status: 200,
    });
  }
  // 조회한 적 없는 데이터라면 추가
  else {
    const { data: insertData, error: insertError } = await supabase
      .from('recent_search_stocks')
      .insert([{ id: userId, stock_id: stockId }]);

    return new Response(JSON.stringify({ insertData }), {
      status: 200,
    });
  }
}

export async function DELETE(request: Request) {
  const supabase = createClient();
  const url = new URL(request.url);
  const type = url.searchParams.get('type');
  const userId = url.searchParams.get('userId');
  const stockId = url.searchParams.get('stockId');
  let result;

  if (type === 'all') {
    // userId가 일치하는 모든 데이터 삭제
    const { data, error } = await supabase
      .from('recent_search_stocks')
      .delete()
      .eq('id', userId);
    result = { data, error };
  } else if (type === 'select' && stockId) {
    // userId와 stockId가 일치하는 데이터 선택삭제
    const { data, error } = await supabase
      .from('recent_search_stocks')
      .delete()
      .eq('id', userId)
      .eq('stock_id', stockId);

    result = { data, error };
  } else {
    return new Response(
      JSON.stringify({ error: 'Invalid request' }),
      { status: 400 },
    );
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
}
