import { HardwareDevice, HardwareDeviceInterface } from '../libs/hardware_api';
import * as Q from 'q';
import { SerialPort, ReadLineParser } from 'WsSerialPortClient';

export interface ElfMiniInterface extends HardwareDeviceInterface {
  write(cmd:string) : Promise<any>;
}

export class ElfMini extends HardwareDevice implements ElfMiniInterface {
  private board!:SerialPort;
  private parser!:ReadLineParser;
  private sendFlag:boolean = false;
  private queue:any[] = [];
  private queueProcessInterval!:number;

  constructor() {
    super();
    SerialPort.initSocket('https://localhost:23321/sp'); // 这个是初始化 硬件助手的连接
    const hardware = this;
    hardware.boardModel = 'uno'; // 这个是 Arduino 的型号，如果提供有误，会导致硬件助手无法刷新成功
  }
  async reset() {
    const hardware = this;
    hardware.sendFlag = false;
    hardware.queue.length = 0;
  }
  destroy() {
    this.removeAllListeners();
  }
  private checkingFirmware() {
    const hardware = this;
    return new Promise((resolve, reject) => {
      const callback = (version:any) => {
        if (/\d+\.\d+\.\d+/g.exec(version)) {
          hardware.firmwareVersion = version;
        } else if (/\d+\.\d+/g.exec(version)) {
          hardware.firmwareVersion = `${version}.0`;
        } else if (/\d+/g.exec(version)) {
          hardware.firmwareVersion = `${version}.0.0`;
        }
        hardware.firmwareReady = true;
        resolve();
      };
      const retryQueryVersion = (delay:number, times:number) : Promise<any> => {
        return hardware.queryVersion()
        .then(callback)
        .catch((error:Error) => {
          if (times === 0) {
            reject(new Error('firmware'));
          } else {
            return Q.delay(delay)
            .then(() => retryQueryVersion(delay, times - 1));
          }
        });
      };
      retryQueryVersion(500, 4);
    });
  }
  private sendProcess() {
    let lock = false;
    this.queueProcessInterval = window.setInterval(() => {
      if (this.queue.length > 0 && !lock) {
        lock = true;
        const item = this.queue.shift();
        if (this.sendFlag) {
          this.sendSync(item.cmd, item.timeout).then(item.resolve).catch(item.reject).finally(() => lock = false);
        }
      }
    },                                             1);
  }
  private pushQueue(cmd:string, resolve:any, reject:any, timeout = 400) {
    this.checkconnectionStatePromise(reject);
    this.sendFlag = true;
    this.queue.push({cmd, resolve, reject, timeout});
  }
  private sendSync(cmd:string, timeout = 400) {
    return new Promise((resolve, reject) => {
      if (this.board) {
        if ((<any>window).CODEMAO_HARDWARE_DEBUG) {
          console.log('send: ', cmd);
        }
        const event = (line:string) => {
          if ((<any>window).CODEMAO_HARDWARE_DEBUG) {
            console.log('receive: ', line);
          }
          const val = line.split(' ').pop();
          if (val === 'OK') {
            resolve();
          } else if (val === 'true') {
            resolve(true);
          } else if (val === 'false') {
            resolve(false);
          } else {
            resolve(Number(val));
          }
          };
        this.board.write(cmd + '\r\n');
        this.parser.once('data', event);
        setTimeout(() => {
          reject(new Error('timeout'));
          this.parser.removeListener('data', event);
        },         timeout);
          // this.board.once('error', (err) => {
          //     reject(err);
          // });
      } else {
        reject(new Error('init_error'));
      }
    });
  }
  private initDevice(portName:string) {
    return new Promise((resolve, reject) => {
      const hardware = this;
      hardware.board = new SerialPort(portName, { baudRate: 115200 });
      hardware.parser = new SerialPort.parsers.Readline({ delimiter: '\r\n' });
      hardware.board.pipe(hardware.parser);
      hardware.board.once('open', () => {
        hardware.checkingFirmware().then(() => {
          hardware.emit('connected', hardware);
          hardware.connectionState = true;
          hardware.sendFlag = true;
          resolve();
        }).catch(reject);
      });
      hardware.board.once('error', (err:any) => {
        if ((<any>window).CODEMAO_HARDWARE_DEBUG) {
          console.log(err);
        }
        hardware.connectionState = false;
        reject(new Error('disconnected'));
      });
      hardware.board.once('close', () => {
        hardware.connectionState = false;
        clearInterval(hardware.queueProcessInterval);
        hardware.onDisconnect();
      });
      hardware.sendProcess();
    });
  }
  /**
   * 必须实现的函数
   * 这个函数的目标是
   */
  disconnect() {
    const hardware = this;
    hardware.queue.length = 0;
    return new Promise((resolve, reject) => {
      // hardware.checkServiceStatePromise(reject);
      try {
        hardware.board.close();
      } catch (e) {
        if ((<any>window).CODEMAO_HARDWARE_DEBUG) {
          console.log(e);
        }
      }
      hardware.loopCheckconnection(2000, false).then(() => {
        resolve();
        hardware.onDisconnect();
      }).catch(reject);
    });
  }
  write(cmd:string) {
    return new Promise((resolve, reject) => {
      this.pushQueue(cmd, resolve, reject);
    });
  }
  connect(device:string, options?:any) {
    const hardware = this;
    return new Promise((resolve, reject) => {
      // hardware.checkServiceStatePromise(reject);
      options = options || {};
      hardware.deviceName = device;
      hardware.initDevice(device).then(resolve).catch(reject);
    });
  }
  queryVersion() {
    const hardware = this;
    return new Promise((resolve, reject) => {
      const cmd = 'M5';
      hardware.sendSync(cmd, 400).then(resolve).catch(reject);
    });
  }
}