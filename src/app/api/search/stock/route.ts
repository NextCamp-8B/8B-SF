import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const url = new URL(request.url);
  const searchText =
    url.searchParams.get('searchText')?.toLowerCase() || '';
  const userId = url.searchParams.get('userId');

  const { data: stocks, error: stockError } = await supabase
    .from('stock')
    .select('*')
    .or(
      `stock_name.ilike.%${searchText}%,stock_code.ilike.%${searchText}%, description_ko.ilike.%${searchText}%`,
    );

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

    const stocksWithInterestFlag = stocks.map((stock) => {
      return {
        ...stock,
        isInterest: interestStockIds.includes(stock.stock_id),
      };
    });

    return stocksWithInterestFlag;
  };
  const interestFlag = await checkInterest();
  const response = interestFlag ? interestFlag : stocks;

  return NextResponse.json(response);
}
