"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import axios from "axios";
import Loading from "@/app/loading";

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

    const columns: TableColumnsType<DataType> = [
        {
            title: "#",
            dataIndex: "key",
            align: "center",
        },
        {
            title: "ชื่อ-สกุล",
            dataIndex: "fullname",
            render: (text) => <span style={{ fontWeight: 300 }}>{text}</span>,
        },
        {
            title: "ชั้น",
            dataIndex: "class",
            align: "center",
            render: (text) => <span style={{ fontWeight: 300 }}>{text}</span>,
        },
        {
            title: "สถานที่ปฏิบัติการ",
            dataIndex: "officeName",
            align: "center",
            render: (text) => <span style={{ fontWeight: 300 }}>{text}</span>,
        },

    ];

    const [request, setRequest] = useState<DataTypeRespose[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getRequestAll();
    }, []);

    const getRequestAll = async () => {
        try {
            const res = await axios.get("http://localhost:8888/request-transfer/user-request");
            setRequest(res.data.result);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    };

    const transformedData: DataType[] = request.map((item, index) => ({
        key: index+1,
        fullname: item.fullname,
        officeName: item.officeName,
        class: item.class,
      }));

    const onChange: TableProps<DataType>["onChange"] = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
    };

    if(loading) return <Loading/>
    return (
        <div style={{ overflowX: "auto" }}>
            <Table<DataType>
                columns={columns}
                dataSource={transformedData}
                onChange={onChange}
                scroll={{ x: 'max-content' }}
                pagination={{ pageSize: 50 , hideOnSinglePage: true}}
            />
        </div>
    );
};

export default TablesRequest;
