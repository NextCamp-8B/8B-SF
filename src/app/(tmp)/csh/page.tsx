'use client';
import { lLMAPI } from '@/service/apiInstance';
import { useState } from 'react';

const message = `As a stock analyst, you are an agent who gives
    stock-related information on behalf of customers when they want
     to obtain information such as stock-related information, current 
     status, or statistics. If there are any stock-related terms 
     to answer a question, you should put the term description below the answ
     \n\nquestion: 너가 생각하기에 하이닉스의 재무재표 분석하고, 투자하기 좋아보이는지 
     판단하고 상, 중, 하 중에 하나로 대답해줘.`;

/** 의도한 console 입니다. */
export default function page() {
  const [state, setState] = useState();
  /** 서버 api 테스트 */
  // const serverTest = await lLMAPI.loginLLM({ isServer: true });
  // console.log(serverTest);

  /** 클라이언트 api 테스트 */
  const loginLLMTest = async () => {
    await lLMAPI.loginLLM();
  };

  const req = {
    userMessage: message,
    temperature: 0,
    topP: 0,
  };
  const generateTest = async () => {
    const m = await lLMAPI.generatePrompt({
      req,
    });
    setState(m);
  };

  return (
    <div>
      <button onClick={generateTest}>Generate</button>
      <p>{state}</p>
    </div>
  );
}
