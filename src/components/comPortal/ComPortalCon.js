import React,{ Component } from "react";
import {Icon} from 'antd';
import {createPortal} from 'react-dom';
import '../../../assets/css/comPortal/portalConSty.css';

/**
 * @author hui
 * @date 2019/4/4
 * @Description: portal(将组件挂载到body) 实现类似antd抽屉
 * @param className	     对话框外层容器的类名
 * @param placement	     出现方向 left | right | top | bottom
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
 * @param destroyOnClose 关闭时销毁 Drawer 里的子元素,默认false
 * @param closable	     是否显示右上角的关闭按钮,默认true
 * @param onClose	     点击遮罩层或右上角叉或取消按钮的回调
 * @param botButton	     底部操作按钮，默认无
*/
export default class ComPortalCon extends Component {
    constructor(props) {
        super(props);
        this.node = window.document.createElement('div');
    }

    //关闭
    onClose = ()=>{
        this.props.onClose();
    }

    render() {
        let {
            className,placement,
            maskStyle,mask,maskClosable,
            width,height,zIndex,
            title,botButton,
            visible,destroyOnClose,closable,
            style,bodyStyle,
        } = this.props;

        visible = visible !== undefined ? visible : false;
        placement = placement !== undefined ? placement : 'right';
        mask = mask !== undefined ? mask : true;
        maskClosable = maskClosable !== undefined ? maskClosable : false;
        destroyOnClose = destroyOnClose !== undefined ? destroyOnClose : false;
        closable = closable !== undefined ? closable : true;

        if(visible) {
            const ele = window.document.body;
            if (this.props.getContainer) {
                this.props.getContainer[0].appendChild(this.node);
            } else {
                ele.appendChild(this.node);
            }
            ele.style.overflow = 'hidden';
            ele.style.position = 'relative';
        }else if(!visible && destroyOnClose){
            return null;
        }

        return createPortal(
            <div
                 className={`com-portal com-portal-${placement ? placement : 'right'} ${visible ? 'com-portal-open':'com-portal-close'} ${className ? className : null}`}
                 style={{zIndex:zIndex ? zIndex : null,display:visible ? 'block':'none',...style}}
            >
                {mask && <div
                    className="com-portal-mask"
                    style={maskStyle}
                    onClick={maskClosable ? this.onClose : ()=>{}}
                />}

                <div className="com-portal-content-wrapper"
                     style={{
                         width :width && (placement == 'left' || placement == 'right') ? width : '100%',
                         height:height && (placement == 'top' || placement == 'bottom') ? height : '100%'
                     }}
                >
                    <div className="com-portal-content">
                        {/*控制是否显示标题及关闭*/}
                        {title &&
                            <div
                                className="com-portal-content-title"
                                // style={{borderBottom:title == undefined && 'none'}}
                            >
                                {title}
                            </div>
                        }

                        {closable &&
                            <Icon
                                type="close"
                                className="com-portal-content-close"
                                onClick={this.onClose}
                                style={{right:title == undefined && 5}}
                            />
                        }

                        <div className="com-portal-content-body" style={{padding:title == undefined && "18px 24px",...bodyStyle}}>
                            {visible && this.props.children}

                            {botButton &&
                                <div className="com-portal-content-body-btn">
                                    {botButton}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>, //塞进传送门的JSX
            this.node //传送门的另一端DOM node
        );
    }
}
