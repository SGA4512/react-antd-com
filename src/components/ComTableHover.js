import React,{ Component } from "react";
import { Tooltip } from 'antd';

/**
 * @author hui
 * @date 2018
 * @Description: td:hover(tooltip|text != null)
 */
export default class ComTableHover extends Component {
    constructor(props) {
        super(props);
        this.state={
            show:true
        }
    }

    //定位
    getPopupContainer = (node) => {
        return node.parentNode;
    };

    //宽度
    componentDidMount(){
        /*let div = this.refs.div;
        if(div.scrollWidth > div.clientWidth){
            this.setState({
                show:false
            })
        }*/
    }

    render() {
        return (
            <div ref="div" style={{width:'100%'}}>
                {/* calc(100% - 20px) */}
                {this.state.show ?
                    <Tooltip autoAdjustOverflow arrowPointAtCenter={true} placement="top"
                             title={this.props.text} overlayClassName="table-hovers" getPopupContainer={this.getPopupContainer}>
                        <span className="span">{this.props.text}</span>
                    </Tooltip>
                    :
                    <span className="span">{this.props.text}</span>
                }
            </div>

        );
    }
}
