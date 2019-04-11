type GetHardwareType = (module_id: string) => {write:Function};
type GetModulePinsType = (module_id: string) => string;

function timeout(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function parseCmd (msg:string) {
  let tmp = msg.trim().split(' ');
  tmp = tmp.filter(n => n !== '');
  if (tmp[0].indexOf('M100') > -1 || tmp[0].indexOf('M101') > -1 ||
      tmp[0].indexOf('M102') > -1 || tmp[0].indexOf('M103') > -1){
      return undefined;
  } else if (tmp[0].indexOf('M3') > -1){
      return parseInt(tmp[2], 10);
  } else if (tmp[0].indexOf('M5') > -1){
      return parseInt(tmp[2], 10);
  } else if (tmp[0].indexOf('M10') > -1){
      return parseInt(tmp[2], 10);
  } else if (tmp[0].indexOf('M20') > -1){
      return undefined;
  } else if (tmp[0].indexOf('M222') > -1){
      return parseInt(tmp[1], 10);
  } else if (tmp[0].indexOf('M8') > -1){
      return parseFloat(tmp[1]);
  } else if (tmp[0].indexOf('M214') > -1){
      return parseFloat(tmp[1]);
  } else if (tmp[0].indexOf('M215') > -1){
      return parseFloat(tmp[1]);
  } else if (tmp[0].indexOf('M218') > -1){
      return parseInt(tmp[1], 10);
  } else if (tmp[0].indexOf('M217') > -1){
      return tmp[1];
  } else if (tmp[0].indexOf('M221') > -1){
      return tmp[1];
  } else if (tmp[0].indexOf('M250') > -1){
      return tmp[1];
  }
}

export function get_functions(get_hardware:GetHardwareType, get_module_pins_value:GetModulePinsType) {
  return {
    kittenbot_rosbot_firmware_motor_run(args:any, id:any, targetid:any, util:any) {
      // console.log("morot run", args, id, targetid, util);
      get_hardware(args.module_id).write(`M200 ${args.MOTOR} ${Math.floor(args.SPEED)}\n`);
    },
    kittenbot_rosbot_firmware_motor_dual(args:any) {
      get_hardware(args.module_id).write(`M204 ${Math.floor(args.SPDM1A)} ${Math.floor(args.SPDM1B)} 0\n`);
    },
    async kittenbot_rosbot_firmware_motor_dual_delay(args:any) {
      get_hardware(args.module_id).write(`M204 ${Math.floor(args.SPDM1A)} ${Math.floor(args.SPDM1B)} ${args.DELAY}\n`);
      await timeout(args.DELAY);
    },
    kittenbot_rosbot_firmware_motor_quad(args:any) {
      get_hardware(args.module_id).write(`M205 ${Math.floor(args.SPDM1A)} ${Math.floor(args.SPDM1B)} ${Math.floor(args.SPDM2A)} ${Math.floor(args.SPDM2B)}\n`);
    },
    kittenbot_rosbot_firmware_motor_omni(args:any) {
      get_hardware(args.module_id).write(`M209 ${Math.floor(args.SPDX)} ${Math.floor(args.SPDY)} ${Math.floor(args.SPDR)}\n`);
    },
    kittenbot_rosbot_firmware_motor_stop(args:any) {
      get_hardware(args.module_id).write(`M203\n`);
    },
    async kittenbot_rosbot_firmware_stepperline(args:any){
      await get_hardware(args.module_id).write(`M101 ${args.DISTANCE}\n`, () => {});
    },
    async kittenbot_rosbot_firmware_stepperturn(args:any){
      await get_hardware(args.module_id).write(`M102 ${args.DEGREE}\n`, () => {});
    },
    kittenbot_rosbot_firmware_stepperppm(args:any){
      get_hardware(args.module_id).write(`M104 ${args.PPM}\n`);
    },
    kittenbot_rosbot_firmware_stepperwheelbase(args:any){
      get_hardware(args.module_id).write(`M105 ${args.WHEELBASE}\n`);
    },
    async kittenbot_rosbot_firmware_stepperarc(args:any){
      await get_hardware(args.module_id).write(`M103 ${args.RADIUS} ${args.DEGREE}\n`, ()=>{});
    },
    // todo: how to get pin instance
    kittenbot_rosbot_firmware_digitalwrite(args:any){
      console.log("digi write", args);
      get_hardware(args.module_id).write(`M2 ${ args.PIN } ${ args.VALUE}\n`);
    },
    kittenbot_rosbot_firmware_analogwrite(args:any){
      console.log("analog write", args);
      get_hardware(args.module_id).write(`M4 ${ args.PIN } ${ args.VALUE}\n`);
    },

    async kittenbot_rosbot_firmware_buzzer(args:any){
      get_hardware(args.module_id).write(`M6 ${args.PIN} ${args.FREQ } ${args.DURATION }\n`);
      await timeout(args.DURATION);
    },
    async kittenbot_rosbot_firmware_ping(args:any){
      await get_hardware(args.module_id).write(`M250 ${args.PIN} 99\n`, (ret:string) => (parseCmd(ret)));
    },
    async kittenbot_rosbot_firmware_voltage(args:any){
      await get_hardware(args.module_id).write(`M8 \n`, (ret:string) => (parseCmd(ret)));
    },
    kittenbot_rosbot_firmware_rgb_bright(args:any){
      get_hardware(args.module_id).write(`M11 ${args.VALUE}\n`);
    },
    kittenbot_rosbot_firmware_rgb_pick(args:any){
      console.log("color pick ", args);
      const color = {r:0, g:0, b:0};
      get_hardware(args.module_id).write(`M9 ${args.PIN} ${args.PIX} ${color.r} ${color.g} ${color.b}\r\n`);
    },
    kittenbot_rosbot_firmware_rgb_set(args:any){
      get_hardware(args.module_id).write(`M9 ${args.PIN} ${args.PIX} ${args.RED} ${args.GREEN} ${args.BLUE}\r\n`);
    },
    kittenbot_rosbot_firmware_rgb_off(args:any){
      get_hardware(args.module_id).write(`M9 ${args.PIN} 0 0 0 0\n`);
    },
    

  }
}