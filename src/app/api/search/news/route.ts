import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const stockIds = url.searchParams.getAll('stockId');

  const supabase = createClient();

  // Set을 사용하여 중복된 news_id를 제거하고 저장
  const newsIds = new Set<number>();

  // 각 stockId에 대해 related_stock_to_news 테이블을 쿼리
  for (const id of stockIds) {
    const { data, error } = await supabase
      .from('related_stock_to_news')
      .select('news_id')
      .eq('stock_id', id);

    // 각 news_id를 newsIds에 추가
    data && data.forEach((id) => newsIds.add(id.news_id));
  }
  // Set을 배열로 변환
  const newsIdArray = Array.from(newsIds);

  // news 테이블에서 newsIdArray에 있는 news_id와 일치하는 데이터를 가져오기
  let newsData = [];
  if (newsIdArray.length > 0) {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .in('news_id', newsIdArray);

    newsData = data || [];
  }
  // console.log(newsData);
  return new Response(JSON.stringify(newsData), {
    status: 200,
  });
}
