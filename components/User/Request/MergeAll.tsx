"use client";

import React, { useEffect, useState } from "react";
import CurrentInfo from "./CurrentInfo";
import PersonalInfo from "./PersonalInfo";
import RequestInfo from "./RequestInfo";
import Loading from "@/app/loading";
import { getSession, useSession } from "next-auth/react";
import api from "@/utils/api";
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import { responseType } from "./Type";
import CurrenInfoBtn from "./Button/CurrenInfoBtn";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const MergeAll = () => {
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState<responseType[]>([]);
  const router = useRouter();
  const { data: session } = useSession();


  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signOut({ redirect: false });
    router.push("/login");
  };


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const session = await getSession();
      const response = await api.get(`${process.env.NEXT_PUBLIC_BASE_URL}/userinformation/all`, { params: { token: session?.accessToken } });
      setData(response.data.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'ชื่อ-สกุล',
      children: `คุณ ${Data[0]?.firstname || ''} ${Data[0]?.lastname || ''}`,
      
    },
  ];

  if (loading) return <Loading />
  return (
    <div className="grid grid-rows-[auto] gap-5">
      <div className="px-3 flex justify-between">
        <div>
          <Descriptions items={items} />
        </div>
        <div>
          <button
            className="flex items-center justify-center gap-3 whitespace-nowrap text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 rounded-xl px-5 py-2 text-sm"
            style={{ width: 150, height: 40 }}
            type="button"
            onClick={handleLogout}
          >
            <BiLogOut className="text-lg" />
            ออกจากระบบ
          </button>
        </div>
      </div>
      <div>
        <CurrentInfo disable={false} data={Data} fetchData={fetchData} />
      </div>
      <div>
        <PersonalInfo disable={false} data={Data} />
      </div>
      <div>
        <RequestInfo disable={false} />
      </div>
    </div>
  );
};

export default MergeAll;
