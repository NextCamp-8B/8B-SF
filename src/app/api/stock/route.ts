import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

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

export async function PUT(request: NextRequest) {
  const supabase = createClient();

  try {
    const {
      stockId,
      fluctuationsRatio,
      compareToPreviousClosePrice,
      closePrice,
    } = await request.json();
    if (
      !stockId ||
      fluctuationsRatio === undefined ||
      compareToPreviousClosePrice === undefined ||
      closePrice === undefined
    ) {
      return new NextResponse('필수 데이터가 부족합니다.', {
        status: 400,
      });
    }

    const { data, error } = await supabase
      .from('stock')
      .update({
        fluctuations_ratio: fluctuationsRatio,
        compare_to_previous_close_price: compareToPreviousClosePrice,
        price: closePrice,
      })
      .eq('stock_id', stockId)
      .select();

    if (error) {
      console.error('Supabase 오류:', error);
      return new NextResponse('데이터 업데이트에 실패했습니다.', {
        status: 500,
      });
    }

    return NextResponse.json({
      message: '데이터가 성공적으로 업데이트되었습니다.',
      updatedData: data,
    });
  } catch (error) {
    console.error('서버 오류:', error);
    return new NextResponse('서버에서 오류가 발생했습니다.', {
      status: 500,
    });
  }
}
