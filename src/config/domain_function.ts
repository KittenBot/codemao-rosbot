import { ElfMini } from './hardware';
import { constrain, MAP } from '../libs/utils';

type GetHardwareType = (module_id: string) => ElfMini;
type GetModulePinsType = (module_id: string) => string;

export function get_functions(get_hardware:GetHardwareType, get_module_pins_value:GetModulePinsType) {
  return {
    weeemake_elfmini_firmware_led(args:any) { 
      // 必须与积木的KEY值一致
      // args是积木含有的参数值（对应着args0）
      const pins_data:any = get_module_pins_value(args.module_id);
      get_hardware(args.module_id).write(`M125 ${pins_data} ${args.status === 'high' ? 1 : 0}`);
    },
    weeemake_elfmini_firmware_led_board(args:any) {
      const pins_data:any = get_module_pins_value(args.module_id);
      get_hardware(args.module_id).write(`M119 ${pins_data} ${args.status === 'high' ? 1 : 0}`);
    },
    async weeemake_elfmini_firmware_pir_sensor(args:any) { // 如果是积木需要等待返回值，需要使用 async await 类型返回
      const pins_data:any = get_module_pins_value(args.module_id);
      return await get_hardware(args.module_id).write(`M7 2 ${pins_data}`); // 异步返回值
    },
    async weeemake_elfmini_firmware_light_sensor(args:any) {
      const x = await get_hardware(args.module_id).write('M8 21');
      return MAP(Number(x), 0, 1023, 0, 100); // 异步返回值
    },
    weeemake_elfmini_firmware_motor(args:any) {
      const pins_data:any = get_module_pins_value(args.module_id);
      const x = MAP(constrain(args.intensity, 0, 100), 0, 100, 0, 255);
      get_hardware(args.module_id).write(`M200 ${pins_data} ${x}`);
    },
    weeemake_elfmini_firmware_led_segment(args:any) {
      const pins_data:any = get_module_pins_value(args.module_id);
      const x = constrain(args.intensity, -999, 9999);
      get_hardware(args.module_id).write(`M123 ${pins_data} ${x}`);
    },
    async weeemake_elfmini_firmware_sound_sensor(args:any) {
      const x = await get_hardware(args.module_id).write('M11 17');
      return MAP(Number(x), 0, 1023, 0, 100); // 异步返回值
    }
  }
}