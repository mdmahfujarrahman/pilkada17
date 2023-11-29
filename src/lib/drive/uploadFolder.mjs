import { Dropbox } from "dropbox";
import config from "../../config/index.mjs";
import fs from "fs";
import sendMail from "../sendEmail/sendMail.mjs";
import { logger } from "../../logger/logger.mjs";

const dbx = new Dropbox({ accessToken: config.dropboxAccessToken });

export default async function uploadFolder(folderPath, folderName) {
    try {
        const files = fs.readdirSync(folderPath);
        await dbx.filesCreateFolderV2({ path: `/${folderName}` });

        for (const file of files) {
            const filePath = `${folderPath}/${file}`;
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                await uploadFolder(filePath, `/${folderName}/${file}`);
            } else {
                const fileContents = fs.readFileSync(filePath);
                await dbx.filesUpload({
                    path: `/${folderName}/${file}`,
                    contents: fileContents,
                    mode: { ".tag": "overwrite" },
                });
            }
        }

        try {
            // delete folder after upload
            fs.rmdir(folderPath, { recursive: true }, (err) => {
                if (err) {
                    throw err;
                }
                sendMail(folderName);
            });
        } catch (error) {
            logger.errorLogger.error(error, "delete folder");
        }
    } catch (error) {
        logger.errorLogger.error(error, "uploadFolder");
    }
}
