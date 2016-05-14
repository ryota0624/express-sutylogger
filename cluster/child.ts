import * as express from 'express';
import { messageType } from './common'
import Log from '../logger/model/logModel';
export default () => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const log = new Log();
  process.send({ type: messageType, log: log.toCSV() });
  next();
}
