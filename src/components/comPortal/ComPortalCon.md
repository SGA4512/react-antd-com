# edu-common

## ComPortalCon

- 引入方式：import { ComPortalCon } from "react-antd-common";

- 样式文件 portalConSty.scss

- param
     * @param className	     对话框外层容器的类名
     * @param placement	     出现方向 left | right | top | bottom,默认right
     * @param height	     高度, 在 placement 为 top 或 bottom 时使用
     * @param width 	     宽度, 在 placement 为 left 或 right 时使用
     * @param visible	     是否可见,默认false
     * @param title	         标题
     * @param bodyStyle	     可用于com-portal-content-body设置样式等
     * @param style	         可用于设置最外层容器(com-portal)的样式
     * @param mask	         是否展示遮罩,默认true
     * @param maskStyle	     遮罩样式
     * @param getContainer	 指定挂载的 HTML 节点
     * @param zIndex	     设置的 z-index
     * @param maskClosable	 点击蒙层是否允许关闭,默认false
     * @param destroyOnClose 关闭时销毁 Drawer 里的子元素，默认false
     * @param closable	     是否显示右上角的关闭按钮,默认true
     * @param onClose	     点击遮罩层或右上角叉或取消按钮的回调
     * @param botButton	     底部操作按钮，默认无

- demo
```
    const btns = <div>
                    <Button type="primary">查询</Button>
                    <Button type="primary" ghost onClick={this.showCourse}>关闭</Button>
                </div>;
    <ComPortalCon
        // height='400px'
        // className="hui"
        // zIndex='1001'
        // mask={true}
        // maskStyle={style}
        // maskClosable={true}
        // style={{background:'red'}}
        // bodyStyle={{background:'red'}}
        // closable={false}
        // botButton={btns}  //底部操作按钮

        <!--常用属性-->
        visible={this.state.showCourse}
        placement='right'   //方向默认右边，可不设置
        width='500px'
        title="我是标题"
        onClose={this.showCourse}
        destroyOnClose={true}  //关闭销毁当前元素
    >
        {内容组件}
    </ComPortalCon>
```