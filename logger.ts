import * as express from 'express';
import stream from './logger/logStream';
import * as fs from 'fs';

export default () => {
  const outDirname = process.env.PWD + '/sutyLog'
  const outfileName = outDirname + '/log.csv'
  let logStream;
  let loggerActive = false;
  const logger = (url) => {
    logStream.write(url);
  }
  function initDir() {
    try {
      fs.mkdirSync(outDirname);
    } catch (err) {
      console.log(err);
    }
  }
  initDir();
  function stoplogger() {
    const time = new Date();
    const logReadStream = fs.createReadStream(outfileName);
    const logWriteStream = fs.createWriteStream(outfileName + time.getTime() + ".csv");
    logReadStream.pipe(logWriteStream);
  }
  function startlogger() {
    logStream = stream(outfileName)
  }
  return function middleware (req: express.Request, res: express.Response, next: express.NextFunction) {
    switch(req.url) {
      case '/suty/log': {
        const log = fs.createReadStream(outfileName);
        log.pipe(res);
        return
      }
      case '/suty/start': {
        loggerActive = true;
        startlogger();
        res.send('{ "suty": "start" }');
        return
      }
      case '/suty/stop': {
        loggerActive = false;
        stoplogger();
        res.send('{ "suty": "stop" }');
        return
      }
    }
    if(loggerActive) {
      logger(req.url);
    }
    next();
  }
}