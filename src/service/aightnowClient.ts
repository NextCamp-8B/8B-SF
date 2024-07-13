import { GenerationRequest } from './serviceType';
import HttpClient from './httpClient';
import { UUID } from 'crypto';

export default class AightnowClient {
  constructor(private httpClient: HttpClient) {
    this.loginLLM = this.loginLLM.bind(this);
    this.generatePrompt = this.generatePrompt.bind(this);
    this.updateRecentSearch = this.updateRecentSearch.bind(this);
    this.deleteRecentSearch = this.deleteRecentSearch.bind(this);
  }

  async loginLLM({ isServer = false }: { isServer?: boolean } = {}) {
    const authURL = `api/llm-prompt/auth`;
    const { token_type: type, access_token: lLMAccessToken } =
      await this.httpClient.get({ url: authURL, isServer });

    /** 토큰 - 스토리지 임시 저장 */
    const llMBearerToken = `Bearer ${lLMAccessToken}`;
    // const llMBearerToken = `${type} ${lLMAccessToken}`;
    if (!isServer) {
      localStorage.setItem('llMBearerToken', llMBearerToken);
    }

    return llMBearerToken;
  }

  async generatePrompt({
    req,
    isServer = false,
  }: {
    req: GenerationRequest;
    isServer?: boolean;
  }) {
    const { userMessage, temperature, topP } = req;
    const authURL = `api/llm-prompt/generate`;
    /** 토큰 - 임시 사용 */
    const llMBearerToken = localStorage.getItem('llMBearerToken');

    const generateBody = {
      userMessage,
      temperature,
      topP,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${llMBearerToken}`,
    };

    return this.httpClient.post({
      url: authURL,
      headers,
      body: generateBody,
    });
  }

  async updateRecentSearch({
    userId,
    stockId,
  }: {
    userId: UUID;
    stockId: UUID;
  }) {
    const nextURL = `/api/search/recent`;

    return this.httpClient.post({
      url: nextURL,
      body: {
        userId,
        stockId,
      },
    });
  }
}
