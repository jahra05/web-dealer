import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportExcel = ({ data, columns, fileName }) => {
    // ubah data sesuai kolom yang diinginkan

    const exportData = data.map((item) => {
        const row = {}

        columns.forEach((column) => {
            row[column.label] = item[column.key]
        })

        return row
    })

    // membuat worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // membuat workbook
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Data"
    )

    // generate dile excel
    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: 'array'
    })

    const file = new Blob(
        [excelBuffer],
        {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
        }
    );
    saveAs(file, `${fileName}.xlsx`)
}
