# react-antd-com

测试react组件发布到npm

## 安装

npm install react-antd-com --save


### 使用

import { Hello,ComModal } from "react-antd-com";


### 按需加载

支持和antd一样的按需加载方式，请在项目.babelrc文件plugins中配置：

['import', [
    {libraryName: 'antd', style:true },
    {libraryName: 'react-antd-com', libraryDirectory: 'lib/components'}
]]