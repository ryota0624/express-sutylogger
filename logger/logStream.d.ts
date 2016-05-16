import * as stream from 'stream';
export declare class LogStream extends stream.Transform {
    _transform(chunk: any, encoding: any, cb: any): void;
}
declare const makeStream: (filename: string) => LogStream;
export default makeStream;
