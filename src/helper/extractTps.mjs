export const extractTps = async (page) => {
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
            console.log(allCells);
            const cellContent = allCells[0]?.innerText;
            const cellContent2 = allCells[1]?.innerText;
            return (
                /^\d+$/.test(cellContent) && cellContent2 !== "Data belum masuk"
            );
        });

        const handleHasil = (hasilData) => {
            console.log(hasilData);
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
            const hasilTps = allTde[19]
                ?.querySelector("div > svg > g:nth-child(4)")
                ?.querySelectorAll("g > text");
            const hasilData = handleHasil(hasilTps);
            return {
                PILKADA: heading,
                LEVEL: "NO TPS",
                KABUPATEN_KOTA: KECAMATAN,
                KECAMATAN: KELURAHAN,
                KELURAHAN: TPS,
                TPS: `TPS ${allTde[0]?.innerText}`,
                PEMILIH: allTde[3]?.innerText,
                PENGGUNA_HAK: allTde[5]?.innerText,
                PARTISIPASI: allTde[7]?.innerText,
                SUARA_SAH: allTde[12]?.innerText,
                SUARA_TIDAK_SAH: allTde[14]?.innerText,
                TOTAL_SUARA: allTde[16]?.innerText,
                ...hasilData,
                URL: allTde[0]?.querySelector("a")?.href,
            };
        });

        return {
            allTd,
        };
    });
    return tableData.allTd;
};
