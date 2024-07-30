import { OmittedHTTPMethod, RequestOptions } from './serviceType';

export default class HttpClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async makeRequest<BodyType>(
    config: RequestOptions<BodyType>,
  ): Promise<any> {
    const { url, method, headers, body, isServer, next } = config;
    /** 내부 API 요청인지 확인 */
    // const isInternalApi = url.startsWith('api/');

    const requestUrl = isServer ? `${this.baseURL}${url}` : url;
    const options: RequestInit = {
      next,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    try {
      const response = await fetch(requestUrl, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error with ${method} request to ${url}:`, error);
      throw error;
    }
  }

  async get({
    url,
    headers = {},
    isServer = false,
    next,
  }: Pick<
    OmittedHTTPMethod,
    'url' | 'headers' | 'isServer' | 'next'
  >): Promise<any> {
    return this.makeRequest({
      url,
      method: 'GET',
      headers,
      isServer,
      next,
    });
  }

  async post({
    url,
    body,
    headers = {},
    isServer = false,
  }: OmittedHTTPMethod): Promise<any> {
    return this.makeRequest({
      url,
      method: 'POST',
      headers,
      body,
      isServer,
    });
  }

  async put({
    url,
    body,
    headers = {},
    isServer = false,
  }: OmittedHTTPMethod): Promise<any> {
    return this.makeRequest({
      url,
      method: 'PUT',
      headers,
      body,
      isServer,
    });
  }

  async patch({
    url,
    body,
    headers = {},
    isServer = false,
  }: OmittedHTTPMethod): Promise<any> {
    return this.makeRequest({
      url,
      method: 'PATCH',
      headers,
      body,
      isServer,
    });
  }

  async delete({
    url,
    headers = {},
    isServer = false,
  }: Omit<OmittedHTTPMethod, 'body'>): Promise<any> {
    return this.makeRequest({
      url,
      method: 'DELETE',
      headers,
      isServer,
    });
  }
}
