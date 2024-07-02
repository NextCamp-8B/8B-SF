import { createClient } from '@/utils/supabase/server';
import { NextRequest } from 'next/server';

export async function GET(requset: NextRequest) {
  const searchParams = requset.nextUrl.searchParams;
  const page = Number(searchParams.get('page'));
  const limit = searchParams.get('limit')
    ? Number(searchParams.get('limit'))
    : 20;
  const supabase = createClient();
  const { data: news, error } = await supabase
    .from('news')
    .select()
    .order('published_at', { ascending: false })
    .range(page * limit, page * limit + limit - 1);
  // .limit(Number(limit));

  const { count } = await supabase
    .from('news')
    .select('*', { count: 'exact', head: true });
  // const { data } = await supabase.from('news').select('count(*)');
  // console.log(count);
  return Response.json({
    newsList: news,
    lastPage: Number(Math.ceil(count! / limit)),
  });
}
