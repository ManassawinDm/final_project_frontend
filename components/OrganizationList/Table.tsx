"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import axios from "axios";
import Loading from "@/app/loading";

const TableOrganization = () => {
    const [request, setRequest] = useState<DataTypeRespose[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getRequestAll();
    }, []);

    const getRequestAll = async () => {
        try {
            const res = await axios.get("http://localhost:8888/departments/all");
            setRequest(res.data);
            console.log(res.data)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    };

    const transformedData: DataType[] = request.map((item, index) => ({

        key: index+1,
        name: item.name,
        short_name: item.short_name,
        address: item.address,
        latitude: item.latitude,
        longitude: item.longitude,
        province: item.province,
        area: item.area,
        type: item.type,
    }));

    interface DataTypeRespose {
        key: React.Key;
        name: string;
        short_name: string;
        address: string;
        latitude: number;
        longitude: number;
        province: string;
        area: string;
        type: string;
    }

    interface DataType {
        key: React.Key;
        name: string;
        short_name: string;
        address: string;
        latitude: number;
        longitude: number;
        province: string;
        area: string;
        type: string;
    }

    const columns: TableColumnsType<DataType> = [
        {
            title: "#",
            dataIndex: "key",
        },
        {
            title: "ชื่อ",
            dataIndex: "name",
            render: (text) => <span style={{ fontWeight: 300 }}>{text}</span>,
        },
        {
            title: "ชื่อย่อ",
            dataIndex: "short_name",
            align: "center",
            render: (text) => <span style={{ fontWeight: 300 }}>{text}</span>,
        },
        {
            title: "ที่อยู่",
            dataIndex: "address",
            align: "center",
            render: (text) => <span style={{ fontWeight: 300 }}>{text}</span>,
        },
        {
            title: "latitude",
            dataIndex: "latitude",
            align: "center",
            render: (text) => <span style={{ fontWeight: 300 }}>{text}</span>,
        },
        {
            title: "longitude",
            dataIndex: "longitude",
            align: "center",
            render: (text) => <span style={{ fontWeight: 300 }}>{text}</span>,
        },
        {
            title: "จังหวัด",
            dataIndex: "province",
            align: "center",
            render: (text) => <span style={{ fontWeight: 300 }}>{text}</span>,
        },
        {
            title: "พื้นที่",
            dataIndex: "area",
            align: "center",
            render: (text) => <span style={{ fontWeight: 300 }}>{text}</span>,
        },
    ];



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
                pagination={{ pageSize: 50}}
            />
        </div>
    );
};

export default TableOrganization;
