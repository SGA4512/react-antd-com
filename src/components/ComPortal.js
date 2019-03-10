import React,{ Component } from "react"
import {createPortal} from 'react-dom'

/**
 * @author hui
 * @date 2018
 * @Description: portal(将组件挂载到body)
*/
export default class MyPortal extends Component {
    constructor(props) {
        super(props);
        this.node = window.document.createElement('div');
    }

    componentDidMount() {
        if(this.props.element){
            this.props.element[0].appendChild(this.node);
        }else{
            window.document.body.appendChild(this.node);
        }
    }

    componentWillUnmount() {
        if(this.props.element){
            this.props.element[0].removeChild(this.node);
        }else{
            window.document.body.removeChild(this.node);
        }
    }
    render() {
        let classNames = this.props.className ? this.props.className : 'main-full';
        return createPortal(
            <div className={classNames}>
                {this.props.children}
            </div>, //塞进传送门的JSX
            this.node //传送门的另一端DOM node
        );
    }
}
