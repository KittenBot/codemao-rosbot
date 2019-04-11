/**
 * 这个文件是模板以外的积木样式定义
 * @param blockly 
 * @param get_module_name_dropdown 
 */

export function get_custom_block_config(blockly: any, get_module_name_dropdown: Function) {
  return {
    'kittenbot_rosbot_firmware_led_board': { // hardware_config.json中的block名
      message0: '设置板载LED %1 电平状态 数字输入 %2 字符串输入 %3 下拉选项 %4', // 消息体， %1 %2 %3 %4是对应 args0 中的变量顺序
      args0: [{
          type: 'field_dropdown', // 参照 https://developers.google.com/blockly/guides/create-custom-blocks/dropdown-menus
          name: 'module_id',
          options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_led_board'), // 用来绑定模块与下拉选项，domain_function会根据这个拿到具体的接口数据, 必须返回一个[展示名, 对应真实code]的数组, 即[string, string][]
        },
        {
          type: 'input_value', // 参照 https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks#block_inputs
          name: 'intensity',
          check: 'Number', // 过滤输入类型
          align: 'CENTRE', // 是否居中
        },
        {
          type: 'input_value',
          name: 'message',
          check: 'String',
          align: 'CENTRE',
        },
        {
          type: 'field_dropdown',
          name: 'status',
          options: [
            ['高', 'high'],
            ['低', 'low']
          ]
        }
      ],
      previousStatement: true, // 这个是用来控制积木的上连接选项
      nextStatement: true, // 这个是用来控制积木的下连接选项
      colour: "#2cbfd8", // 积木的色值
    },
    'kittenbot_rosbot_firmware_sound_sensor': {
      message0: '板载声音传感器 %1',
      args0: [{
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_sound_sensor'), // 这是必填项，用来绑定设备中的模块与积木选项，domain_function会根据这个拿到具体的接口数据
        },
      ],
      colour: "#2cbfd8",
      output: 'Number', // 这是输出型的积木，输出的 类型有 Number, String, Boolean三种
    },
  }
}