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



做这个主要是前端模块功能太多，每次都被后台吐槽（启动好久呀~，编译好久呀~，巴拉巴拉，最主要是不同模块改动发布影响，这个没做好，那边要发布）

于是决定拆分前端模块，于是想到antd的用法，和npm包的使用

于是把能公共提取的全部抽取出来（后台头不疼啦，前端腰不酸啦）

中间的问题就是部分导出组件不理想，导致无法引用（不过是指用yarn link方式直接本地是ok的哦）

使用的是直接连接网址的方式 
eg:"react-antd-com": "git+http://user:ped@github.com:huiBuiling/react-antd-com.git#master"


