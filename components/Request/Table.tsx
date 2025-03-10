"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import axios from "axios";
import Loading from "@/app/loading";
import BtnSearch from "@/components/Request/BtnSearch";

const TablesRequest = () => {
    interface DataType {
        key: React.Key;
        fullname: string;
        officeName: string;
        class: string;
    }

    interface DataTypeRespose {
        key: React.Key;
        fullname: string;
        officeName: string;
        class: string;
    }

    const [request, setRequest] = useState<DataTypeRespose[]>([]);
    const [loading, setLoading] = useState(true);
    const [fullname, setFullname] = useState(""); // เก็บค่าชื่อจาก input
    const [seniorityNumber, setSeniorityNumber] = useState(""); // เก็บค่าเลขอาวุโส

    useEffect(() => {
        getRequestAll();
    }, []);

    const getRequestAll = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/request-transfer/user-request`);
            setRequest(res.data.result);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = () => {
        console.log("ค้นหาโดย:", { fullname, seniorityNumber });
        // TODO: ส่ง fullname และ seniorityNumber ไป filter request
    };

    const columns: TableColumnsType<DataType> = [
        { title: "#", dataIndex: "key", align: "center" },
        { title: <div style={{ textAlign: "center", width: "100%" }}>ชื่อ-สกุล</div>, dataIndex: "fullname", render: (text) => <span style={{ fontWeight: 300 }}>{text}</span> },
        { title: <div style={{ textAlign: "center", width: "100%" }}>ชั้น</div>, dataIndex: "class", align: "left", render: (text) => <span style={{ fontWeight: 300 }}>{text}</span> },
        {
            title: <div style={{ textAlign: "center", width: "100%" }}>สถานที่ปฏิบัติการ</div>,
            dataIndex: "officeName",
            align: "left", 
            render: (text) => <span style={{ fontWeight: 300 }}>{text}</span>,
          }
    ];

    const transformedData: DataType[] = request.map((item, index) => ({
        key: index + 1,
        fullname: item.fullname,
        officeName: item.officeName,
        class: item.class,
    }));

    const onChange: TableProps<DataType>["onChange"] = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
    };

    if (loading) return <Loading />;

    return (
        <div style={{ overflowX: "auto" }}>
            {/* ส่วนของ Input และ ปุ่มค้นหา */}
            <div className="flex flex-col md:flex-row justify-start text-gray-700 p-5">
                <div className="flex flex-col px-5">
                    <div className="text-sm">
                        <p className="font-light">ชื่อ<span className="text-red-500">*****</span></p>
                    </div>
                    <div className="py-1">
                        <input
                            type="text"
                            className="w-full px-2 py-1 border border-gray-300 rounded-lg text-md"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-col px-5">
                    <div className="text-sm">
                        <p className="font-light">เลขอาวุโส<span className="text-red-500">*****</span></p>
                    </div>
                    <div className="py-1">
                        <input
                            type="text"
                            className="w-full px-2 py-1 border border-gray-300 rounded-lg text-md"
                            value={seniorityNumber}
                            onChange={(e) => setSeniorityNumber(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-end px-5">
                    <BtnSearch  />
                </div>
            </div>

            {/* ส่วนของ Table */}
            <Table<DataType>
                columns={columns}
                dataSource={transformedData}
                onChange={onChange}
                scroll={{ x: "max-content" }}
                pagination={{ pageSize: 100, hideOnSinglePage: true }}
            />
        </div>
    );
};

export default TablesRequest;
