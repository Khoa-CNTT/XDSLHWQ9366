import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportUsersToExcel(users: any[]) {
  const worksheet = XLSX.utils.json_to_sheet(users);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, "DanhSachNguoiDung.xlsx");
}
