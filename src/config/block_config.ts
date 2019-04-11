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

const joystickAxis = [
  ['L-X', '7'],
  ['L-Y', '8'],
  ['R-X', '5'],
  ['R-Y', '6']
];

const joystickButton = [
  ['↑', '11'],
  ['↓', '12'],
  ['←', '10'],
  ['▲', '13'],
  ['●', '14'],
  ['×', '15'],
  ['■', '16'],
  ['L2', '19'],
  ['R2', '20'],
  ['L1', '17'],
  ['R1', '18']
];

export function get_custom_block_config(blockly: any, get_module_name_dropdown: Function) {
  return {
    'kittenbot_rosbot_firmware_motor_run': {
      message0: '%1 电机 %2 运动 %3',
      args0: [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_motor_run'),
        },
        {
          type: 'field_dropdown',
          name: 'MOTOR',
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
      message0: '%1 双电机 M1A %2 M1B %3',
      args0: [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_motor_dual'),
        },
        {
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
      message0: '%1 双电机 M1A %2 M1B %3 延时 %4',
      args0: [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_motor_dual_delay'),
        },{
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
      message0: '%1 四电机 M1A %2 M1B %3 M2A %4 M2B %5',
      args0: [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_motor_quad'),
        },{
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
      message0: '%1 全向轮 水平 %2 垂直 %3 旋转 %4',
      args0: [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_motor_omni'),
        },{
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
      message0: '%1 电机停止',
      args0: [{
        type: 'field_dropdown',
        name: 'module_id',
        options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_motor_stop'),
      }],
      previousStatement: true,
      nextStatement: true,
      colour: "#DE5277",
    },
    'kittenbot_rosbot_firmware_stepperline': {
      message0: '%1 步进电机 直线 %2 CM',
      args0: [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_stepperline'),
        },
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
      message0: '%1 步进电机 转向 %2 °',
      args0: [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_stepperturn'),
        },
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
      message0: '%1 步进电机校准 脉冲/米 %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_stepperppm'),
        },
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
      message0: '%1 步进电机校准 轮距 %2 米',
      args0: [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_stepperwheelbase'),
        },
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
      message0: '%1 步进电机弧线 半径 %2 角度 %3',
      args0: [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_stepperarc'),
        },
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
      message0: '%1 RGB 亮度 %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_rgb_bright'),
        },
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
      message0: '%1 RGB 引脚 %2 像素 %3 颜色 %4',
      args0: [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_rgb_pick'),
        },
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
      message0: '%1 RGB 引脚 %2 像素 %3 红 %4 绿 %5 蓝 %6',
      args0: [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_rgb_set'),
        },
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
      message0: '%1 RGB 引脚 %2 关闭',
      args0: [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_rgb_off'),
        },
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
      message0: '%1 9g 舵机 引脚 %2 角度 %3 速度 %4',
      args0: [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_servo_9g'),
        },
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
      message0: '%1 Geek 舵机 引脚 %2 角度 %3 速度 %4',
      args0: [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_servo_geek'),
        },
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
      message0: '%1 360 舵机 引脚 %2 角度 %3',
      args0: [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_servo_360'),
        },
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
    'kittenbot_rosbot_firmware_buzzer': {
      message0: '%1 蜂鸣器 %2 频率 %3 延时 %4 ms',
      args0: [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_buzzer'),
        },
        {
          type: 'field_dropdown',
          name: 'PIN',
          options: rosbotPin,
        },
        {
          type: 'input_value',
          name: 'FREQ',
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
    'kittenbot_rosbot_firmware_ping': {
      message0: '%1 超声波距离 %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_ping'),
        },
        {
          type: 'field_dropdown',
          name: 'PIN',
          options: rosbotPin,
        }
      ],
      colour: "#DE5277",
      output: 'Number'
    },
    'kittenbot_rosbot_firmware_voltage': {
      message0: '%1 电源电压',
      args0: [{
        type: 'field_dropdown',
        name: 'module_id',
        options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_voltage'),
      }],
      colour: "#DE5277",
      output: 'Number'
    },
    'kittenbot_rosbot_firmware_ps2init': {
      message0: '%1 手柄初始化',
      args0: [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_ps2init'),
        }
      ],
      inputsInline: true,
      previousStatement: true,
      nextStatement: true,
      colour: "#DE5277",
    },
    'kittenbot_rosbot_firmware_ps2axis': {
      message0: '%1 手柄摇杆 %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_ps2init'),
        },
        {
          type: 'field_dropdown',
          name: 'AXIS',
          options: joystickAxis,
        }
      ],
      colour: "#DE5277",
      output: 'Number'
    },
    'kittenbot_rosbot_firmware_ps2button': {
      message0: '%1 手柄按键 %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('kittenbot_rosbot_firmware_ps2init'),
        },
        {
          type: 'field_dropdown',
          name: 'AXIS',
          options: joystickButton,
        }
      ],
      colour: "#DE5277",
      output: 'Boolean'
    },
  }
}