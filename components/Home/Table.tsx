"use client";

import React from "react";
import MoverBtn from "./MoverBtn";
import NotMoveBtn from "./NotMoveBtn";
import ProcessBtn from "./ProcessBtn";
import DelProcessBtn from "./DelProcessBtn";
import DetailProcessBtn from "./DetailProcessBtn";

import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";

const Tables = () => {
  interface DataType {
    key: React.Key;
    name: string;
    chinese: number;
    math: number;
    english: number;
  }

  const columns: TableColumnsType<DataType> = [
    {
      title: "ชั้น",
      dataIndex: "name",
    },
    {
      title: "จำนวนอัยการทั้งหมด/จำนวนกรอบอัตรากำลังที่คงเหลือ",
      dataIndex: "chinese",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "ขอย้าย/ไม่ขอย้าย",
      dataIndex: "math",
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: "จำนวนอัยการที่ขอย้ายในชั้นนี้",
      dataIndex: "english",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
      title: "ย้ายได้/ย้ายไม่ได้-ตำแหน่งลอย/ตำแหน่งเหลือ",
      dataIndex: "english",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <div className="grid grid-cols-1 grid-rows-3">
          <div>
            <p>รายการผู้ขอย้ายเท่านั้น: <MoverBtn /></p>
          </div>
          <div>
            <p>รายการรวมผู้ไม่ขอย้าย: <NotMoveBtn /></p>
          </div>
          <div className="flex space-x-4">
            <DetailProcessBtn />
            <ProcessBtn />
            <DelProcessBtn />
          </div>

        </div>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "ชั้น 8",
      chinese: 98,
      math: 60,
      english: 70,
    },
    {
      key: "2",
      name: "Jim Green",
      chinese: 98,
      math: 66,
      english: 89,
    },
    {
      key: "3",
      name: "Joe Black",
      chinese: 98,
      math: 90,
      english: 70,
    },
    {
      key: "4",
      name: "Jim Red",
      chinese: 88,
      math: 99,
      english: 89,
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return <Table<DataType> columns={columns} dataSource={data} onChange={onChange} />;
};

export default Tables;
