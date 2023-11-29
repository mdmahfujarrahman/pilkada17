import pt from "puppeteer";
import { extractData } from "./helper/extractAll.mjs";
import { logger } from "../logger/logger.mjs";
import { extractTps } from "./helper/extractTps.mjs";
const run = async () => {
    const browser = await pt.launch({
        headless: false,
        slowMo: 100,
        defaultViewport: null,
        args: ["--start-maximized"],
    });
    const page = await browser.newPage();
    try {
        await page.goto(
            "https://pilkada2017.kpu.go.id/hasil/t1/aceh/aceh_tenggara/bambel",
            {
                timeout: 150000,
            }
        );

        const KABUPATEN = await extractData(page);
        // const TPS = await extractTps(page);
        console.log(KABUPATEN);
    } catch (error) {
        logger.errorLogger.error(error, "featureTest.mjs");
    }
};

run();
