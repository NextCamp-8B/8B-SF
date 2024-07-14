import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = createClient();
  const { stockId, userId } = await req.json();

  const { data, error, status, statusText } = await supabase
    .from('interest_stock')
    .select('*')
    .eq('user_id', userId)
    .eq('stock_id', stockId)
    .single();

  const isExist =
    status === 200 &&
    statusText === 'OK' &&
    data !== null &&
    error === null;
  const addInterest = () => {
    return supabase
      .from('interest_stock')
      .insert([{ user_id: userId, stock_id: stockId }])
      .select(`stock (*)`)
      .single();
  };
  const response = isExist ? data : await addInterest();

  return NextResponse.json(response);
}
