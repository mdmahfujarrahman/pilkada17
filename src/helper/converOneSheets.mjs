import XLSX from "xlsx";
import fs from "fs";

export const consolidateData = (fileName, serial) => {
    const file = `./${serial}-${fileName}/${fileName}.xlsx`;
    const updateFile = `./${serial}-${fileName}/${fileName}-update.xlsx`;
    const workbook = XLSX.readFile(file);
    const sheetNames = workbook.SheetNames;
    const data = [];
    for (const sheetName of sheetNames) {
        const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
            header: 1,
        });
        if (data.length === 0) {
            data.push(...json);
        } else {
            json.shift();
            data.push(...json);
        }
    }
    const newWorkSheet = XLSX.utils.aoa_to_sheet(data);
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, newWorkSheet, fileName);
    fs.writeFileSync(updateFile, "");
    XLSX.writeFile(newWorkbook, updateFile);
};

// consolidateData("Solok");
