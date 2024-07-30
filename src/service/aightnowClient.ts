import { GenerationRequest } from './serviceType';
import HttpClient from './httpClient';
import { UUID } from 'crypto';
import { isMarketOpen } from '@/utils/isMarketOpen';

export default class AightnowClient {
  constructor(private httpClient: HttpClient) {
    this.loginLLM = this.loginLLM.bind(this);
    this.generatePrompt = this.generatePrompt.bind(this);
    this.updateRecentSearch = this.updateRecentSearch.bind(this);
    this.deleteRecentSearch = this.deleteRecentSearch.bind(this);
    this.getRecentSearch = this.getRecentSearch.bind(this);
    this.getRecentHome = this.getRecentHome.bind(this);
    this.addInterestStock = this.addInterestStock.bind(this);
    this.getInterestStock = this.getInterestStock.bind(this);
    this.getPopularStock = this.getPopularStock.bind(this);
    this.searchStock = this.searchStock.bind(this);
    this.deleteInterestStock = this.deleteInterestStock.bind(this);
    this.getStockDetail = this.getStockDetail.bind(this);
    this.getNaverpay = this.getNaverpay.bind(this);
    this.updateStock = this.updateStock.bind(this);
    this.getPayDuration = this.getPayDuration.bind(this);
    this.generateAIReport = this.generateAIReport.bind(this);
    this.getChartData = this.getChartData.bind(this);
    this.updateViewCount = this.updateViewCount.bind(this);
    this.updateRecentView = this.updateRecentView.bind(this);
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

  async addInterestStock({
    userId,
    stockId,
  }: {
    userId: UUID;
    stockId: UUID;
  }) {
    const nextURL = `/api/stock/interest`;

    return this.httpClient.post({
      url: nextURL,
      body: {
        userId,
        stockId,
      },
    });
  }

  async deleteInterestStock({
    userId,
    stockId,
  }: {
    userId: UUID;
    stockId: UUID;
  }) {
    const nextURL = `/api/stock/interest?userId=${userId}&stockId=${stockId}`;

    return this.httpClient.delete({
      url: nextURL,
    });
  }

  async getInterestStock({
    userId,
    page,
    size,
    isServer = false,
    next,
  }: {
    userId: UUID;
    page: string | number;
    size: string | number;
    isServer?: boolean;
    next?: any;
  }) {
    const nextURL = `/api/stock/interest?userId=${userId}&page=${page}&size=${size}`;

    return this.httpClient.get({ url: nextURL, isServer, next });
  }

  async getPopularStock() {
    const nextURL = `/api/search/popular`;

    return this.httpClient.get({ url: nextURL });
  }

  async searchStock({
    searchText = '',
    userId,
  }: {
    searchText?: string;
    userId?: UUID;
  }) {
    const nextURL = `/api/search/stock?searchText=${searchText}&userId=${
      userId || ''
    }`;

    return this.httpClient.get({ url: nextURL });
  }

  async updateViewCount({ stockId }: { stockId: UUID }) {
    const nextURL = `/api/search/popular`;

    this.httpClient.post({ url: nextURL, body: { stockId } });
  }

  async getExchangeRate() {
    const nextURL = `/api/stock/exchange`;
    return this.httpClient.get({ url: nextURL });
  }

  async getStockDetail({
    stockId,
    userId,
  }: {
    stockId: UUID;
    userId: UUID;
  }) {
    const nextURL = `/api/stock/detail?userId=${userId}&stockId=${stockId}`;

    return this.httpClient.get({ url: nextURL });
  }

  async getNaverpay({ companies }: { companies: string }) {
    const nextURL = `/api/stock/naverpay?companies=${companies}`;

    return this.httpClient.get({ url: nextURL });
  }

  async updateStock({
    stockId,
    fluctuationsRatio,
    compareToPreviousClosePrice,
    closePrice,
  }: {
    stockId: UUID;
    fluctuationsRatio: string;
    compareToPreviousClosePrice: string;
    closePrice: string;
  }) {
    const nextURL = '/api/stock';
    const body = {
      stockId,
      fluctuationsRatio,
      compareToPreviousClosePrice,
      closePrice,
    };

    return this.httpClient.put({ url: nextURL, body });
  }

  async getPayDuration({
    companies,
    amount,
    unit,
    name,
  }: {
    companies: string;
    amount: string | number;
    unit: string;
    name: string;
  }) {
    const nextURL = `/api/stock/naverpay/duration?companies=${companies}&amount=${amount}&unit=${unit}&name=${name}`;

    return this.httpClient.get({ url: nextURL });
  }

  async generateAIReport({
    userId,
    stockSymbol,
  }: {
    userId: UUID;
    stockSymbol: string;
  }) {
    if (!isMarketOpen()) {
      return;
    }

    const nextURL = `/api/stock/ai-report`;

    return this.httpClient.post({
      url: nextURL,
      body: { userId, stockSymbol },
    });
  }

  async getChartData({ stockId }: { stockId: UUID }) {
    const nextURL = `/api/stock/ai-report?stockId=${stockId}`;

    return this.httpClient.get({
      url: nextURL,
    });
  }

  async updateRecentView({ stockId }: { stockId: UUID }) {
    const nextURL = `/api/home/recent`;

    this.httpClient.post({ url: nextURL, body: { stockId } });
  }
}
