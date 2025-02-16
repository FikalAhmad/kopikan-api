import { logger } from "./application/logging";
import { web } from "./application/web";

web.listen(4000, () => {
  logger.info("Listening on port 4000");
});
