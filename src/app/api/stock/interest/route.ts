import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
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

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const userId = new URL(req.url).searchParams.get('userId');
  const { data, statusText, error } = await supabase
    .from(`interest_stock`)
    .select(`stock (*)`)
    .eq(`user_id`, userId)
    .order(`created_at`, { ascending: false });
  const response = statusText === 'OK' ? data : error;

  return NextResponse.json(response);
}
