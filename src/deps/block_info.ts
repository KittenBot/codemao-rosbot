const hw_cfg = require('../config/hardware_config.json');
import { get_custom_block_config } from '../config/block_config';

export function get_block_config(blockly:any, get_module_name_dropdown:Function) {

  function get_args(block_name:string, type:string) {
    switch (type) {
      case 'digital_read': return [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown(block_name),
        },
      ];
      case 'digital_write': return [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown(block_name),
        },
        {
          type: 'field_dropdown',
          name: 'status',
          options: [
            ['高', 'high'],
            ['低', 'low']
          ]
        },
      ];
      case 'pwm': return [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown(block_name),
        },
        {
          type: 'input_value',
          name: 'intensity',
          check: 'Number',
          align: 'CENTRE',
        },
      ];
      case 'analog': return [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown(block_name),
        },
      ]
    }
  }

  const modules = hw_cfg.modules;
  const block_config:any = {};
  for (const m of modules) {
    for (const b of m.block_info) {
      const block_name = b.name;
      block_config[block_name] = {
        message0: b.message,
        args0: get_args(b.name, b.type),
        inputsInline: true,
        colour: b.color,
      };
      if (b.type !== 'digital_read' && b.type !== 'analog') {
        block_config[block_name].previousStatement = true;
        block_config[block_name].nextStatement = true;
      } else if (b.type === 'digital_read') {
        block_config[block_name].output = 'Boolean';
      } else if (b.type === 'analog') {
        block_config[block_name].output = 'Number';
      }
    }
  }
  const custom_block_configs:any = get_custom_block_config(blockly, get_module_name_dropdown);
  for (const k of Object.keys(custom_block_configs)) {
    block_config[k] = custom_block_configs[k];
  }
  return block_config;
}