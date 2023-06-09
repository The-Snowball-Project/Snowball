import * as express from 'express';
import logger from "./util/logger";

const app = express();
const port: string = process.env.PORT || "3000";
app.use(express.static(__dirname + '/public'));
app.listen(port, () => {
  logger.info(`testing listening on port ${port}`)
})
