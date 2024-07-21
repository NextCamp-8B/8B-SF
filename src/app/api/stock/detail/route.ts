import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const url = new URL(request.url);
  const stockId = url.searchParams.get('stockId');
  const userId = url.searchParams.get('userId');
  const { data: stock, error: stockError } = await supabase
    .from('stock')
    .select('*')
    .eq('stock_id', stockId);

  if (stockError) {
    throw new Error(stockError.message);
  }

  const checkInterest = async () => {
    if (!userId) return;

    const { data: interestStocks, error: interestError } =
      await supabase
        .from('interest_stock')
        .select('stock_id')
        .eq('user_id', userId);

    if (interestError) {
      throw new Error(interestError.message);
    }

    const interestStockIds = interestStocks.map(
      (stock) => stock.stock_id,
    );

    const stocksWithInterestFlag = stock.map((stock) => {
      return {
        ...stock,
        isInterest: interestStockIds.includes(stock.stock_id),
      };
    });

    return stocksWithInterestFlag;
  };

  const interestFlag = await checkInterest();
  const response = interestFlag ? interestFlag : stock;

  return NextResponse.json(response);
}
