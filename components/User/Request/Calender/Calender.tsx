import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

interface ICalendarProps {
  name: string;
  format?: string;
  placeholder: string;
  disable?: boolean;
  width?: number | string;
  height?: number | string;
  value?: string | null;
  onChange?: (name: string, value: string) => void;
}

const Calendar: React.FC<ICalendarProps> = ({
  name,
  format = "YYYY-MM-DD",
  placeholder,
  width,
  height,
  onChange,
  disable,
  value
}) => {
  // ✅ ใช้ state เพื่อเก็บค่า
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(
    value ? dayjs(value) : null
  );

  // ✅ อัปเดต state เมื่อ `value` จาก `props` เปลี่ยนแปลง
  useEffect(() => {
    setSelectedDate(value ? dayjs(value) : null);
  }, [value]);

  return (
    <DatePicker
      disabled={disable}
      format={format}
      placeholder={placeholder}
      style={{ width, height }}
      value={selectedDate} // ✅ ใช้ state เป็นค่า value
      onChange={(date, dateString) => {
        setSelectedDate(date); // ✅ อัปเดต state

        // 🔥 ตรวจสอบ `dateString` ก่อนส่งค่า (ให้เป็น `string` เท่านั้น)
        if (typeof dateString === "string" && onChange) {
          onChange(name, dateString);
        }
      }}
    />
  );
};

export default Calendar;
