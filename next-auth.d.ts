// import { DefaultSession,DefaultUser } from "next-auth";
// import { JWT, DefaultJWT } from "next-auth/jwt";

// declare module "next-auth"{
//     interface Session {
//         user?: {
//             id?:string;
//             role?: string;
//             accessToken?: string;
//             refreshToken?: string;
//           } & DefaultSession["user"];
//     }

//     interface User extends DefaultUser{
//         role?: string;
//     }
// }

// declare module "next-auth/jwt"{
//     interface JWT extends DefaultJWT{
//         role?: string;
//     }
// }

import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
      user?: {
        id?: string;
        role?: string;
        accessToken?: string;
        refreshToken?: string;
      } & DefaultSession["user"];
      accessToken?: string;
      refreshToken?: string;
      accessTokenExpires?: number; // ✅ เพิ่ม Expiration Time ของ Access Token
      refreshTokenExpires?: number;
      error?: string;
    }
  
    interface User extends DefaultUser {
      id?: string;
      role?: string;
      accessToken?: string;
      refreshToken?: string;
      accessTokenExpires?: number; // ✅ เพิ่ม Expiration Time ใน User
      refreshTokenExpires?:number;
    }
  }
  
  declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id?: string;
        role?: string;
        accessToken?: string;
        refreshToken?: string;
        accessTokenExpires?: number;
        refreshTokenExpires?: number;
        error?: string;
      }
}
