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
      │   ├── block_config.ts  这是自定义的积木类型，后面会有详细的说明
      │   ├── domain_function.ts 这是积木对应的运行函数
      │   ├── hardware_config.json 这是最重要的配置文件
      |   |── hardware.ts 负责硬件的串口通信
      |   └── block_xml.ts 自定义积木初始化样式

