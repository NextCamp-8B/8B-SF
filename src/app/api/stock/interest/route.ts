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
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const size = parseInt(url.searchParams.get('size') || '10', 10);
  const offset = (page - 1) * size;
  console.log(userId, page, size, offset);
  const { data, statusText, error } = await supabase
    .from('interest_stock')
    .select('stock (*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(offset, offset + size - 1);

  const response = statusText === 'OK' ? data : error;

  return NextResponse.json(response);
}
