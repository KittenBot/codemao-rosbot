/**
 * 这个文件是模板以外的积木样式定义
 * @param blockly 
 * @param get_module_name_dropdown 
 */

const motorIndex = [['M1A', '0'], ['M1B', '1'], ['M2A', '2'], ['M2B', '3']];

export function get_custom_block_config(blockly: any, get_module_name_dropdown: Function) {
  return {
    'kittenbot_rosbot_firmware_motor_run': {
      message0: '电机 %1 运动 %2',
      args0: [{
          type: 'field_dropdown',
          name: 'MOTOR',
          options: motorIndex
        },
        {
          type: 'input_value',
          name: 'SPEED',
          check: 'Number',
          align: 'CENTRE',
        }
      ],
      previousStatement: true,
      nextStatement: true,
      colour: "#DE5277",
    },
    'kittenbot_rosbot_firmware_motor_dual': {
      message0: '双电机 M1A %1 M1B %2',
      args0: [{
          type: 'input_value',
          name: 'SPDM1A',
          check: 'Number',
          align: 'CENTRE',
        },
        {
          type: 'input_value',
          name: 'SPDM1B',
          check: 'Number',
          align: 'CENTRE',
        }
      ],
      previousStatement: true,
      nextStatement: true,
      colour: "#DE5277",
    },
    'kittenbot_rosbot_firmware_motor_dual_delay': {
      message0: '双电机 M1A %1 M1B %2 延时 %3',
      args0: [{
          type: 'input_value',
          name: 'SPDM1A',
          check: 'Number',
          align: 'CENTRE',
        },
        {
          type: 'input_value',
          name: 'SPDM1B',
          check: 'Number',
          align: 'CENTRE',
        },
        {
          type: 'input_value',
          name: 'DELAY',
          check: 'Number',
          align: 'CENTRE',
        }
      ],
      previousStatement: true,
      nextStatement: true,
      colour: "#DE5277",
    },
    'kittenbot_rosbot_firmware_motor_quad': {
      message0: '四电机 M1A %1 M1B %2 M2A %3 M2B %4',
      args0: [{
          type: 'input_value',
          name: 'SPDM1A',
          check: 'Number',
          align: 'CENTRE',
        },
        {
          type: 'input_value',
          name: 'SPDM1B',
          check: 'Number',
          align: 'CENTRE',
        },
        {
          type: 'input_value',
          name: 'SPDM2A',
          check: 'Number',
          align: 'CENTRE',
        },
        {
          type: 'input_value',
          name: 'SPDM2B',
          check: 'Number',
          align: 'CENTRE',
        }
      ],
      previousStatement: true,
      nextStatement: true,
      colour: "#DE5277",
    },
    'kittenbot_rosbot_firmware_motor_omni': {
      message0: '全向轮 水平 %1 垂直 %2 旋转 %3',
      args0: [{
          type: 'input_value',
          name: 'SPDX',
          check: 'Number',
          align: 'CENTRE',
        },
        {
          type: 'input_value',
          name: 'SPDY',
          check: 'Number',
          align: 'CENTRE',
        },
        {
          type: 'input_value',
          name: 'SPDR',
          check: 'Number',
          align: 'CENTRE',
        }
      ],
      previousStatement: true,
      nextStatement: true,
      colour: "#DE5277",
    },
    'kittenbot_rosbot_firmware_motor_stop': {
      message0: '电机停止',
      args0: [],
      previousStatement: true,
      nextStatement: true,
      colour: "#DE5277",
    },
  }
}