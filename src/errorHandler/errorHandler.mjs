import { logger } from "../logger/logger.mjs";

const errorHandler = (error, fileName) => {
    const stackLines = error.stack.split("\n");
    stackLines.shift();
    const stackTrace = stackLines.join("\n");
    const formattedError = {
        message: error.message,
        stack: stackTrace,
    };
    const errors = JSON.stringify(formattedError, null, 2);
    logger.errorLogger.error(`Error in ${fileName}: ${errors}`);
};

export default errorHandler;
