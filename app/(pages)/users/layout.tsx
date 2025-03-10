// 'use client';
// // import { useAuthContext } from '@/components/AuthProvider';
// // import { useRouter } from 'next/navigation';
// // import { useEffect } from 'react';

// const UserLayout = ({ children }: { children: React.ReactNode }) => {
// //   const { user, loading } = useAuthContext();
// //   const router = useRouter();

// //   useEffect(() => {
// //     if (!loading) {
// //       if (!user) {
// //         router.push('/auth/login');  // ถ้าไม่ได้ Login → ไปหน้า Login
// //       } else if (user.role !== 'user') {
// //         router.push('/dashboard'); // ❌ ไม่ใช่ User → ไปหน้า Admin
// //       }
// //     }
// //   }, [loading, user]);

// //   if (loading) return <p>Loading...</p>;

//   return <main>{children}</main>;
// };

// export default UserLayout;


'use client';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DefaultSession, Session } from "next-auth";
import Loading from "@/app/loading";

//  interface NewSession extends Session {
//   user?: {
//     role?: string;
//   } & DefaultSession["user"];
// }

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  // const { data: session, status } = useSession() as { data: NewSession | null, status: "authenticated" | "loading" | "unauthenticated" };
  // const router = useRouter();

  // useEffect(() => {
  //   if (status === "authenticated" && session?.user?.role !== "user") {
  //     router.push("/admin/dashboard");
  //   }
  // }, [session, status, router]);

  // if (status === "loading") return <Loading />;

  return <main>{children}</main>;
};

export default UserLayout;

