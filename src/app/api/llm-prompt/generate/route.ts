import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { userMessage, temperature, topP } = await req.json();
  const authorizationHeader = req.headers.get('authorization');
  const authorization = authorizationHeader?.startsWith('Bearer ')
    ? authorizationHeader
    : `Bearer ${authorizationHeader}`;

  const generateURL = `${process.env.LLAMA_API_URL}generate`;
  const generateBody = {
    user_message: userMessage,
    temperature: temperature,
    top_p: topP,
  };
  const generateResponse = await fetch(generateURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization,
    },
    body: JSON.stringify(generateBody),
  });

  if (!generateResponse.ok) {
    const errorData = await generateResponse.json();
    return NextResponse.json(
      { error: 'Generation failed', details: errorData },
      { status: generateResponse.status },
    );
  }

  const reader = generateResponse.body!.getReader();
  const decoder = new TextDecoder('utf-8');
  const answer = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    answer.push(decoder.decode(value, { stream: true }));
  }

  answer.push(decoder.decode());

  return NextResponse.json(answer.join(''));
}
