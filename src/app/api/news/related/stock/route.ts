import { createClient } from '@/utils/supabase/server';
import { NextRequest } from 'next/server';

export async function GET(requset: NextRequest) {
  const searchParams = requset.nextUrl.searchParams;
  const userId = searchParams.get('user');
  const supabase = createClient();
  const { data: newsList, error } = await supabase.rpc(
    'get_favorite_news',
    {
      p_user_id: userId,
    },
  );

  return Response.json({
    newsList: newsList,
  });
}
