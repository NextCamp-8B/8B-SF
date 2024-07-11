import AightnowClient from './aightnowClient';
import HttpClient from './httpClient';

const businessClient = new HttpClient(`${process.env.NEXTAUTH_URL}`);
const lLMlient = new HttpClient(`${process.env.NEXTAUTH_URL}`);

const businessAPI = new AightnowClient(businessClient);
const lLMAPI = new AightnowClient(lLMlient);

export { businessAPI, lLMAPI };
