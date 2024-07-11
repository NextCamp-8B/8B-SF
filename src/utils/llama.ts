export const getToken = async () => {
  const auth_url = `${process.env.LLAMA_API_URL}/auth/token`;
  const auth_body = {
    username: `${process.env.LLAMA_USER_NAME}`,
    password: `${process.env.LLAMA_PASSWORD}`,
  };

  const response = await fetch(auth_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(auth_body),
  });

  const auth_data = await response.json();

  return auth_data.access_token;
};

export const generateAnswer = async (
  user_message: string,
  temperature: number,
  top_p: number,
) => {
  const url = `${process.env.LLAMA_API_URL}/generate`;
  const token = await getToken();

  const format = `
<|begin_of_text|> system
<|start_header_id|> This is an AI chatbot that provides answers to stock-related questions. <|end_header_id|>
You must follow these instructions to generate your answer:
Give your answer in 4 lines or less.
Summarize information simply and clearly and present it in list form.
Write except the source and reliability of each answer.
Make sure your answers are clear and formatted for easy understanding.
If it is difficult to answer a question accurately, you send out a message saying 'I'm sorry. I didn’t understand the question.'
Only reply related to user_message.
Answer in Korean <|eot_id|>
For example:
"  question : '하하'
  answer : I'm sorry. I didn’t understand the question."

"  question : Tell me about Samsung stock
  answer :   
  - Stock Quote: Samsung's current stock price is $1.11, up/down by 1.11% today.
  - Company Analysis:
    1. Financial Position: Samsung has strong financials with a market cap of $1 trillion.
    2. Recent Performance: Samsung reported revenue of $X billion last quarter, a 1% increase from last year.
    3. Analyst Opinions: Most analysts recommend buying Samsung stock due to its consistent performance.
<|eot_id|>
<|start_header_id|>user <|end_header_id|>
${user_message} <|eot_id|>
<|start_header_id|> assistant <|end_header_id|>
  `;
  const generate_body = {
    user_message: format,
    temperature: temperature,
    top_p: top_p,
    // repetition_penalty: 0.7,
    // top_k: 5,
    // max_tokens: 20,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(generate_body),
    });

    if (response.status !== 200) {
      const errorText = await response.text();
      console.error(`Request Failed : ${errorText}`);
    }

    const reader = response.body!.getReader();
    const decoder = new TextDecoder('utf-8');
    let answer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      answer += decoder.decode(value, { stream: true });
    }

    answer += decoder.decode();

    return answer;
  } catch (error) {
    console.error('Internal Server Error', error);
  }
};
