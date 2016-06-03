import * as express from 'express';
import * as fs from 'fs';
import route from '../common/router';
import { messageType } from './common'
import Log from '../logger/model/logModel';
let startTime = null;
const log = (filename) => (req, res, next) => {
  const logStream = fs.createReadStream(filename);
  logStream.pipe(res);
}

const start = (req, res, next) => {
  startTime = new Date().getTime();
  process.send({ type: messageType.on });
  res.send({ logger: "start" });
}

const stop = (req, res, next) => {
  process.send({ type: messageType.off });
  res.send({ logger: "stop" })
}

const other = (req, res, next) => {
  const log = new Log({ startTime });
  process.send({ type: messageType.log, log: log.toCSV() });
}

export default (fiilename) => route({
  start,
  stop,
  log: log(fiilename),
  other
});
