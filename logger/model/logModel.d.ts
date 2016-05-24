declare class Log {
    time: number;
    arch: string;
    process: NodeJS.MemoryUsage;
    pid: number;
    loadavg: any;
    os: any;
    constructor();
    static getHeader(): string;
    toCSV(): string;
}
export default Log;
