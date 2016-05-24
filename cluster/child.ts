import * as express from 'express';
import * as fs from 'fs';
import route from '../common/router';
import { messageType } from './common'
import Log from '../logger/model/logModel';

const log = (filename) => (req, res, next) => {
  const logStream = fs.createReadStream(filename);
  logStream.pipe(res);
}

const stop = (req, res, next) => {
  const log = new Log();
  process.send({ type: messageType.off, log: log.toCSV() });
  res.send(true);
}

const start = (req, res, next) => {
  const log = new Log();
  process.send({ type: messageType.on, log: log.toCSV() });
  res.send(true);
}

const other = (req, res, next) => {
  const log = new Log();
  process.send({ type: messageType.log, log: log.toCSV() });
}

export default (fiilename) => route({
  start,
  stop,
  log: log(fiilename),
  other
});
