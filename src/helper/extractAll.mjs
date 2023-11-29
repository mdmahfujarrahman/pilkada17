export const extractData = async (page) => {
    await page.waitForSelector("#rekapHasilPilkada", {
        timeout: 80000,
    });
    await page.waitForSelector(".page-heading", {
        timeout: 80000,
    });

    const tableData = await page.evaluate(async () => {
        let KECAMATAN = "N/A";
        let KELURAHAN = "N/A";
        let TPS = "N/A";
        const heading = document.querySelector(".page-heading h1").innerText;

        const KABUPATENKOTA = document.querySelector(".page-heading ul");
        if (KABUPATENKOTA.querySelectorAll("a")?.length > 1) {
            debugger;
            if (KABUPATENKOTA.querySelectorAll("a")?.length === 2) {
                KECAMATAN = KABUPATENKOTA?.querySelectorAll(
                    "a"
                )[1]?.innerText.replace("Kab. ", "");
                debugger;
            } else if (KABUPATENKOTA.querySelectorAll("a")?.length === 3) {
                KECAMATAN = KABUPATENKOTA?.querySelectorAll(
                    "a"
                )[1]?.innerText.replace("Kab. ", "");
                KELURAHAN = KABUPATENKOTA?.querySelectorAll(
                    "a"
                )[2]?.innerText.replace("Kec. ", "");
            } else if (KABUPATENKOTA.querySelectorAll("a")?.length === 4) {
                KECAMATAN = KABUPATENKOTA?.querySelectorAll(
                    "a"
                )[1]?.innerText.replace("Kab. ", "");
                KELURAHAN = KABUPATENKOTA?.querySelectorAll(
                    "a"
                )[2]?.innerText.replace("Kec. ", "");
                TPS = KABUPATENKOTA?.querySelectorAll(
                    "a"
                )[3]?.innerText.replace("Kel. ", "");
            }
        }

        const tableHeadArray = [
            ...document.querySelectorAll("#rekapHasilPilkada thead tr"),
        ];
        const tableHead = [...tableHeadArray].map((item) => {
            const tableTH = item.querySelectorAll("th");
            return {
                LEVEL: tableTH[1]?.innerText.trim(),
            };
        });

        const tableBody = document.querySelector("#rekapHasilPilkada tbody");
        const rows = tableBody.getElementsByTagName("tr");

        const filterTr = Array.from(rows).filter((row) => {
            const allCells = row.querySelectorAll("td");
            const cellContent = allCells[0]?.innerText;
            const cellContent2 = allCells[2]?.innerText;
            return (
                /^\d+$/.test(cellContent) && cellContent2 !== "Data belum masuk"
            );
        });

        const handleHasil = (hasilData) => {
            let allData = {};
            const hasil = [...hasilData].map((item) => {
                const hasil = item.innerHTML
                    .split(":")[1]
                    ?.replace("]", "")
                    .trim();
                return hasil;
            });
            hasil.forEach((item, index) => {
                allData = {
                    ...allData,
                    [`HASIL_${index + 1}`]: item,
                };
            });
            return allData;
        };

        const allTd = [...filterTr].map((item) => {
            const allTde = item.querySelectorAll("td");
            const hasilTps = allTde[20]
                ?.querySelector("div > svg > g:nth-child(4)")
                ?.querySelectorAll("g > text");
            const hasilData = handleHasil(hasilTps);
            
            return {
                PILKADA: heading,
                LEVEL: tableHead[0].LEVEL,
                KABUPATEN_KOTA:
                    KECAMATAN === "N/A" ? allTde[1]?.innerText : KECAMATAN,
                KECAMATAN:
                    tableHead[0].LEVEL === "Kecamatan"
                        ? allTde[1]?.innerText
                        : tableHead[0].LEVEL === "Kelurahan"
                        ? KELURAHAN
                        : tableHead[0].LEVEL === "No TPS"
                        ? KELURAHAN
                        : KECAMATAN,
                KELURAHAN:
                    tableHead[0].LEVEL === "Kelurahan"
                        ? allTde[1]?.innerText
                        : tableHead[0].LEVEL === "No TPS"
                        ? TPS
                        : KELURAHAN,
                TPS:
                    tableHead[0].LEVEL === "No TPS"
                        ? allTde[1]?.innerText
                        : TPS,
                PEMILIH: allTde[4]?.innerText,
                PENGGUNA_HAK: allTde[6]?.innerText,
                PARTISIPASI: allTde[8]?.innerText,
                SUARA_SAH: allTde[13]?.innerText,
                SUARA_TIDAK_SAH: allTde[15]?.innerText,
                TOTAL_SUARA: allTde[17]?.innerText,
                ...hasilData,
                URL: allTde[1]?.querySelector("a")?.href,
            };
        });

        return {
            allTd,
        };
    });
    return tableData.allTd;
};
