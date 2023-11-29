import nodemailer from "nodemailer";
import config from "../../config/index.mjs";
import { logger } from "../../logger/logger.mjs";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: config.email,
        pass: config.password,
    },
});

export default async function sendMail(election) {
    try {
        await transporter.sendMail({
            from: config.email,
            to: config.userEmail,
            subject: `Backup Successfull ${election}`,
            text: `${election}This elaction data has been backuped to dropbox, also delete from server`,
        });
    } catch (error) {
        logger.errorLogger.error(error, "sendMail");
    }
}
