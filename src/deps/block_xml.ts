const hw_cfg = require('../config/hardware_config.json');
import { get_custom_xml } from '../config/block_xml';


function get_xml(type:string) {
  switch (type) {
    case 'digital_read':
    case 'digital_write': return `
    <value name="status">
    <shadow type="matrix_uno_state">
      <field name="STATUS"></field>
    </shadow>
    </value>`;
    case 'pwm': return `<value name="intensity">
    <shadow type="math_number">
      <field name="NUM" constraints="0, 100,">50</field>
    </shadow>
    </value>
    `;
    case 'analog': return ``;
  }
}

export function get_block_xml() {
  const modules = hw_cfg.modules;
  const block_xml:any = {};
  for (const m of modules) {
    for (const b of m.block_info) {
      const block_name = b.name;
      block_xml[block_name] = {
        xml: get_xml(b.type),
        block_gap: 0,
      }
    }
  }
  const custom_xml:any = get_custom_xml();
  for (const x of Object.keys(custom_xml)) {
    block_xml[x] = {
      xml: custom_xml[x].xml,
      block_gap: 0,
    };
  }
  return block_xml;
}