import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const companies = url.searchParams.get('companies');
  const naverpayURL = `https://polling.finance.naver.com/api/realtime/worldstock/stock/${
    companies || 'TSLA.O'
  } `;
  const payResponse = await fetch(naverpayURL);
  const payBody = await payResponse.json();

  return NextResponse.json(payBody);
}
