import { createClient } from '@/utils/supabase/server';

export async function GET(
  requset: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  const supabase = createClient();
  const { data, error } = await supabase.rpc('get_related_stocks', {
    p_news_id: id,
  });

  // console.log('data', data);
  console.log(error);
  return Response.json({
    stockList: data,
  });
}
