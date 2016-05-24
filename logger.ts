import * as express from 'express';
import stream from './logger/logStream';
import * as fs from 'fs';
import router from './common/router';

let logStream;
let loggerActive = false;

function startlogger(filename) {
  logStream = stream(filename);
}
function stoplogger(filename) {
  const time = new Date();
  const logReadStream = fs.createReadStream(filename);
  const logWriteStream = fs.createWriteStream(filename + time.getTime() + ".old");
  logReadStream.pipe(logWriteStream);
}
function logger(url) {
  logStream.write(url);
}

const log = (filename) => (req, res, next) => {
  const logStream = fs.createReadStream(filename);
  logStream.pipe(res);
}

const start = (filename) => (req, res, next) => {
  loggerActive = true;
  startlogger(filename);
}

const stop = (filename) => (req, res, next) => {
  loggerActive = false;
  stoplogger(filename);
}

const other = (req, res, next) => {
  if (loggerActive) {
    logger(req.url);
  }
}

export default (filename) => router({
  log: log(filename),
  start: start(filename),
  stop: stop(filename),
  other
});



const oldRouter = (outfileName: string) => {

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
    logStream = stream(outfileName);
  }
  return function middleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    switch (req.url) {
      case '/suty/log': {
        const log = fs.createReadStream(outfileName);
        log.pipe(res);
        return
      }
      case '/suty/start': {
        loggerActive = true;
        startlogger();
        res.send(true)
        return
      }
      case '/suty/stop': {
        loggerActive = false;
        stoplogger();
        res.send(true)
        return
      }
    }
    if (loggerActive) {
      logger(req.url);
    }
    next();
  }
}