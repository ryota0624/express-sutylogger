import * as express from 'express';
import * as fs from 'fs';

import { messageType } from './common'
import Log from '../logger/model/logModel';
export default () => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const outDirname = process.env.PWD + '/sutyLog';
  const outfileName = outDirname + '/log.csv';
  const log = new Log();
    function initDir() {
    try {
      fs.mkdirSync(outDirname);
    } catch (err) {
      console.log(err);
    }
  }
  initDir();
  switch(req.url) {
    case '/suty/log': {
      const log = fs.createReadStream(outfileName);
      log.pipe(res);
      return
    }
    case '/suty/start': {
      process.send({ type: messageType.on, log: log.toCSV() });
      res.send(true)
      return
    }
    case '/suty/stop': {
      process.send({ type: messageType.off, log: log.toCSV() });
      res.send(true)
      return
    }
  }
  process.send({ type: messageType.log, log: log.toCSV() });
  next();
}
