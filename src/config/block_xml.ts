/**
 * 这个文件是自定义在toolbox的样式
 */
export function get_custom_xml() {
  return {
    weeemake_elfmini_firmware_led_board: {
      xml: `<value name="intensity">
      <shadow type="math_number">
        <field name="NUM" constraints="0, 100,">100</field>
      </shadow>
      </value>
      <value name="message">
      <shadow type="text">
        <field name="TEXT">Hi</field>
      </shadow>
    </value>
      `
    },
  };
}