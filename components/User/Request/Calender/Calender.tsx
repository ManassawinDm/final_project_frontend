import React from "react";
import { DatePicker } from "antd";
import type { DatePickerProps } from "antd";

interface ICalendarProps {
  name: string;
  format?: string;
  placeholder: string;
  width?: number | string;
  height?: number | string;
  onChange?: (name: string, value: string) => void;
}

const Calendar: React.FC<ICalendarProps> = ({
  name,
  format = "YYYY-MM-DD",
  placeholder,
  width,
  height,
  onChange,
}) => {
  return (
    <DatePicker
      format={format}
      placeholder={placeholder}
      style={{ width, height }}
      onChange={(date, dateString) => {
        if (typeof dateString === "string") {
          onChange?.(name, dateString);
        }
      }}
    />
  );
};

export default Calendar;
