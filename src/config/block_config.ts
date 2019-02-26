/**
 * 这个文件是模板以外的积木样式定义
 * @param blockly 
 * @param get_module_name_dropdown 
 */

export function get_custom_block_config(blockly: any, get_module_name_dropdown: Function) {
  return {
    'weeemake_elfmini_firmware_led_board': { //key 名必须与hardware_config中的block名字对应
      message0: '设置板载LED %1 电平状态 %2', // 消息体， %1 %2 是对应着 args0 中的顺序
      args0: [{
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('weeemake_elfmini_firmware_led_board'), // 这是必填项，用来绑定设备中的模块与积木选项，domain_function会根据这个拿到具体的接口数据
        },
        {
          type: 'field_dropdown', //这是一个field_dropdown类型，可以参照 https://developers.google.com/blockly/guides/create-custom-blocks/dropdown-menus
          name: 'status',
          options: [
            [blockly.Msg['hardware_high'], 'high'],
            [blockly.Msg['hardware_low'], 'low'],
          ],
        },
      ],
      previousStatement: true, // 这个是用来控制积木的上下连接选项
      nextStatement: true, // 这个是用来控制积木的上下连接选项
      colour: "#2cbfd8",
    },
    'weeemake_elfmini_firmware_led_segment': { //key 名必须与hardware_config中的 module_blocks 名字对应
      message0: '数码管 %1 显示 %2', // 消息体， %1 %2 是对应着 args0 中的顺序
      args0: [{
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('weeemake_elfmini_firmware_led_segment'), // 这是必填项，用来绑定设备中的模块与积木选项，domain_function会根据这个拿到具体的接口数据
        },
        {
          type: 'input_value', // 这是一个 input_value 类型，可以参照 https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks#block_inputs
          name: 'intensity',
          check: 'Number',
          align: 'CENTRE',
        },
      ],
      previousStatement: true, // 这个是用来控制积木的上下连接选项
      nextStatement: true, // 这个是用来控制积木的上下连接选项
      inputsInline: true,
      colour: "#2cbfd8",
    },
    'weeemake_elfmini_firmware_sound_sensor': {
      message0: '板载声音传感器 %1', // 消息体， %1 %2 是对应着 args0 中的顺序
      args0: [{
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('weeemake_elfmini_firmware_sound_sensor'), // 这是必填项，用来绑定设备中的模块与积木选项，domain_function会根据这个拿到具体的接口数据
        },
      ],
      colour: "#2cbfd8",
      output: 'Number', // 这是输出型的积木，输出的 类型有 Number, String, Boolean三种
    },
  }
}