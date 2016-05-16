import * as express from 'express';
import stream from './logger/logStream';
import * as fs from 'fs';

export default (outfileName: string) => {
  let logStream;
  let loggerActive = false;
  const logger = (url) => {
    logStream.write(url);
  }
  function stoplogger() {
    const time = new Date();
    const logReadStream = fs.createReadStream(outfileName);
    const logWriteStream = fs.createWriteStream(outfileName + time.getTime() + ".old");
    logReadStream.pipe(logWriteStream);
  }
  function startlogger() {
    logStream = stream(outfileName)
  }
  return function middleware (req: express.Request, res: express.Response, next: express.NextFunction) {
    switch(req.url) {
      case '/sutylog': {
        const log = fs.createReadStream(outfileName);
        log.pipe(res);
        return
      }
      case '/sutystart': {
        loggerActive = true;
        startlogger();
        res.send(true)
        return
      }
      case '/sutystop': {
        loggerActive = false;
        stoplogger();
        res.send(true)
        return
      }
    }
    if(loggerActive) {
      logger(req.url);
    }
    next();
  }
}