# 编程猫硬件开放接口模板 

## 使用说明
  <!-- 1. 安装Node.js  
    [Node.js下载](https://nodejs.org/zh-cn/) 请选择，LTS版本  
  2. 安装Yarn  
    [Yarn 安装说明](https://yarnpkg.com/en/docs/install)  
  3. 运行 `yarn install` 安装所需的 node modules 
  4. 修改 package.json的 name 字段 （改成一个唯一的名字即可）  
  5. 安装7z  
    - [windows](https://www.7-zip.org/download.html)  
    - Mac `brew install p7zip`  
  6. 下载并解压编程猫客户端  
    - 项目已经集成了脚本（会自动下载和解压），直接使用 `yarn client:init`   -->
  1. 将客户端所在文件夹拷贝到项目根目录, 并将名字修改为 client
  2. 编译代码  
    `yarn build:prod`  
  3. 拷贝到客户端里面  
    `yarn make:dist`  
  4. 直接运行 client/源码编辑器  


## 项目结构

    |-- src
      ├── config
      │   ├── block_config.ts  这是自定义的积木类型
      │   ├── domain_function.ts 这是积木对应的运行函数
      │   ├── hardware_config.json 这是最重要的配置文件
      |   └── block_xml.ts 自定义积木初始化样式

## 具体配置

### hardware_config.json
  - device_type_id: 设备的类型和 id 表示, 需唯一, 目前已用的有: 
    - arduino_uno_firmware
    - arduino_nano_firmware
    - arduino_uno_firmware_compile_support
    - arduino_nano_firmware_compile_support
    - weeemake_elfmini_firmware
  - device_category
    - 0: ArduinoFirmware 脱机模式
    - 1: SerialPortDevice 联机模式
    - 2: BleDevice 蓝牙模式
  - img: 设备的icon 100*70px, 3倍图, 等比例缩放, 大小不超过20k, 格式为 .png(无底色)
  - brand_name: 显示在添加硬件里的品牌名称, 不超过10个英文字符(含空格)
  - model_name: 显示硬件型号, 不超过10个英文字符(含空格)
  - default_show_name: 侧边栏中显示的硬件名称, 不超过15个英文字符(含空格)
  - compile_support: 是否支持烧录(联机模式为 false, 脱机模式为 true)
  - baud_rate: 通信波特率
  - modules: 包含的模块列表
    - module_name: 模块名,  不超过6个汉字, 英文不超过9个字符(含空格)
    - module_img: 模块图片 70*70px(3倍图) 格式 .png(无底色), 大小不超过20k
    - module_blocks: 包含的模块积木名称列表
    - block_info: 如果属于"数字读(digital_write), 数字写(digital_read),  pwm写(pwm), 模拟读(analog)"这四种内置类型, 可以直接写在该数组中, 无需在 block_config 中.需配置:
      - type: 四选其一
      - name: 积木名称
      - color: 积木颜色默认为"#2cbfd8"
      - message: 积木消息体
    - module_pins 侧边栏中模块对应的接口信息
      - pin_type_name: 对应pin的名字
      - pin_type_value: 对应积木的参数名称(args0里面的 name)
      - pins 对应的下拉列表

### block_config.ts 用于非"数字读, 数字写, pwm 写, 模拟读"四种类型的自定义积木配置
  - 模板代码: 
```js
// 这里是进行积木配置的方法, 导出到 index.ts 中使用
export function get_custom_block_config(blockly: any,get_module_name_dropdown: Function) {
  return {
    // 执行类积木
    'weeemake_elfmini_firmware_led_board': { // hardware_config.json中的block名
      message0: '设置板载LED %1 电平状态 数字输入 %2 字符串输入 %3 下拉选项 %4', // 消息体， %1 %2 是对应 args0 中的变量顺序
      args0: [{
          type: 'field_dropdown', // 参照 https://developers.google.com/blockly/guides/create-custom-blocks/dropdown-menus
          name: 'module_id',
          options: () => get_module_name_dropdown('weeemake_elfmini_firmware_led_board'), // 用来绑定模块与下拉选项，domain_function会根据这个拿到具体的接口数据, 必须返回一个[展示名, 对应真实code]的数组, 即[string, string][]
        },
        {
          type: 'input_value', // 参照 https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks#block_inputs
          name: 'intensity',
          check: 'Number', // 过滤输入类型
          align: 'CENTRE', // 是否居中
        },
        {
          type: 'input_value',
          name: 'message',
          check: 'String',
          align: 'CENTRE',
        },
        {
          type: 'field_dropdown',
          name: 'status'
          options: [
            ['高', 'high'],
            ['低', 'low']
          ]
        }
      ],
      previousStatement: true, // 这个是用来控制积木的上连接选项
      nextStatement: true, // 这个是用来控制积木的下连接选项
      colour: "#2cbfd8", // 积木的色值
    },{
    // 输出类积木
    'weeemake_elfmini_firmware_sound_sensor': {
      message0: '数字读取 %1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'module_id',
          options: () => get_module_name_dropdown('weeemake_elfmini_firmware_sound_sensor'),
        },
      ],
      tooltip: '', // hover 到积木上的提示
      colour: '#2cbfd8',
      output: 'Boolean', // 输出类型, 可选项为 Boolean, Number, String
    },
  }
}
```
  - 注意要点:
    1. args0的参数个数与 message0必须相等
    2. args0 中有多种 type 可以选择, 模板中的两种类型可以覆盖80%以上需求, 如无法满足可联系我们.
    3. args0中的 name 用于默认值的显示(config/block_xml)以及积木与代码的转换(deps/block_generator).
    4. field_dropdown 类型在显示时的 default value 为 options 数组的第一个元素.

### block_xml.ts 非必要项, 只在包含 number 或 text 积木中填写
  - 模板代码:
```js
export function get_custom_xml() {
  return {
    weeemake_elfmini_firmware_led_board: {
      xml: `
      // 数字类型
      <value name="args0中对应 name">
      <shadow type="math_number">
        <field name="NUM" constraints="0, 100,">默认值</field>
      </shadow>
      </value>
      // 字符串类型
      <value name="message">
      <shadow type="text">
        <field name="TEXT">Hi</field>
      </shadow>
    </value>
      `
    },
  };
}
```

### domain_function.ts 所有积木在运行时的调用方法

  - 模板代码
```js
// 暴露出 domain_function
export function get_functions(get_hardware:GetHardwareType, get_module_pins_value:GetModulePinsType) {
  return {
    // 函数名为对应积木名称, args 对应 args0, 输出类积木给 return 返回值, 非输出类积木直接调用 write 方法写入指令
    weeemake_elfmini_firmware_led(args:any) { 
      // get_module_pins_value 用于获取 pin 值
      const pins_data:any = get_module_pins_value(args.module_id);
      // get_hardware 用于根据硬件 id 获取硬件实例
      get_hardware(args.module_id).write(`M125 ${pins_data} test1 ${args.intensity} test2 ${args.message} ${args.status === 'high' ? 1 : 0}`);
    },
    // 如果积木需要阻塞的等待返回值(如读取接口状态)，需要使用 async/await 类型返回
    async weeemake_elfmini_firmware_sound_sensor(args:any) {
      const pins_data:any = get_module_pins_value(args.module_id);
      return await get_hardware(args.module_id).write(`M7 2 ${pins_data}`); // 等待直到异步有返回值
    },
  }
}
```
