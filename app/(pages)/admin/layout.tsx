// 'use client';

// import Sidebar from "@/components/Sidebar/page";
// import React, { useState } from "react";


// // import { useAuthContext } from '@/components/AuthProvider';
// // import { useRouter } from 'next/navigation';
// // import { useEffect } from 'react';

// const AdminLayout = ({ children }: { children: React.ReactNode }) => {
//     const [isCollapsed, setIsCollapsed] = useState(false);
//     const [isSettingsOpen, setIsSettingsOpen] = useState(false);

//     const handleToggleCollapse = () => {
//         setIsCollapsed(!isCollapsed); // เปลี่ยนสถานะการพับ Sidebar
//     };
//     const handleToggleSettings = () => {
//         setIsSettingsOpen(!isSettingsOpen); // เปลี่ยนสถานะการเปิด/ปิดเมนูย่อย "ตั้งค่า"
//     };

//     //   const { user, loading } = useAuthContext();
//     //   const router = useRouter();

//     //   useEffect(() => {
//     //     if (!loading) {
//     //       if (!user) {
//     //         router.push('/auth/login');  // ถ้าไม่ได้ Login → ไปหน้า Login
//     //       } else if (user.role !== 'admin') {
//     //         router.push('/users/profile'); // ❌ ไม่ใช่ Admin → ไปหน้า User
//     //       }
//     //     }
//     //   }, [loading, user]);

//     //   if (loading) return <p>Loading...</p>;

//     return (
//         <div className="flex">
//             <Sidebar
//                 isCollapsed={isCollapsed}
//                 isSettingsOpen={isSettingsOpen}
//                 onToggleCollapse={handleToggleCollapse}
//                 onToggleSettings={handleToggleSettings}

//             />
//             <main className="flex-grow">{children}</main>
//         </div>
//     );
// };

// export default AdminLayout;






'use client';

import Sidebar from "@/components/Sidebar/page";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DefaultSession, Session } from "next-auth";
import Loading from "@/app/loading";

//  interface NewSession extends Session {
//   user?: {
//     role?: string;
//   } & DefaultSession["user"];
// }

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    // const { data: session, status } = useSession() as { data: NewSession | null, status: "authenticated" | "loading" | "unauthenticated" };
    // const router = useRouter();

    const handleToggleCollapse = () => {
        setIsCollapsed(!isCollapsed); // เปลี่ยนสถานะการพับ Sidebar
    };
    const handleToggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen); // เปลี่ยนสถานะการเปิด/ปิดเมนูย่อย "ตั้งค่า"
    };

    // useEffect(() => {
    //     if (status === "authenticated" && session?.user?.role !== "admin") {
    //       router.push("/users/request");
    //     }
    //   }, [session, status, router]);


    // if (status === "loading") return <Loading />;
    
    return (
        <div className="flex">
            <Sidebar
                isCollapsed={isCollapsed}
                isSettingsOpen={isSettingsOpen}
                onToggleCollapse={handleToggleCollapse}
                onToggleSettings={handleToggleSettings}

            />
            <main className="flex-grow">{children}</main>
        </div>
    );
};

export default AdminLayout;

