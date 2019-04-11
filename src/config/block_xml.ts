/**
 * 这个文件是自定义在toolbox的样式
 */
export function get_custom_xml() {
  const buildSpdXML = function(argName: any){ return `<value name="${argName}">
  <shadow type="math_number">
    <field name="NUM" constraints="-255, 255,">100</field>
  </shadow>
  </value>`};
  return {
    kittenbot_rosbot_firmware_motor_run: {
      xml: buildSpdXML('SPEED')
    },
    kittenbot_rosbot_firmware_motor_dual: {
      xml: buildSpdXML('SPDM1A')+buildSpdXML('SPDM1B')
    },
    kittenbot_rosbot_firmware_motor_dual_delay: {
      xml: buildSpdXML('SPDM1A')+buildSpdXML('SPDM1B')+`<value name="DELAY">
      <shadow type="math_number">
        <field name="NUM" constraints="0, 5000,">2000</field>
      </shadow>
      </value>`
    },
    kittenbot_rosbot_firmware_motor_quad: {
      xml: buildSpdXML('SPDM1A')+buildSpdXML('SPDM1B')+buildSpdXML('SPDM2A')+buildSpdXML('SPDM2B')
    },
    kittenbot_rosbot_firmware_motor_omni: {
      xml: buildSpdXML('SPDX')+buildSpdXML('SPDY')+buildSpdXML('SPDR')
    },
  };
}