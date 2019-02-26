import { EventEmitter } from 'events';
import * as semver from 'semver';

export interface HardwareDeviceInterface extends EventEmitter {
  loopCheckconnection(timeout:number, reverse:boolean) : Promise<any>;
  reset() : void;
  destroy() : void;
  connect(device:string, options?:any) : Promise<any>;
  disconnect() : Promise<any>;
  checkconnectionState() : void;
}

export abstract class HardwareDevice extends EventEmitter implements HardwareDeviceInterface{
  protected boardModel!: string;
  protected connectionState:boolean = false;
  protected firmwareReady:boolean = false;
  protected connectionType!:string;
  protected deviceName!:string;
  protected firmwareVersion!:string;
  protected onlineFirmwareInfo:any;

  constructor() {
    super();
    const hardware = this;
    hardware.connectionState = false;
    hardware.firmwareReady = false;
    hardware.connectionType = '';
    hardware.deviceName = '';
    // hardware.fetchFirmwareInfo();
  }

  loopCheckconnection(timeout:number, reverse:boolean) {
    const hardware = this;
    timeout = timeout || 5000;
    let count = 0;
    return new Promise((resolve, reject) => {
      const trigger = setInterval(() => {
        if (count >= timeout) {
          clearInterval(trigger);
          reject();
        }
        if (hardware.connectionState && !reverse) {
          clearInterval(trigger);
          resolve();
        } else if (!hardware.connectionState && reverse) {
          clearInterval(trigger);
          resolve();
        }
        count += 100;
      },                          100);
    });
  }

  abstract reset() : void;
  abstract destroy() : void;
  abstract connect(device:string, options?:any) : Promise<any>;
  abstract disconnect() : Promise<any>;

  onDisconnect() {
    const hardware = this;
    hardware.connectionState = false;
    hardware.firmwareReady = false;
    hardware.connectionType = '';
    hardware.deviceName = '';
    hardware.emit('disconnected', this);
  }

  checkconnectionState() {
    const hardware = this;
    if (!hardware.firmwareReady) {
      throw new Error('firmware');
    }
  }

  checkconnectionStatePromise(reject:any) {
    const hardware = this;
    if (!hardware.firmwareReady) {
      reject(new Error('firmware'));
    }
  }

  checkForUpdates() {
    const hardware = this;
    if (hardware.onlineFirmwareInfo) {
      return semver.lt(hardware.firmwareVersion, hardware.onlineFirmwareInfo.version);
    } else {
      return false;
    }
  }

  // fetchFirmwareInfo() {
  //   const hardware = this;
  //   return new Promise((resolve, reject) => {
  //     $.getJSON(URL.resolve(hardware.configURL, `config.json?v=${Math.random()}`), (data:any) => {
  //       hardware.onlineFirmwareInfo = data[hardware.hardwareType];
  //       resolve(data[hardware.hardwareType]);
  //     }).fail(reject);
  //   });
  // }

  // fetchFirmwareHexData() : Promise<string> {
  //   const hardware = this;
  //   return new Promise((resolve, reject) => {
  //     if (hardware.onlineFirmwareInfo) {
  //       $.get(URL.resolve(hardware.configURL, hardware.onlineFirmwareInfo.name), (data:string) => {
  //         if (md5(data) === hardware.onlineFirmwareInfo.hash) {
  //           resolve(data);
  //         } else {
  //           reject('md5 not correct');
  //         }
  //       }).fail(reject);
  //     } else {
  //       hardware.fetchFirmwareInfo().then(() => {
  //         $.get(URL.resolve(hardware.configURL, hardware.onlineFirmwareInfo.name), (data:string) => {
  //           if (md5(data) === hardware.onlineFirmwareInfo.hash) {
  //             hardware.hex_data = data;
  //             resolve(data);
  //           } else {
  //             reject('md5 not correct');
  //           }
  //         }).fail(reject);
  //       }).catch(reject);
  //     }
  //   });
  // }

  // installFirmware(options?:any) {
  //   const hardware = this;
  //   options = options || {};
  //   options.deviceName = options.deviceName || hardware.deviceName;
  //   options.progressCallback = options.progressCallback || (() => {});
  //   options.verboseCallback = options.verboseCallback || (() => {});
  //   options.connectDelay = options.connectDelay || 3000;
  //   return new Promise((resolve, reject) => {
  //     const cb = () => {
  //       const _verboseCallback = (message:string) => {
  //         if ((<any>window).CODEMAO_HARDWARE_DEBUG) {
  //           console.log(message);
  //         }
  //         options.verboseCallback(message);
  //       };
  //       SerialPort.sps.socket.once('firmware-done', (err:any) => {
  //         SerialPort.sps.socket.removeListener('firmware-debug', _verboseCallback);
  //         SerialPort.sps.socket.removeListener('firmware-progress', options.progressCallback);
  //         if (err) {
  //           console.error('flash error: ', err);
  //           reject(err);
  //         } else {
  //           hardware.connect(options.deviceName).then(resolve).catch(reject);
  //         }
  //       });
  //       SerialPort.sps.socket.on('firmware-debug', _verboseCallback);
  //       SerialPort.sps.socket.on('firmware-progress', options.progressCallback);
  //       const flash_hex = (hex:string) => {
  //         SerialPort.sps.socket.emit('firmware-flash', 'arduino', {
  //           port: options.deviceName,
  //           boardModel: hardware.boardModel,
  //           firmwareHEX: hex,
  //         });
  //       };
  //       if (hardware.hex_data) {
  //         if ((<any>window).CODEMAO_HARDWARE_DEBUG) {
  //           console.log('flash with loaded data...');
  //         }
  //         flash_hex(hardware.hex_data);
  //       } else {
  //         hardware.fetchFirmwareHexData().then((hex:string) => {
  //           flash_hex(hex);
  //         }).catch(() => reject(new Error('network')));
  //       }
  //     };
  //     hardware.reset();
  //     hardware.disconnect().then(cb).catch(cb);
  //   });
  // }

}
