import pt from "puppeteer";
import { electionsData } from "./data/election-data.mjs";
import errorHandler from "./errorHandler/errorHandler.mjs";
import { handleElection } from "./handleElection.mjs";
import { setTimeout } from "timers/promises";

export const bootstarp = async () => {
    const browser = await pt.launch({
        headless: false,
        slowMo: 100,
        defaultViewport: null,
        args: ["--start-maximized"],
    });
    const page = await browser.newPage();
    try {
        for (const election of electionsData) {
            handleElection(election, page, browser);
        }
    } catch (error) {
        errorHandler(error, "index.mjs");
    }
};
