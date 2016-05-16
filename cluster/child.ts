import * as express from 'express';
import * as fs from 'fs';

import { messageType } from './common'
import Log from '../logger/model/logModel';
export default (outfileName) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const log = new Log();
  switch(req.url) {
    case '/sutylog': {
      const log = fs.createReadStream(outfileName);
      log.pipe(res);
      return
    }
    case '/sutystart': {
      process.send({ type: messageType.on, log: log.toCSV() });
      res.send(true)
      return
    }
    case '/sutystop': {
      process.send({ type: messageType.off, log: log.toCSV() });
      res.send(true)
      return
    }
  }
  process.send({ type: messageType.log, log: log.toCSV() });
  next();
}
