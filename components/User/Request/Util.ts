export const monthNames = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
];
export const classOptions = [
  { value: 0, label: "อัยการอาวุโส" },
  { value: 1, label: "ชั้น 1" },
  { value: 2, label: "ชั้น 2" },
  { value: 3, label: "ชั้น 3" },
  { value: 4, label: "ชั้น 4" },
  { value: 5, label: "ชั้น 5 เชี่ยวชาญ" },
  { value: 6, label: "ชั้น 6 เชี่ยวชาญพิเศษ" },
  { value: 7, label: "ชั้น 7 ผู้ตรวจ" },
  { value: 8, label: "ชั้น 8" },
  { value: 402, label: "ชั้น 4 ผู้กลั่นกรอง" },
  { value: 501, label: "ชั้น 5 อจ./4 อจ." },
  { value: 601, label: "ชั้น 6 อัยการพิเศษฝ่าย" },
  { value: 602, label: "ชั้น 6 รองอธิบดี" },
  { value: 603, label: "ชั้น 6 อธิบดี" },
  { value: 701, label: "ชั้น 7 รอง อสส." },
];

export const dayOptions = Array.from({ length: 31 }, (_, i) => ({
  value: i + 1,
  label: (i + 1).toString(),
}));

export const monthOptions = monthNames.map((month, index) => ({
  value: index + 1,
  label: month,
}));

export const yearOptions = Array.from({ length: 30 }, (_, i) => ({
  value: 2550 + i,
  label: (2550 + i).toString(),
}));





//---------------------------------------------------------------------------------------------------
// PersonalInfo

export const optionsStatus = [
    { value: "โสด", label: "โสด" },
    { value: "สมรส", label: "สมรส" },
    { value: "หย่าร้าง", label: "หย่าร้าง" },
    { value: "เเยกกันอยู่", label: "เเยกกันอยู่" },
]

export const optionsAddress = [
    { value: "บ้านของตนเอง", label: "บ้านของตนเอง" },
    { value: "บ้านพักของทางราชการ", label: "บ้านพักของทางราชการ" },
    { value: "บ้านเช่า", label: "บ้านเช่า" },
    { value: "บ้านที่อาศัยผู้อื่น", label: "บ้านที่อาศัยผู้อื่น" },
]