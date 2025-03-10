"use client";

import CurrentInfo from "@/components/User/Request/CurrentInfo";
import PersonalInfo from "@/components/User/Request/PersonalInfo";
import RequestInfo from "@/components/User/Request/RequestInfo";
import React, { useEffect, useState } from "react";
import TableResultDetailUser from "./Table";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Loading from "@/app/loading";
import { responseType,TransferRequest } from "./responseType";
import CurrenInfoBtn from "@/components/User/Request/Button/CurrenInfoBtn";
import { IoCaretBack } from "react-icons/io5";


const MergeAll = () => {
    const { userId } = useParams();
    const [loading, setLoading] = useState(true);
    const [Data, setData] = useState<responseType[]>([]);
    const [TableResultDetailUserData, setTableResultDetailUserData] = useState<TransferRequest[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (userId) {
            fetchData();
        }
    }, [userId]);

    const fetchData = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/result/detail/${userId}`);
          setTableResultDetailUserData(response.data.data.groupedResult[0].transfer_requests)
          setData(response.data.data.groupedResult)
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

    if(loading) return <Loading/>
    return (
        <div className="grid grid-rows-[auto] gap-5">
            <div className="flex justify-start">
            <CurrenInfoBtn className="text-white bg-[#4868AC] hover:bg-[#1A8CFF] transition-colors duration-200 rounded-xl" label="ย้อนกลับ" height={40} type="button" icon={<IoCaretBack />} 
            onClick={()=>router.push(`/admin/result/${Data[0].targetClass}`)}
            
            />
            </div>
            <div>
                <TableResultDetailUser data={TableResultDetailUserData}/>
            </div>
            <div>
                <CurrentInfo disable={true} data={Data} />
            </div>
            <div>   
                <PersonalInfo disable={true} data={Data} />
            </div>
        </div>
    );
};

export default MergeAll;
