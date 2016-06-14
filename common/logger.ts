import * as os from 'os';
import getCPU from './getcpu';
export function logging(args) {
  const pid = process.pid;
  const processMem = process.memoryUsage();
  const rss = processMem.rss;
  const heapTotal = processMem.heapTotal;
  const heapUsed = processMem.heapUsed;
  const osFreeMem = os.freemem();
  const osTotalMem = os.totalmem();
  const la = os.loadavg();
  return getCPU().then(cpu => {
    return `${pid},${args.time},${rss},${heapUsed},${heapTotal},${osFreeMem},${osTotalMem},${cpu.user},${cpu.system},${cpu.idle},${la[0]},${la[1]},${la[2]}\n`;
  });
}

export function logHeader() {
  return 'pid,time,rss,heapUsed,heapTotal,osFreeMem,osTotalMem,%CPU/user,%CPU/system,%CPU/idle,la/1min,la/5min,la/15min\n';
}