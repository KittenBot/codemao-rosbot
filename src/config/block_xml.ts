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
    kittenbot_rosbot_firmware_rgb_bright: {
      xml: buildNumXML('VALUE', 60)
    },
    kittenbot_rosbot_firmware_rgb_pick: {
      xml: buildNumXML('PIX', 1)+`<value name="COLOR">
        <shadow type="colour_picker"></shadow>
      </value>`
    },
    kittenbot_rosbot_firmware_rgb_set: {
      xml: buildNumXML('PIX', 1)+buildNumXML('RED', 0)+buildNumXML('GREEN', 128)+buildNumXML('BLUE', 200)
    },
    kittenbot_rosbot_firmware_servo_9g: {
      xml: buildNumXML('DEGREE', 90, "0, 180,")+buildNumXML('SPEED', 128, "0,255,")
    },
    kittenbot_rosbot_firmware_servo_geek: {
      xml: buildNumXML('DEGREE', 90, "-30, 270,")+buildNumXML('SPEED', 128, "0,255,")
    },
    kittenbot_rosbot_firmware_servo_360: {
      xml: buildNumXML('DEGREE', 90, "0, 360,")
    },
  };
}