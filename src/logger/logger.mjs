import { createLogger, format, transports } from "winston";
import path from "path";
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hour >= 12 ? "pm" : "am";
    const time = `${hour}:${minutes}:${seconds} ${ampm}`;
    return `${date.toDateString()} ${time} [${label}] ${level}: ${message}`;
});

const today = new Date().toISOString().slice(0, 10);

const InfoLogger = createLogger({
    level: "info",
    format: combine(label({ label: "pilkada" }), timestamp(), myFormat),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: path.join(
                process.cwd(),
                "src",
                "logs",
                "info",
                `pilkada-${today}-info.log`
            ),
            level: "info",
        }),
    ],
});
const GitInfoLogger = createLogger({
    level: "info",
    format: combine(label({ label: "git Automation" }), timestamp(), myFormat),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: path.join(
                process.cwd(),
                "src",
                "logs",
                "info",
                `gitauto-${today}-info.log`
            ),
            level: "info",
        }),
    ],
});

const errorLogger = createLogger({
    level: "error",
    format: combine(label({ label: "pilkada" }), timestamp(), myFormat),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: path.join(
                process.cwd(),
                "src",
                "logs",
                "error",
                `pilkada-${today}-error.log`
            ),
            level: "error",
        }),
    ],
});

export const logger = {
    InfoLogger,
    errorLogger,
    GitInfoLogger,
};
