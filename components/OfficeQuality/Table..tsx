"use client";

import React, { useEffect, useState } from "react";
import { Table, Select, Input } from "antd";
import type { TableColumnsType } from "antd";
import axios from "axios";
import Loading from "@/app/loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Option } = Select;

interface DepartmentData {
  departmentName: string;
  positions: {
    id: number;
    className: string;
    quantity: number;
  }[];
}

interface TableData {
  key: React.Key;
  id: number;
  departmentName: string;
  className: string;
  quantity: number;
}

const TableOfficeQuality = () => {
  const [data, setData] = useState<DepartmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<TableData[]>([]);
  const [inputValues, setInputValues] = useState<Record<string, number>>({});
  const [updatedRows, setUpdatedRows] = useState<Record<string, boolean>>({});
  const [updateErrors, setUpdateErrors] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    getRequestAll();
  }, []);

  useEffect(() => {
    filterData();
  }, [selectedDepartment, selectedClass, data]);

  const getRequestAll = async () => {
    try {
      const res = await axios.get("http://localhost:8888/position/all");
      setData(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const filterData = () => {
    let filtered = data.flatMap((department) =>
      department.positions.map((position) => ({
        key: `${department.departmentName}-${position.id}`,
        id: position.id,
        departmentName: department.departmentName,
        className: position.className,
        quantity: position.quantity,
      }))
    );

    if (selectedDepartment) {
      filtered = filtered.filter((item) => item.departmentName === selectedDepartment);
    }

    if (selectedClass) {
      filtered = filtered.filter((item) => item.className === selectedClass);
    }

    setFilteredData(filtered);
  };

  const handleInputChange = (key: string, value: number) => {
    setInputValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleInputConfirm = async (id: number, key: string) => {
    const newQuantity = inputValues[key];

    if (newQuantity !== undefined) {
      try {
        const response = await axios.post("http://localhost:8888/position/update", {
          id: id,
          quantity: newQuantity,
        });

        if (response.data.success === true) {
          setUpdatedRows((prev) => ({
            ...prev,
            [key]: true,
          }));

          setUpdateErrors((prev) => ({
            ...prev,
            [key]: false,
          }));

          toast.success("✅ อัปเดตจำนวนสำเร็จ!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (error) {
        console.log(error);
        setUpdateErrors((prev) => ({
          ...prev,
          [key]: true,
        }));
        toast.error("❌ เกิดข้อผิดพลาดในการอัปเดต!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };


  const departments = Array.from(new Set(data.map((item) => item.departmentName)));
  const classes = Array.from(
    new Set(
      data
        .filter((department) => !selectedDepartment || department.departmentName === selectedDepartment)
        .flatMap((department) => department.positions.map((position) => position.className))
    )
  );

  const columns: TableColumnsType<TableData> = [
    {
      title: "ลำดับ",
      dataIndex: "key",
      render: (text, record, index) => index + 1,
    },
    {
      title: "ชื่อแผนก",
      dataIndex: "departmentName",
    },
    {
      title: "ชั้น",
      dataIndex: "className",
    },
    {
      title: "จำนวน",
      dataIndex: "quantity",
      align: "center",
      render: (text, record) => {
        return (
          <div>
            <Input
              type="number"
              value={inputValues[record.key.toString()] ?? record.quantity}
              min={0}
              onChange={(e) =>
                handleInputChange(
                  record.key.toString(),
                  parseInt(e.target.value, 10)
                )
              }
              onPressEnter={() => handleInputConfirm(record.id, record.key.toString())}
              style={{ width: 100 }}
            />
            {updatedRows[record.key.toString()] ? (
              <div style={{ color: "green", fontSize: "12px", marginTop: "4px" }}>
                ✔ อัปเดตแล้ว
              </div>
            ) : updateErrors[record.key.toString()] ? (
              <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                ❌ กรุณากรอกข้อมูลให้ถูกต้อง
              </div>
            ) : null}
          </div>
        );
      },
    },
  ];

  if (loading) return <Loading />;

  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ marginBottom: 16 }}>
        <Select
          placeholder="เลือกชื่อแผนก"
          style={{ width: 800, marginRight: 16 }}
          dropdownStyle={{ minWidth: 800 }}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.children?.toString() || "").toLowerCase().includes(input.toLowerCase())
          }
          onChange={(value) => setSelectedDepartment(value)}
          allowClear
        >
          {departments.map((department) => (
            <Option key={department} value={department}>
              {department}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="เลือกชั้น"
          style={{ width: 200 }}
          onChange={(value) => setSelectedClass(value)}
          disabled={!selectedDepartment}
          allowClear
        >
          {classes.map((className) => (
            <Option key={className} value={className}>
              {className}
            </Option>
          ))}
        </Select>
      </div>

      <Table<TableData>
        columns={columns}
        dataSource={filteredData}
        scroll={{ x: "max-content" }}
        pagination={{ pageSize: 100 }}
      />
    </div>
  );
};

export default TableOfficeQuality;
