/* eslint-disable no-plusplus */
import { ResultModel } from './DataModel';

const encode = function (str: any, op: any) {
  const readInt = function (buffer: any, start: number, len: number) {
    let result = 0;
    for (let i = len - 1; i >= 0; i--) {
      result += 256 ** ((len - i - 1) * buffer[start + i]);
    }
    return result;
  };

  const writeInt = function (
    buffer: any,
    start: number,
    len: number,
    value: number
  ) {
    let i = 0;
    while (i < len) {
      buffer[start + i] = value / 256 ** (len - i - 1);
      i++;
    }
  };
  const textEncoder = new TextEncoder();
  const data = textEncoder.encode(str);
  const packetLen = 16 + data.byteLength;
  const header = [0, 0, 0, 0, 0, 16, 0, 1, 0, 0, 0, op, 0, 0, 0, 1];
  writeInt(header, 0, 4, packetLen);
  return new Uint8Array(header.concat(...data)).buffer;
};
const decode = function (blob: Blob) {
  const readInt = function (buffer: any, start: number, len: number) {
    let result = 0;
    for (let i = len - 1; i >= 0; i--) {
      result += 256 ** ((len - i - 1) * buffer[start + i]);
    }
    return result;
  };

  const writeInt = function (
    buffer: any,
    start: number,
    len: number,
    value: number
  ) {
    let i = 0;
    while (i < len) {
      buffer[start + i] = value / 256 ** (len - i - 1);
      i++;
    }
  };
  const textDecoder = new TextDecoder('utf-8');
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.onload = function (e: any) {
      const buffer = new Uint8Array(e.target.result);
      const result: ResultModel = {
        packetLen: 0,
        headerLen: 0,
        ver: 0,
        op: 0,
        seq: 0,
        body: undefined,
      };
      result.packetLen = readInt(buffer, 0, 4);
      result.headerLen = readInt(buffer, 4, 2);
      result.ver = readInt(buffer, 6, 2);
      result.op = readInt(buffer, 8, 4);
      result.seq = readInt(buffer, 12, 4);
      if (result.op === 5) {
        result.body = [];
        let offset = 0;
        while (offset < buffer.length) {
          const packetLen = readInt(buffer, offset + 0, 4);
          const headerLen = 16; // readInt(buffer,offset + 4,4)
          const data = buffer.slice(offset + headerLen, offset + packetLen);
          const body = textDecoder.decode(data);
          if (body) {
            result.body.push(JSON.parse(body));
          }
          offset += packetLen;
        }
      } else if (result.op === 3) {
        result.body = {
          count: readInt(buffer, 16, 4),
        };
      }
      resolve(result);
    };
    reader.readAsArrayBuffer(blob);
  });
};

export { decode, encode };
