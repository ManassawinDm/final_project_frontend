"use client";

import React, { useEffect, useRef, useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import axios from "axios";
import Loading from "@/app/loading";
import InputOrganization from "@/components/OrganizationList/InputOrganization";
import { BtnSearch, BtnImport } from "@/components/OrganizationList/BtnImport";
import { TfiImport } from "react-icons/tfi";
import { FiSearch } from "react-icons/fi";
import Swal from "sweetalert2";

const TableOrganization = () => {
    const [request, setRequest] = useState<DataTypeRespose[]>([]);
    const [filteredData, setFilteredData] = useState<DataType[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getRequestAll();
    }, []);

    const getRequestAll = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/departments/all`);
            setRequest(res.data);
            setFilteredData(transformData(res.data));
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const transformData = (data: DataTypeRespose[]): DataType[] => {
        return data.map((item, index) => ({
            key: index + 1,
            name: item.name,
            short_name: item.short_name,
            address: item.address,
            latitude: item.latitude,
            longitude: item.longitude,
            province: item.province,
            area: item.area,
            type: item.type,
        }));
    };


    const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = event.target.files?.[0];
            if (!file) {
                await Swal.fire({
                    title: "กรุณาเลือกไฟล์!",
                    text: "คุณต้องเลือกไฟล์ก่อนทำการอัปโหลด",
                    icon: "warning",
                    confirmButtonText: "ตกลง",
                });
                return;
            }
    
            Swal.fire({
                title: "กำลังอัปโหลด...",
                text: "โปรดรอสักครู่",
                allowOutsideClick: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
    
            const formData = new FormData();
            formData.append("file", file); // key = "file"
    
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/departments/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data)
    
            Swal.close();
    
            if (response.data.success) {
                await Swal.fire({
                    title: "นำเข้าข้อมูลสำเร็จ!",
                    text: `นำเข้าข้อมูลแล้ว`,
                    icon: "success",
                    confirmButtonText: "ตกลง",
                });
                getRequestAll();
            }
        } catch (error) {
            console.error("เกิดข้อผิดพลาดขณะบันทึกข้อมูล:", error);
            Swal.close(); 
            await Swal.fire({
                title: "ข้อผิดพลาด!",
                text: "เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์",
                icon: "error",
                confirmButtonText: "ตกลง",
            });
        }
    };
    
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click(); // ให้ปุ่ม BtnImport กดแล้วเปิด file picker
    };

    const handleSearch = () => {
        const filtered = transformData(request).filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    };
    const clearSearch = () => {
        setSearchTerm(""); // ล้างคำค้นหาจาก input
        setFilteredData(transformData(request)); // แสดงข้อมูลทั้งหมด
    };

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
        { title: "#", dataIndex: "key" },
        {
            title: "ชื่อ",
            dataIndex: "name",
            render: (text) => <span style={{ fontWeight: 300 }}>{text}</span>,
        },
        {
            title: "ชื่อย่อ",
            dataIndex: "short_name",
            render: (text) => <span style={{ fontWeight: 300 }}>{text}</span>,
        },
        {
            title: "ที่อยู่",
            dataIndex: "address",
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

    if (loading) return <Loading />;

    return (
        <div className="p-5">
            <div className="flex flex-col gap-4 text-gray-700">
                <div className="flex flex-col md:flex-row">
                    <div className="flex flex-col pb-2">
                        <InputOrganization
                            name="name"
                            title="ชื่อ"
                            placeholder="ค้นหาชื่อ/ที่อยู่/จังหวัด"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row items-end py-3 px-3">
                        <BtnSearch title="ค้นหาข้อมูล" icon={<FiSearch />} onClick={handleSearch} />
                    </div>
                    <div className="flex flex-row items-end py-3 px-3">
                        <button
                            onClick={clearSearch}
                            className="cursor-pointer group relative flex items-center gap-1.5 px-3 py-2 bg-red-500 bg-opacity-80 text-white rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md"
                        >
                            <span className="text-sm p-1 font-light">ล้างการค้นหา</span>
                        </button>
                    </div>
                </div>
                <div className="py-5">
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }} 
                        onChange={handleImport} 
                    />
                    <BtnImport title="นำเข้าข้อมูล" icon={<TfiImport />} onClick={handleButtonClick} />
                </div>
            </div>


            {/* Table */}
            <div className="border border-gray-300">
                <Table<DataType>
                    columns={columns}
                    dataSource={filteredData}
                    onChange={onChange}
                    scroll={{ x: "max-content" }}
                    pagination={{ pageSize: 50 }}
                />
            </div>
        </div>
    );
};

export default TableOrganization;
