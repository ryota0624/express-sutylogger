import * as fs from 'fs';
import * as cluster from 'cluster';
import { messageType } from './common';
import Log from '../logger/model/logModel';
let startTime = null;

const parentLogger = (filename: string) =>  (workers: Array<cluster.Worker>) => {
  let logStream = fs.createWriteStream(filename);
  logStream.write(Log.getHeader());
  const cluster = require('cluster');
  let loggerActive = false;
  for (var id in workers) {
    workers[id].on("message", (data) => {
      switch (data.type) {
        case messageType.log: {
          if (loggerActive) {
            const log = new Log({ startTime });
            log.setPid(data.pid);
            logStream.write(log.toCSV());
          }
          break;
        }
        case messageType.on: {
          startTime = new Date().getTime();
          loggerActive = true;
          logStream = fs.createWriteStream(filename);
          logStream.write(Log.getHeader());
          break;
        }
        case messageType.off: {
          loggerActive = false;
          const time = new Date();
          const logReadStream = fs.createReadStream(filename);
          const oldlogStream = fs.createWriteStream(filename + time.getTime() + ".old");
          logReadStream.pipe(oldlogStream);
          break;
        }
      }
    });
  }
}

export default parentLogger;