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
  res.send({ logger: "start" });
}

const stop = (filename) => (req, res, next) => {
  loggerActive = false;
  stoplogger(filename);
  res.send({ logger: "stop" })
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