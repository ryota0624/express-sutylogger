class Log {
  time: number;
  arch: string;
  process: NodeJS.MemoryUsage;
  pid: number;
  constructor() {
    this.time = new Date().getTime();
    this.arch = process.arch;
    this.process = process.memoryUsage();
    this.pid = process.pid;
  }
  static getHeader() {
    return 'pid,time,arch,rss,heap\n';
  }
  toCSV() {
    return `${String(this.pid)},${this.time},${this.arch},${this.process.rss},${this.process.heapUsed}/${this.process.heapTotal}\n`
  }
}

export default Log;
