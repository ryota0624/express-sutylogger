declare class Log {
    time: number;
    arch: string;
    process: NodeJS.MemoryUsage;
    pid: number;
    constructor();
    static getHeader(): string;
    toCSV(): string;
}
export default Log;
