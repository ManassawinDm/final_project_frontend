"use client"

import React from 'react'
import { RiFolderUserFill } from "react-icons/ri";
import { Table } from "antd";
import { TransferRequest } from './responseType';


interface ITableResultDetailUser {
    data?: TransferRequest[]
}

const TableResultDetailUser = (props: ITableResultDetailUser) => {
    const { data } = props

    const columns = [
        {
          title: "ลำดับ",
          dataIndex: "index",
          key: "index",
          width: 80,
          align: "center" as const, // ใช้ 'center' แทน string ธรรมดา
          render: (_: any, __: TransferRequest, index: number) => index + 1, // กำหนดลำดับอัตโนมัติ
        },
        {
          title: "สำนักงานที่โยกย้าย",
          dataIndex: "request_office",
          key: "request_office",
        },
        {
          title: "เหตุผล",
          dataIndex: "reason",
          key: "reason",
        },
      ];

    return (
        <div className="grid grid-rows-[auto,1fr] gap-2 overflow-hidden rounded-xl border">
            <div className="px-7 py-2 bg-[#1677FF] text-white text-lg inline-flex items-center gap-2">
                <RiFolderUserFill />
                คำขอโยกย้ายทั้งหมด
            </div>

            <div className="px-7 py-2">
                <Table
                    columns={columns}
                    dataSource={data?.map((item, index) => ({
                        ...item,
                        key: index, 
                    }))}
                    pagination={false} 
                    bordered
                />
            </div>
        </div>
    )
}

export default TableResultDetailUser