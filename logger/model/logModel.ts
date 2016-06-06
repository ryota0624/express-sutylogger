import * as os from 'os';
class Log {
  time: number;
  arch: string;
  process: NodeJS.MemoryUsage;
  pid: number;
  loadavg;
  os;
  constructor(params) {
    this.time = new Date().getTime() - params.startTime;
    this.arch = process.arch;
    this.process = process.memoryUsage();
    this.loadavg = os.loadavg();
    this.os = {
      freemem: os.freemem(),
      totalmem: os.totalmem()
    }
    this.pid = process.pid;
  }
  static getHeader() {
    return 'time,pid,rss,processMemoryCur,processMemoryMax,pcMemoryCur,pcMemoryMax,loadAverage1,loadAverage5,loadAverage15\n';
  }
  setPid(pid) {
    this.pid = pid;
  }
  toCSV() {
    return `${this.time},${this.pid},${this.process.rss},${this.process.heapUsed},${this.process.heapTotal},${this.os.freemem},${this.os.totalmem},${this.loadavg[0]},${this.loadavg[1]},${this.loadavg[2]}\n`
  }
}

export default Log;
