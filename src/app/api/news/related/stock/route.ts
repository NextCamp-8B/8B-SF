import { createClient } from '@/utils/supabase/server';

export async function GET(requset: Request) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const supabase = createClient();
  const { data: newsList, error } = await supabase.rpc(
    'get_favorite_news',
    {
      p_news_id: 1,
    },
  );

  return Response.json({
    newsList: newsList,
  });
}
