import { processPay } from '@/utils/processPay';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const companies = url.searchParams.get('companies');
  const amount = url.searchParams.get('amount');
  const range = amount ? `&range=${amount}` : '';
  const periodType = url.searchParams.get('unit');
  const stockExchangeType = url.searchParams.get('name');
  const naverpayURL = `https://api.stock.naver.com/chart/foreign/item/${companies}?periodType=${periodType}${range}&stockExchangeType=${stockExchangeType}`;
  const payResponse = await fetch(naverpayURL);
  const payBody = await payResponse.json();

  const processed = processPay(payBody.priceInfos);

  return NextResponse.json({ processed, amount, periodType });
}
