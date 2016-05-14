class Log {
  time: number;
  arch: string;
  constructor() {
    this.time = new Date().getTime();
    this.arch = process.arch;
  }
  static getHeader() {
    return 'tiime,arch\n';
  }
  toCSV() {
    return `${this.time},${this.arch}\n`
  }
}

export default Log;
