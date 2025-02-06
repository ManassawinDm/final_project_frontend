"use client"

import React, { useState } from 'react';
import { Table, Tag } from 'antd';
import { useRouter } from 'next/navigation';
import type { TableProps } from 'antd';
import { Skeleton } from 'antd';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  availableOffice?: string; // New column for available office
  tags: string[];
  status: string;
  aiPredict?: string; // Optional aiPredict field
}

type ColumnsType<T extends object> = TableProps<T>['columns'];

const App: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const columns: ColumnsType<DataType> = [
    {
      title: 'เลขผู้สูงอายุ',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'ชื่อ',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <a onClick={() => router.push(`/result/detail/${record.key}`)}>{text}</a>
      ), // Name column is clickable and redirects to the detail page
    },
    {
      title: 'ชั้น',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age, // Age column is sortable
    },
    {
      title: 'สำนักงานปัจจุบัน',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'สำนักงานที่ย้ายได้',
      dataIndex: 'availableOffice',
      key: 'availableOffice',
      render: (office) => office || <span style={{ color: '#d9d9d9' }}>N/A</span>,
    },
    {
      title: 'ประเภท',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: string[]) => (
        <span>{tags.join(', ')}</span> // Tags column without colors
      ),
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'โยกย้ายสำเร็จ' ? 'green' : 'red'}>
          {status === 'โยกย้ายสำเร็จ' ? 'โยกย้ายสำเร็จ' : 'โยกย้ายไม่สำเร็จ'}
        </Tag>
      ),
    },
    {
      title: 'การเเนะนำ',
      dataIndex: 'aiPredict',
      key: 'aiPredict',
      render: (predict: string, record) => (
        record.status !== 'transferable' && predict ? (
          <p style={{ color: '#ff4d4f' }}>{predict}</p>
        ) : (
          <span style={{ color: '#d9d9d9' }}>N/A</span>
        )
      ),
    },
    {
      title: 'ยืนยัน',
      key: 'action',
      render: (_, record) => (
        record.status !== 'transferable' ? (
          <a onClick={() => router.push(`/action/${record.key}`)} style={{ color: '#1890ff' }}>
            ยืนยัน
          </a>
        ) : null
      ),
    },
    {
        title: 'รายละอียด',
        key: 'more',
        render: (_, record) => (
          record.status !== 'transferable' ? (
            <a onClick={() => router.push(`/action/${record.key}`)} style={{ color: '#1890ff' }}>
              ดูเพิ่มเติม
            </a>
          ) : null
        ),
      },
  ];

  const data: DataType[] = Array.from({ length: 10 }, (_, i) => ({
    key: `${i + 1}`,
    name: `ชื่อพนักงาน ${i + 1}`,
    age: 20 + (i % 30),
    address: `สำนักงาน ${i % 5 + 1}`,
    availableOffice: i % 3 === 0 ? `สำนักงาน ${i % 5 + 2}` : undefined,
    tags: i % 2 === 0 ? ['ภูมิลำเนา','ป่วย','คู่สมรส'] : i %3 == 0 ?  ['ป่วย','คู่สมรส'] : ['อื่นๆ'],
    status: i % 3 === 0 ? 'โยกย้ายสำเร็จ' : 'โยกย้ายไม่สำเร็จ',
    aiPredict: i % 3 === 0 ?  undefined : `สำนักงาน ${i % 5 + 3}`,
  }));

  return (
    <div>
      <Table<DataType>
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 20 }}
        tableLayout="auto"
      />
    </div>
  );
};

export default App;
