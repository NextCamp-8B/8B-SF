import { Locale } from '@/types/next-auth';

interface HTTPParamType<BodyType = any> {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: BodyType;
  isServer?: boolean;
  next?: any;
}

export interface RequestOptions<BodyType = any>
  extends HTTPParamType<BodyType> {}

export type OmittedHTTPMethod = Omit<HTTPParamType, 'method'>;
export type OmittedHTTPURL = Omit<HTTPParamType, 'url'>;

export interface GenerationRequest {
  userMessage: string;
  temperature: number;
  topP: number;
}

export interface UserData {
  id: string;
  userId: string;
  email: string;
  name: string;
  role: string;
  nickname: string;
  profileImg: string;
  profileImgName: string;
  birth: string;
  phoneNumber: string;
  interestStock: string;
  provider: string;
  language: string;
  accessToken: string;
  refreshToken: string;
}

export type StockWithInterest = Stock & {
  isInterest: boolean;
};
