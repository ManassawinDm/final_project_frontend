import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";

interface JwtAccessTokenPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}


async function RequestRefreshAccessToken(token: JWT) {

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`, {
      refreshToken: token.refreshToken,
    });

    if (!response.data.accessTokens) {
      throw new Error("Failed to refresh access token");
    }

    return {
      ...token,
      accessToken: response.data.accessTokens,
      accessTokenExpires: Date.now() + 15 * 60 * 1000, // 15 นาที
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "user@example.com" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // เรียก API Login ของ Backend
          const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
            email: credentials?.email,
            password: credentials?.password,
          });
      
          if (res.data) {
            const decodedAccessToken = jwtDecode<JwtAccessTokenPayload>(res.data.accessTokens);
            // ส่งข้อมูลที่ได้จากการ decode ไปยัง `user`
            return {
              id: decodedAccessToken.userId,
              email: decodedAccessToken.email,
              role: decodedAccessToken.role,
              accessToken: res.data.accessTokens,
              refreshToken: res.data.refreshTokens,
            };
          }
          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          id: user.id,
          email: user.email,
          role: user.role,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + 15 * 60 * 1000,
        };
      }
  
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      return RequestRefreshAccessToken(token)
  
      // return token;
    },
    async session({ session, token }) {
      session.user = session.user ?? {};
      session.user.id = token.id ?? "";
      session.user.email = token.email ?? "";
      session.user.role = token.role ?? "";
      session.accessToken = token.accessToken ?? "";
      session.refreshToken = token.refreshToken ?? "";
      session.error = token.error;
      // session.accessTokenExpires = token.accessTokenExpires ?? Date.now() + 15 * 60 * 1000;
      return session;
      
    }

  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


