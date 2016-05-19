import * as stream from 'stream';
import * as fs from 'fs';
import LogModel from './model/logModel';
class TestStream extends stream.Duplex {
  _read(size) {
  }
  _write(chunk, encoding, cb) {
    this.push(chunk);
    cb();
  }
}

export class LogStream extends stream.Transform {
  _transform(chunk, encoding, cb) {
    const log = new LogModel();
    this.push(log.toCSV());
    cb();
  }
}
const logStream = (filename: string) => {
  const writeStream = fs.createWriteStream(filename);
  const logStream = new LogStream();
  const testSt = new TestStream();
  logStream
    .pipe(testSt)
    .pipe(writeStream);
  writeStream.write(LogModel.getHeader());
  return logStream;
}

export default logStream;