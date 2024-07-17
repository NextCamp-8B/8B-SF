import { GenerationRequest } from './serviceType';
import HttpClient from './httpClient';
import { UUID } from 'crypto';

export default class AightnowClient {
  constructor(private httpClient: HttpClient) {
    this.loginLLM = this.loginLLM.bind(this);
    this.generatePrompt = this.generatePrompt.bind(this);
    this.updateRecentSearch = this.updateRecentSearch.bind(this);
    this.deleteRecentSearch = this.deleteRecentSearch.bind(this);
    this.getRecentSearch = this.getRecentSearch.bind(this);
    this.getRecentHome = this.getRecentHome.bind(this);
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

  async deleteRecentSearch({
    type = 'all',
    userId,
    stockId,
  }: {
    type?: string;
    userId: UUID;
    stockId?: UUID | undefined;
  }) {
    const isSelected = type === 'select';
    const selectedQ = isSelected ? `&stockId=${stockId}` : '';
    const nextURL =
      `/api/search/recent?type=${type}&userId=${userId}`.concat(
        '',
        selectedQ,
      );

    return this.httpClient.delete({
      url: nextURL,
    });
  }

  async getRecentSearch({ userId }: { userId: UUID }) {
    const nextURL = `/api/search/recent?userId=${userId}`;

    return this.httpClient.get({ url: nextURL });
  }

  async getRecentHome({ userId }: { userId: UUID }) {
    const nextURL = `/api/home/recent?userId=${userId}`;

    return this.httpClient.get({ url: nextURL });
  }

  // News
  // 오늘 인기있는 뉴스
  async getTodayPopularNews() {
    const nextURL = `/api/news/popular`;
    return this.httpClient.get({ url: nextURL, isServer: true });
  }
  // 관심종목과 관련된 뉴스
  async getRelatedNewsToStock({ userId }: { userId: UUID }) {
    const nextURL = `/api/news/related/stock?user=${userId}`;

    return this.httpClient.get({ url: nextURL, isServer: true });
  }
  // 최신 뉴스 불러오기
  async getRecentNews({
    page,
    limit,
    isServer,
  }: {
    page?: number;
    limit?: number;
    isServer: boolean;
  }) {
    const nextURL = `/api/news?page=${page}&limit=${limit}`;
    return this.httpClient.get({ url: nextURL, isServer });
  }
  // 뉴스 상세 불러오기
  async getNewsDetail({ newsId }: { newsId: string }) {
    const nextURL = `/api/news/${newsId}`;

    return this.httpClient.get({ url: nextURL });
  }
  // 현재 뉴스와 관련된 주식 불러오기
  async getRelatedStock({ newsId }: { newsId: string }) {
    const nextURL = `/api/news/related/stock/${newsId}`;

    return this.httpClient.get({ url: nextURL, isServer: true });
  }

  // 현재 뉴스와 관련된 뉴스 불러오기
  async getRelatedNews({ newsId }: { newsId: string }) {
    const nextURL = `/api/news/related/news/${newsId}`;

    return this.httpClient.get({ url: nextURL, isServer: true });
  }

  // 뉴스 조회수 갱신
  async updateNewsView({ newsId }: { newsId: string }) {
    const nextURL = `/api/news/${newsId}`;

    return this.httpClient.patch({ url: nextURL });
  }

  // 관심종목과 관련된 뉴스 불러오기
  async getRelatedNewsToInterestStock({ userId }: { userId: UUID }) {
    const nextURL = `/api/news/related/stock?user=${userId}`;
    return this.httpClient.get({ url: nextURL, isServer: true });
  }

  // 주요뉴스 불러오기
  async getImportantNews() {
    const nextURL = `/api/news/important`;
    return this.httpClient.get({ url: nextURL, isServer: true });
  }
}
