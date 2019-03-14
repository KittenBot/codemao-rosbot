type GetHardwareType = (module_id: string) => {write:Function};
type GetModulePinsType = (module_id: string) => string;

export function get_functions(get_hardware:GetHardwareType, get_module_pins_value:GetModulePinsType) {
  return {
    weeemake_elfmini_firmware_led1(args:any) { 
      const pins_data:any = get_module_pins_value(args.module_id);
      // 这里 write 的代码只是示例, 请自定义, 下同
      get_hardware(args.module_id).write(`M125 ${pins_data} test1 ${args.intensity} test2 ${args.message} ${args.status === 'high' ? 1 : 0}`);
    },
    async weeemake_elfmini_firmware_led2(args:any) {
      const pins_data:any = get_module_pins_value(args.module_id);
      return await get_hardware(args.module_id).write(`M125 ${pins_data}`);
    },
    async weeemake_elfmini_firmware_sound_sensor(args:any) {
      const pins_data:any = get_module_pins_value(args.module_id);
      return await get_hardware(args.module_id).write(`M7 2 ${pins_data}`);
    },
  }
}