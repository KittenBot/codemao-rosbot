/**
 * 这个文件是自定义在toolbox的样式
 */
export function get_custom_xml() {
  const buildNumXML = function(argName: any, defval?: any, constrain?: any){ 
    constrain = constrain || '-255, 255,';
    defval = defval || '100';
    return `<value name="${argName}">
      <shadow type="math_number">
        <field name="NUM" constraints="${constrain}">${defval}</field>
      </shadow>
    </value>`
  };
  return {
    kittenbot_rosbot_firmware_motor_run: {
      xml: buildNumXML('SPEED')
    },
    kittenbot_rosbot_firmware_motor_dual: {
      xml: buildNumXML('SPDM1A')+buildNumXML('SPDM1B')
    },
    kittenbot_rosbot_firmware_motor_dual_delay: {
      xml: buildNumXML('SPDM1A')+buildNumXML('SPDM1B')+buildNumXML('DELAY', 1000, "0, 5000,")
    },
    kittenbot_rosbot_firmware_motor_quad: {
      xml: buildNumXML('SPDM1A')+buildNumXML('SPDM1B')+buildNumXML('SPDM2A')+buildNumXML('SPDM2B')
    },
    kittenbot_rosbot_firmware_motor_omni: {
      xml: buildNumXML('SPDX')+buildNumXML('SPDY')+buildNumXML('SPDR', 0)
    },
    kittenbot_rosbot_firmware_stepperline: {
      xml: buildNumXML('DISTANCE', 20)
    },
    kittenbot_rosbot_firmware_stepperturn: {
      xml: buildNumXML('DEGREE', 90)
    },
    kittenbot_rosbot_firmware_stepperppm: {
      xml: buildNumXML('PPM', 14124)
    },
    kittenbot_rosbot_firmware_stepperwheelbase: {
      xml: buildNumXML('WHEELBASE', 0.118)
    },
    kittenbot_rosbot_firmware_stepperarc: {
      xml: buildNumXML('RADIUS', 20)+buildNumXML('DEGREE', 90)
    },
  };
}