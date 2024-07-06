import { handlers } from '@/auth';
// import { type NextRequest, NextResponse } from "next/server";
export const { GET, POST } = handlers;

// import { auth, GET as AuthGET, POST as AuthPOST } from "@/auth";

// const originalFetch = fetch;

// const naverFetchInterceptor = (fetch: typeof originalFetch) => async (...args: any[]) => {
//   const [resource, config] = args;
//   const url = new URL(resource);

//   if (url.hostname === 'nid.naver.com' && url.pathname.includes('/oauth2.0/token')) {
//     const body = new URLSearchParams(config.body);
//     body.set('expires_in', Math.max(parseInt(body.get('expires_in') || '0'), 1).toString());
//     config.body = body.toString();
//   }

//   return fetch(resource, config);
// };

// export async function POST(req: NextRequest) {
//   return await AuthPOST(req);
// }

// export async function GET(req: NextRequest) {
//   const url = new URL(req.url);

//   if (url.pathname === "/api/auth/callback/naver") {
//     const session = await auth();
//     if (!session?.user) {
//       const signInUrl = new URL("/login", req.url);
//       return NextResponse.redirect(signInUrl);
//     }

//     global.fetch = naverFetchInterceptor(originalFetch);
//     const response = await AuthGET(req);
//     global.fetch = originalFetch;
//     return response;
//   }

//   return await AuthGET(req);
// }
