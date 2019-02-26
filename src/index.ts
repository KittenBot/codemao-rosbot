export { get_block_config } from './deps/block_info';
import * as def_hardware_config from './config/hardware_config.json';
export { js_generators, py_generators } from './deps/block_generator';
export { get_functions } from './config/domain_function';
import { ElfMini } from './config/hardware';
import { get_block_xml } from './deps/block_xml';

export function get_hardware_device() {
  return new ElfMini();
}

const img = require(`./resources/${def_hardware_config.img}`);
for (let i = 0; i < def_hardware_config.modules.length; i++) {
  def_hardware_config.modules[i].module_img = require(`./resources/${def_hardware_config.modules[i].module_img}`);
}

export const block_xml = get_block_xml();
export const hardware_config = def_hardware_config;
export const toolbox = {
  "categorys": [
    {
        "category_name": "模块",
        "color": "#1CB0B8",
        "blocks": [
        ],
        "icon": {
          "normal_icon_css": "",
          "selected_icon_css": ""
        }
    }
  ]
};

hardware_config.img = img;