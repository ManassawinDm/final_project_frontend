// import axios from "axios";
// import { getSession, signOut } from "next-auth/react";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BASE_URL,
//   withCredentials: true,
// });

// api.interceptors.request.use(
//   async (config) => {
//     const session = await getSession();

//     if (session?.accessToken) {
//       config.headers.Authorization = `Bearer ${session.accessToken}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       try {
//         const session = await getSession();
//         if (session) {
//           const res = await axios.post(
//             `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
//             {
//               refreshToken: session.refreshToken,
//             }
//           );
//           if (res.data.accessTokens) {
//             session.accessToken = res.data.accessTokens; 

//             // อัปเดต access token ใน headers ของ error.config ก่อนทำการเรียกใหม่
//             error.config.headers.Authorization = `Bearer ${session.accessToken}`; 

//             // ลองส่งคำขอใหม่โดยใช้ config ที่ได้รับการอัปเดต
//             return axios(error.config);
//           } else {
//             throw new Error('No access token received');
//           }
//         } else {
//           throw new Error('No session found');
//         }
//       } catch (err) {
//         console.error('Token refresh failed:', err); // บันทึกข้อมูลเพื่อดีบัก
//         signOut(); // หรือแสดงหน้าแจ้งเตือนว่า session หมดอายุ
//         return Promise.reject(err);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;


import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    
    // ตรวจสอบว่ามี error จากการรีเฟรชหรือไม่
    if (session?.error === "RefreshAccessTokenError") {
      // ถ้ามี error ให้ออกจากระบบ
      signOut({ callbackUrl: '/login' });
      return Promise.reject(new Error("Session expired"));
    }
    
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ไม่ต้องจัดการ 401 ใน response interceptor แล้ว
// เพราะ NextAuth จะจัดการรีเฟรช token ให้อัตโนมัติ
// เราเพียงแค่ตรวจสอบว่าถ้ายัง 401 หลังจากพยายามรีเฟรชแล้ว ให้ออกจากระบบ
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // ลองโหลด session ใหม่อีกครั้ง
      const session = await getSession();
      if (session?.error === "RefreshAccessTokenError") {
        signOut({ callbackUrl: '/login' });
      }
    }
    return Promise.reject(error);
  }
);

export default api;
