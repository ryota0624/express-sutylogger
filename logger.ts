import * as express from 'express';
import stream from './logger/logStream';
export default (outfileName: string) => {
  const logStrem = stream(outfileName);
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    logStrem.write(req.url);
    next();
  }
}