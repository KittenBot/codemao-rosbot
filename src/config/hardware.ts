import { HardwareDevice, HardwareDeviceInterface } from '../libs/hardware_api';
import * as Q from 'q';
import { SerialPort, ReadLineParser } from 'WsSerialPortClient';
import { resolve } from 'url';

(<any>window).CODEMAO_HARDWARE_DEBUG = 1;

export interface RosbotInterface extends HardwareDeviceInterface {
  write(cmd:string) : Promise<any>;
}

export class Rosbot extends HardwareDevice implements RosbotInterface {
  private board!:SerialPort;
  private parser!:ReadLineParser;
  private reporter:any;

  constructor() {
    super();
    SerialPort.initSocket('https://localhost:23321/sp'); // 这个是初始化 硬件助手的连接
    const hardware = this;
    hardware.boardModel = 'uno'; // 这个是 Arduino 的型号，如果提供有误，会导致硬件助手无法刷新成功
    this.onmessage = this.onmessage.bind(this);
  }

  async reset() {

  }

  destroy() {
    this.removeAllListeners();
  }

  disconnect() {
    const hardware = this;
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

  private async checkingFirmware() {
    const hardware = this;
    for (let retry=0; retry<4; retry++){
      await new Promise(resolve => setTimeout(resolve, 500));
      await hardware.write('M0', (data:string) => {
        const val = data.split(' ');
        if (val[0] === 'M0'){
          hardware.firmwareVersion = val[2];
          hardware.firmwareReady = true;
        }
      })
      if (hardware.firmwareReady) return Promise.resolve();
    }
    return Promise.reject();
  }

  private onmessage (dataStr:string){
    if ((<any>window).CODEMAO_HARDWARE_DEBUG) {
      console.log('receive: ', dataStr);
    }
    if (this.reporter){
      clearTimeout(this.reporter.timeout);
      this.reporter.resolve(this.reporter.ondata(dataStr))
      this.reporter = null;
    }
  }

  private sendSync(cmd:string) {
    return new Promise((resolve, reject) => {
      if (this.board) {
        if ((<any>window).CODEMAO_HARDWARE_DEBUG) {
          console.log('send: ', cmd);
        }
        
        if (!cmd.endsWith('\n')) cmd += '\n';
        this.board.write(cmd);
        
      } else {
        reject(new Error('init_error'));
      }
    });
  }
  
  private initDevice(portName:string) {
    return new Promise((resolve, reject) => {
      const hardware = this;
      hardware.board = new SerialPort(portName, { baudRate: 115200 });
      hardware.parser = new SerialPort.parsers.Readline({ delimiter: '\n' });
      hardware.parser.once('data', hardware.onmessage);
      hardware.board.pipe(hardware.parser);
      hardware.board.once('open', () => {
        hardware.checkingFirmware().then(() => {
          hardware.emit('connected', hardware);
          hardware.connectionState = true;
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
        hardware.onDisconnect();
      });
    });
  }
  write(cmd:string, ondata?:any) {
    const hardware = this;
    return new Promise((resolve, reject) => {
      if (ondata){
        const timout = setTimeout(() => reject("write-timeout"), 2000)
        hardware.reporter = {resolve, ondata, timout};
        
      } else {
        resolve();
      }
      this.sendSync(cmd);
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
}



