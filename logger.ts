import * as express from 'express';
import stream from './logger/logStream';
import * as fs from 'fs';
export default (outfileName: string) => {
  let logStream;
  const logger = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    logStream.write(req.url);
    next();
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
  return {
    logger,
    stoplogger,
    startlogger
  }
}