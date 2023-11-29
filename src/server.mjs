import app from "./app.mjs";
import config from "./config/index.mjs";
import { handleElection } from "./handleElection.mjs";
import { bootstarp } from "./index.mjs";
import { logger } from "./logger/logger.mjs";

const main = async () => {
    try {
        app.listen(config.port, () => {
            handleElection();
            logger.InfoLogger.info(
                `Server is listening on port ${config.port}`
            );
        });
    } catch (error) {
        logger.errorLogger.error(error);
    }
};

main();
