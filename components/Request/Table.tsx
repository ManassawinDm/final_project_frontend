"use client";

import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";

const TablesRequest = () => {
    interface DataType {
        key: React.Key;
        name: string;
        senior: number;
        location: string;
        orderRequest: string;
        move: string;
        reason: string;
        english: number;
    }

    const columns: TableColumnsType<DataType> = [
        {
            title: "#",
            dataIndex: "key",
        },
        {
            title: "ชื่อ-สกุล",
            dataIndex: "name",
        },
        {
            title: "อาวุโส",
            dataIndex: "senior",
            sorter: (a, b) => a.senior - b.senior,
        },
        {
            title: "สถานที่ทำงาน",
            dataIndex: "location",
            sorter: (a, b) => (a.location > b.location ? 1 : -1),
        },
        {
            title: "ลำดับขอย้าย",
            dataIndex: "orderRequest",
            sorter: (a, b) => (a.orderRequest > b.orderRequest ? 1 : -1),
        },
        {
            title: "ขอย้าย",
            dataIndex: "move",
            sorter: (a, b) => (a.move > b.move ? 1 : -1),
        },
        {
            title: "เหตุผล",
            dataIndex: "reason",
            sorter: (a, b) => (a.reason > b.reason ? 1 : -1),
        },
    ];

    const data: DataType[] = [
        {
            key: "1",
            name: "ชั้น 8",
            senior: 98,
            location: "กรุงเทพ",
            orderRequest: "ขอย้าย",
            move: "ย้ายได้",
            reason: "ตามความต้องการ",
            english: 70,
        },
        {
            key: "2",
            name: "ชั้น 7",
            senior: 88,
            location: "เชียงใหม่",
            orderRequest: "ไม่ขอย้าย",
            move: "ย้ายไม่ได้",
            reason: "เหตุผลส่วนตัว",
            english: 60,
        },
        {
            key: "3",
            name: "ชั้น 6",
            senior: 78,
            location: "ขอนแก่น",
            orderRequest: "ขอย้าย",
            move: "ย้ายได้",
            reason: "ย้ายตามคำสั่ง",
            english: 80,
        },
        {
            key: "4",
            name: "ชั้น 5",
            senior: 68,
            location: "ภูเก็ต",
            orderRequest: "ขอย้าย",
            move: "ย้ายได้",
            reason: "ย้ายตามโปรเจ็ค",
            english: 90,
        },
    ];

    const onChange: TableProps<DataType>["onChange"] = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
    };

    return (
        <div style={{ overflowX: "auto" }}>
            <Table<DataType>
                columns={columns}
                dataSource={data}
                onChange={onChange}
                scroll={{ x: 'max-content' }} 
            />
        </div>
    );
};

export default TablesRequest;
