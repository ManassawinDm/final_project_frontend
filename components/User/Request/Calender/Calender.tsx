import React from "react";
import { DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";

interface ICalendarProps {
  name: string;
  format?: string;
  placeholder: string;
  disable?: boolean;
  width?: number | string;
  height?: number | string;
  value?: string | Date | null;
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

  const dateValue = value ? dayjs(value) : null;
  return (
    <DatePicker
      disabled={disable}
      format={format}
      placeholder={placeholder}
      style={{ width, height }}
      value={dateValue}
      onChange={(date, dateString) => {
        if (typeof dateString === "string") {
          onChange?.(name, dateString);
        }
      }}
    />
  );
};

export default Calendar;
