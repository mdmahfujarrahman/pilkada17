import XLSX from "xlsx";
import fs from "fs";

export const exportData = (data, sheetName, fileNames, isMain, serial) => {
    const folderName = `./src/${serial}-${fileNames}`;
    if (isMain) {
        fs.mkdirSync(folderName);
    }

    const fileName = `src/${serial}-${fileNames}/${fileNames}.xlsx`;
    if (fs.existsSync(fileName)) {
        const existingFile = XLSX.readFile(fileName);
        const worksheet = XLSX.utils.json_to_sheet(data);
        // Add a sheet name to the worksheet
        worksheet["!ref"] = worksheet["!ref"]; // Update the reference
        worksheet["!rel"] = sheetName.replace("PILKADA", ""); // Add the sheet name

        worksheet["A1"] = { v: "PILKADA", t: "s" };
        worksheet["B1"] = { v: "LEVEL", t: "s" };
        worksheet["C1"] = { v: "KABUPATEN/KOTA", t: "s" };
        worksheet["D1"] = { v: "KECAMATAN", t: "s" };
        worksheet["E1"] = { v: "KELURAHAN", t: "s" };
        worksheet["F1"] = { v: "TPS", t: "s" };
        worksheet["G1"] = { v: "PEMILIH", t: "s" };
        worksheet["H1"] = { v: "PENGGUNA_HAK", t: "s" };
        worksheet["I1"] = { v: "PARTISIPASI", t: "s" };
        worksheet["J1"] = { v: "SUARA_SAH", t: "s" };
        worksheet["K1"] = { v: "SUARA_TIDAK_SAH", t: "s" };
        worksheet["L1"] = { v: "TOTAL_SUARA", t: "s" };
        worksheet["M1"] = { v: "HASIL_1", t: "s" };
        worksheet["N1"] = { v: "HASIL_2", t: "s" };
        if (data[0].HASIL_3) {
            worksheet["O1"] = { v: "HASIL_3", t: "s" };
        } else {
            worksheet["O1"] = { v: "URL", t: "s" };
        }
        if (data[0].HASIL_4) {
            worksheet["P1"] = { v: "HASIL_4", t: "s" };
        } else {
            worksheet["P1"] = { v: "URL", t: "s" };
        }
        if (data[0].HASIL_5) {
            worksheet["Q1"] = { v: "HASIL_5", t: "s" };
        } else {
            worksheet["Q1"] = { v: "URL", t: "s" };
        }
        if (data[0].HASIL_6) {
            worksheet["R1"] = { v: "HASIL_6", t: "s" };
        } else {
            worksheet["R1"] = { v: "URL", t: "s" };
        }
        if (data[0].HASIL_7) {
            worksheet["S1"] = { v: "HASIL_6", t: "s" };
        } else {
            worksheet["S1"] = { v: "URL", t: "s" };
        }
        if (data[0].HASIL_8) {
            worksheet["T1"] = { v: "HASIL_6", t: "s" };
        } else {
            worksheet["T1"] = { v: "URL", t: "s" };
        }
        if (data[0].HASIL_9) {
            worksheet["U1"] = { v: "HASIL_6", t: "s" };
        } else {
            worksheet["U1"] = { v: "URL", t: "s" };
        }

        for (let i = 0; i < data.length; i++) {
            worksheet["A" + (i + 2)] = { v: data[i].PILKADA, t: "s" };
            worksheet["B" + (i + 2)] = { v: data[i].LEVEL, t: "s" };
            worksheet["C" + (i + 2)] = { v: data[i]["KABUPATEN_KOTA"], t: "s" };
            worksheet["D" + (i + 2)] = { v: data[i].KECAMATAN, t: "s" };
            worksheet["E" + (i + 2)] = { v: data[i].KELURAHAN, t: "s" };
            worksheet["F" + (i + 2)] = { v: data[i].TPS, t: "s" };
            worksheet["G" + (i + 2)] = { v: data[i].PEMILIH, t: "s" };
            worksheet["H" + (i + 2)] = { v: data[i].PENGGUNA_HAK, t: "s" };
            worksheet["I" + (i + 2)] = { v: data[i].PARTISIPASI, t: "s" };
            worksheet["J" + (i + 2)] = { v: data[i].SUARA_SAH, t: "s" };
            worksheet["K" + (i + 2)] = { v: data[i].SUARA_TIDAK_SAH, t: "s" };
            worksheet["L" + (i + 2)] = { v: data[i].TOTAL_SUARA, t: "s" };
            worksheet["M" + (i + 2)] = {
                v: data[i].HASIL_1,
                t: "s",
            };
            worksheet["N" + (i + 2)] = {
                v: data[i].HASIL_2,
                t: "s",
            };
            if (data[i].HASIL_3) {
                worksheet["O" + (i + 2)] = {
                    v: data[i].HASIL_3,
                    t: "s",
                };
            } else {
                worksheet["O" + (i + 2)] = { v: data[i].URL, t: "s" };
            }

            if (data[i].HASIL_4) {
                worksheet["P" + (i + 2)] = {
                    v: data[i].HASIL_4,
                    t: "s",
                };
            } else {
                worksheet["P" + (i + 2)] = { v: data[i].URL, t: "s" };
            }

            if (data[i].HASIL_5) {
                worksheet["Q" + (i + 2)] = {
                    v: data[i].HASIL_5,
                    t: "s",
                };
            } else {
                worksheet["Q" + (i + 2)] = { v: data[i].URL, t: "s" };
            }

            if (data[i].HASIL_6) {
                worksheet["R" + (i + 2)] = {
                    v: data[i].HASIL_6,
                    t: "s",
                };
            } else {
                worksheet["R" + (i + 2)] = { v: data[i].URL, t: "s" };
            }
            if (data[i].HASIL_7) {
                worksheet["S" + (i + 2)] = {
                    v: data[i].HASIL_7,
                    t: "s",
                };
            } else {
                worksheet["S" + (i + 2)] = { v: data[i].URL, t: "s" };
            }
            if (data[i].HASIL_8) {
                worksheet["T" + (i + 2)] = {
                    v: data[i].HASIL_8,
                    t: "s",
                };
            } else {
                worksheet["T" + (i + 2)] = { v: data[i].URL, t: "s" };
            }
            if (data[i].HASIL_9) {
                worksheet["U" + (i + 2)] = {
                    v: data[i].HASIL_9,
                    t: "s",
                };
            } else {
                worksheet["U" + (i + 2)] = { v: data[i].URL, t: "s" };
            }
        }
        existingFile.Sheets[sheetName] = worksheet;
        existingFile.SheetNames.push(sheetName);

        XLSX.writeFile(existingFile, fileName);
    } else {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);
        // Add a sheet name to the worksheet
        worksheet["!ref"] = worksheet["!ref"]; // Update the reference
        worksheet["!rel"] = sheetName.replace("PILKADA", ""); // Add the sheet name

        worksheet["A1"] = { v: "PILKADA", t: "s" };
        worksheet["B1"] = { v: "LEVEL", t: "s" };
        worksheet["C1"] = { v: "KABUPATEN/KOTA", t: "s" };
        worksheet["D1"] = { v: "KECAMATAN", t: "s" };
        worksheet["E1"] = { v: "KELURAHAN", t: "s" };
        worksheet["F1"] = { v: "TPS", t: "s" };
        worksheet["G1"] = { v: "PEMILIH", t: "s" };
        worksheet["H1"] = { v: "PENGGUNA_HAK", t: "s" };
        worksheet["I1"] = { v: "PARTISIPASI", t: "s" };
        worksheet["J1"] = { v: "SUARA_SAH", t: "s" };
        worksheet["K1"] = { v: "SUARA_TIDAK_SAH", t: "s" };
        worksheet["L1"] = { v: "TOTAL_SUARA", t: "s" };
        worksheet["M1"] = { v: "HASIL_1", t: "s" };
        worksheet["N1"] = { v: "HASIL_2", t: "s" };
        if (data[0].HASIL_3) {
            worksheet["O1"] = { v: "HASIL_3", t: "s" };
        } else {
            worksheet["O1"] = { v: "URL", t: "s" };
        }
        if (data[0].HASIL_4) {
            worksheet["P1"] = { v: "HASIL_4", t: "s" };
        } else {
            worksheet["P1"] = { v: "URL", t: "s" };
        }
        if (data[0].HASIL_5) {
            worksheet["Q1"] = { v: "HASIL_5", t: "s" };
        } else {
            worksheet["Q1"] = { v: "URL", t: "s" };
        }
        if (data[0].HASIL_6) {
            worksheet["R1"] = { v: "HASIL_6", t: "s" };
        } else {
            worksheet["R1"] = { v: "URL", t: "s" };
        }
        if (data[0].HASIL_7) {
            worksheet["S1"] = { v: "HASIL_6", t: "s" };
        } else {
            worksheet["S1"] = { v: "URL", t: "s" };
        }
        if (data[0].HASIL_8) {
            worksheet["T1"] = { v: "HASIL_6", t: "s" };
        } else {
            worksheet["T1"] = { v: "URL", t: "s" };
        }
        if (data[0].HASIL_9) {
            worksheet["U1"] = { v: "HASIL_6", t: "s" };
        } else {
            worksheet["U1"] = { v: "URL", t: "s" };
        }

        for (let i = 0; i < data.length; i++) {
            worksheet["A" + (i + 2)] = { v: data[i].PILKADA, t: "s" };
            worksheet["B" + (i + 2)] = { v: data[i].LEVEL, t: "s" };
            worksheet["C" + (i + 2)] = { v: data[i]["KABUPATEN_KOTA"], t: "s" };
            worksheet["D" + (i + 2)] = { v: data[i].KECAMATAN, t: "s" };
            worksheet["E" + (i + 2)] = { v: data[i].KELURAHAN, t: "s" };
            worksheet["F" + (i + 2)] = { v: data[i].TPS, t: "s" };
            worksheet["G" + (i + 2)] = { v: data[i].PEMILIH, t: "s" };
            worksheet["H" + (i + 2)] = { v: data[i].PENGGUNA_HAK, t: "s" };
            worksheet["I" + (i + 2)] = { v: data[i].PARTISIPASI, t: "s" };
            worksheet["J" + (i + 2)] = { v: data[i].SUARA_SAH, t: "s" };
            worksheet["K" + (i + 2)] = { v: data[i].SUARA_TIDAK_SAH, t: "s" };
            worksheet["L" + (i + 2)] = { v: data[i].TOTAL_SUARA, t: "s" };
            worksheet["M" + (i + 2)] = {
                v: data[i].HASIL_1,
                t: "s",
            };
            worksheet["N" + (i + 2)] = {
                v: data[i].HASIL_2,
                t: "s",
            };
            if (data[i].HASIL_3) {
                worksheet["O" + (i + 2)] = {
                    v: data[i].HASIL_3,
                    t: "s",
                };
            } else {
                worksheet["O" + (i + 2)] = { v: data[i].URL, t: "s" };
            }

            if (data[i].HASIL_4) {
                worksheet["P" + (i + 2)] = {
                    v: data[i].HASIL_4,
                    t: "s",
                };
            } else {
                worksheet["P" + (i + 2)] = { v: data[i].URL, t: "s" };
            }

            if (data[i].HASIL_5) {
                worksheet["Q" + (i + 2)] = {
                    v: data[i].HASIL_5,
                    t: "s",
                };
            } else {
                worksheet["Q" + (i + 2)] = { v: data[i].URL, t: "s" };
            }

            if (data[i].HASIL_6) {
                worksheet["R" + (i + 2)] = {
                    v: data[i].HASIL_6,
                    t: "s",
                };
            } else {
                worksheet["R" + (i + 2)] = { v: data[i].URL, t: "s" };
            }
            if (data[i].HASIL_7) {
                worksheet["S" + (i + 2)] = {
                    v: data[i].HASIL_7,
                    t: "s",
                };
            } else {
                worksheet["S" + (i + 2)] = { v: data[i].URL, t: "s" };
            }
            if (data[i].HASIL_8) {
                worksheet["T" + (i + 2)] = {
                    v: data[i].HASIL_8,
                    t: "s",
                };
            } else {
                worksheet["T" + (i + 2)] = { v: data[i].URL, t: "s" };
            }
            if (data[i].HASIL_9) {
                worksheet["U" + (i + 2)] = {
                    v: data[i].HASIL_9,
                    t: "s",
                };
            } else {
                worksheet["U" + (i + 2)] = { v: data[i].URL, t: "s" };
            }
        }

        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        XLSX.writeFile(workbook, fileName);
    }
};
