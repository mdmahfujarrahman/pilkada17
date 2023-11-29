import errorHandler from "./errorHandler/errorHandler.mjs";
import { logger } from "./logger/logger.mjs";
import { consolidateData } from "./helper/converOneSheets.mjs";
import { exportData } from "./helper/exportData.mjs";
import { extractData } from "./helper/extractAll.mjs";
import { extractTps } from "./helper/extractTps.mjs";
import { setTimeout } from "timers/promises";

import pt from "puppeteer";
import { electionsData } from "./data/election-data.mjs";
import uploadFolder from "./lib/drive/uploadFolder.mjs";

export const handleElection = async () => {
    const browser = await pt.launch({
        headless: "new",
        slowMo: 100,
        // defaultViewport: null,
        args: ["--no-sandbox "],
    });
    const page = await browser.newPage();
    for (const election of electionsData) {
        try {
            await page.goto(election.link, {
                timeout: 150000,
            });
            const KABUPATEN = await extractData(page);
            exportData(
                KABUPATEN,
                election.provinsi,
                election.provinsi,
                true,
                election.serial
            );
            logger.InfoLogger.info(`Start ${election.provinsi}`);
            let i = 0;
            for (const kecamatan of KABUPATEN) {
                try {
                    await page.goto(kecamatan.URL, {
                        timeout: 150000,
                    });
                    const KECAMATAN = await extractData(page);
                    exportData(
                        KECAMATAN,
                        `sheet${i++}`,
                        election.provinsi,
                        false,
                        election.serial
                    );
                    for (const kelurahan of KECAMATAN) {
                        try {
                            await page.goto(kelurahan.URL, {
                                timeout: 150000,
                            });
                            const KELURAHAN = await extractData(page);
                            exportData(
                                KELURAHAN,
                                `sheet${i++}`,
                                election.provinsi,
                                false,
                                election.serial
                            );
                            for (const tps of KELURAHAN) {
                                try {
                                    await page.goto(tps.URL, {
                                        timeout: 150000,
                                    });
                                    const TPS = await extractTps(page);
                                    exportData(
                                        TPS,
                                        `sheet${i++}`,
                                        election.provinsi,
                                        false,
                                        election.serial
                                    );
                                    await setTimeout(3000); //
                                } catch (error) {
                                    errorHandler(
                                        error,
                                        `${
                                            tps.KABUPATEN_KOTA
                                        }-${tps.KECAMATAN.replace(
                                            " ",
                                            ""
                                        )}-${tps.KELURAHAN.replace(" ", "")}`
                                    );
                                }
                            }
                            await setTimeout(3000); //
                        } catch (error) {
                            errorHandler(
                                error,
                                `${
                                    kelurahan.KABUPATEN_KOTA
                                }-${kelurahan.KECAMATAN.replace(" ", "")}`
                            );
                        }
                    }
                } catch (error) {
                    errorHandler(
                        error,
                        `${kecamatan.KABUPATEN_KOTA}-kecamatan`
                    );
                }
            }
            consolidateData(election.provinsi, election.serial);
            uploadFolder(
                `./src/${election.serial}-${election.provinsi}`,
                `${election.serial}-${election.provinsi}`
            );
            await setTimeout(8000);
        } catch (error) {
            errorHandler(error, election.provinsi);
        }
        logger.InfoLogger.info(`Single Election End`);
    }
    logger.InfoLogger.info(`All Elections End`);
    await browser.close();
};
