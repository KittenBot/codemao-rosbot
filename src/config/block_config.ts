/**
 * 这个文件是模板以外的积木样式定义
 * @param blockly 
 * @param get_module_name_dropdown 
 */

const rosbotPin = [
  ['4', '4'],
  ['7', '7'],
  ['8', '8'],
  ['11', '11'],
  ['12', '12'],
  ['13', '13'],
  ['A0', 'A0'],
  ['A1', 'A1'],
  ['A2', 'A2'],
  ['A3', 'A3'],
  ['A4', 'A4'],
  ['A5', 'A5'],
  ['2', '2'],
  ['3', '3']
];

export function get_custom_block_config(blockly: any, get_module_name_dropdown: Function) {
  return {
    'kittenbot_rosbot_firmware_motor_run': {
      message0: '电机 %1 运动 %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'motor',
          options: [
            ['M1A', '0'],
            ['M1B', '1'],
            ['M2A', '2'],
            ['M2B', '3']
          ]
        },
        {
          type: 'input_value',
          name: 'SPEED',
          check: 'Number'
        }
      ],
      inputsInline: true,
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
      inputsInline: true,
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
      inputsInline: true,
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
      inputsInline: true,
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
      inputsInline: true,
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
    'kittenbot_rosbot_firmware_stepperline': {
      message0: '步进电机 直线 %1 CM',
      args0: [
        {
          type: 'input_value',
          name: 'DISTANCE',
          check: 'Number',
          align: 'CENTRE',
        },
      ],
      inputsInline: true,
      previousStatement: true,
      nextStatement: true,
      colour: "#DE5277",
    },
    'kittenbot_rosbot_firmware_stepperturn': {
      message0: '步进电机 转向 %1 °',
      args0: [
        {
          type: 'input_value',
          name: 'DEGREE',
          check: 'Number',
          align: 'CENTRE',
        },
      ],
      inputsInline: true,
      previousStatement: true,
      nextStatement: true,
      colour: "#DE5277",
    },
    'kittenbot_rosbot_firmware_stepperppm': {
      message0: '步进电机校准 脉冲/米 %1',
      args0: [
        {
          type: 'input_value',
          name: 'PPM',
          check: 'Number',
          align: 'CENTRE',
        },
      ],
      inputsInline: true,
      previousStatement: true,
      nextStatement: true,
      colour: "#DE5277",
    },
    'kittenbot_rosbot_firmware_stepperwheelbase': {
      message0: '步进电机校准 轮距 %1 米',
      args0: [
        {
          type: 'input_value',
          name: 'WHEELBASE',
          check: 'Number',
          align: 'CENTRE',
        },
      ],
      inputsInline: true,
      previousStatement: true,
      nextStatement: true,
      colour: "#DE5277",
    },
    'kittenbot_rosbot_firmware_stepperarc': {
      message0: '步进电机弧线 半径 %1 角度 %2',
      args0: [
        {
          type: 'input_value',
          name: 'RADIUS',
          check: 'Number',
          align: 'CENTRE',
        },
        {
          type: 'input_value',
          name: 'DEGREE',
          check: 'Number',
          align: 'CENTRE',
        }
      ],
      inputsInline: true,
      previousStatement: true,
      nextStatement: true,
      colour: "#DE5277",
    },
    'kittenbot_rosbot_firmware_rgb_bright': {
      message0: 'RGB 亮度 %1',
      args0: [
        {
          type: 'input_value',
          name: 'VALUE',
          check: 'Number',
          align: 'CENTRE',
        }
      ],
      inputsInline: true,
      previousStatement: true,
      nextStatement: true,
      colour: "#DE5277",
    },
    'kittenbot_rosbot_firmware_rgb_pick': {
      message0: 'RGB 引脚 %1 像素 %2 颜色 %3',
      args0: [
        {
          type: 'field_dropdown',
          name: 'PIN',
          options: rosbotPin,
        },
        {
          type: 'input_value',
          name: 'PIX',
          check: 'Number',
          align: 'CENTRE',
        },
        {
          type: 'input_value',
          name: 'COLOR',
          align: 'CENTRE'
        }
      ],
      inputsInline: true,
      previousStatement: true,
      nextStatement: true,
      colour: "#DE5277",
    },
    'kittenbot_rosbot_firmware_rgb_set': {
      message0: 'RGB 引脚 %1 像素 %2 红 %3 绿 %4 蓝 %5',
      args0: [
        {
          type: 'field_dropdown',
          name: 'PIN',
          options: rosbotPin,
        },
        {
          type: 'input_value',
          name: 'PIX',
          check: 'Number',
          align: 'CENTRE',
        },
        {
          type: 'input_value',
          name: 'RED',
          check: 'Number',
          align: 'CENTRE',
        },
        {
          type: 'input_value',
          name: 'GREEN',
          check: 'Number',
          align: 'CENTRE',
        },
        {
          type: 'input_value',
          name: 'BLUE',
          check: 'Number',
          align: 'CENTRE',
        }
      ],
      inputsInline: true,
      previousStatement: true,
      nextStatement: true,
      colour: "#DE5277",
    },
    'kittenbot_rosbot_firmware_rgb_off': {
      message0: 'RGB 引脚 %1 关闭',
      args0: [
        {
          type: 'field_dropdown',
          name: 'PIN',
          options: rosbotPin,
        }
      ],
      inputsInline: true,
      previousStatement: true,
      nextStatement: true,
      colour: "#DE5277",
    },
    'kittenbot_rosbot_firmware_servo_9g': {
      message0: '9g 舵机 引脚 %1 角度 %2 速度 %3',
      args0: [
        {
          type: 'field_dropdown',
          name: 'PIN',
          options: rosbotPin,
        },
        {
          type: 'input_value',
          name: 'DEGREE',
          check: 'Number',
          align: 'CENTRE',
        },
        {
          type: 'input_value',
          name: 'SPEED',
          check: 'Number',
          align: 'CENTRE',
        }
      ],
      inputsInline: true,
      previousStatement: true,
      nextStatement: true,
      colour: "#DE5277",
    },
    'kittenbot_rosbot_firmware_servo_geek': {
      message0: 'Geek 舵机 引脚 %1 角度 %2 速度 %3',
      args0: [
        {
          type: 'field_dropdown',
          name: 'PIN',
          options: rosbotPin,
        },
        {
          type: 'input_value',
          name: 'DEGREE',
          check: 'Number',
          align: 'CENTRE',
        },
        {
          type: 'input_value',
          name: 'SPEED',
          check: 'Number',
          align: 'CENTRE',
        }
      ],
      inputsInline: true,
      previousStatement: true,
      nextStatement: true,
      colour: "#DE5277",
    },
    'kittenbot_rosbot_firmware_servo_360': {
      message0: '360 舵机 引脚 %1 角度 %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'PIN',
          options: rosbotPin,
        },
        {
          type: 'input_value',
          name: 'DEGREE',
          check: 'Number',
          align: 'CENTRE',
        }
      ],
      inputsInline: true,
      previousStatement: true,
      nextStatement: true,
      colour: "#DE5277",
    },
  }
}