import React,{ Component } from "react"
import {Select} from 'antd'
const Option = Select.Option;

/**
 * @author hui
 * @date 2018
 * @Description: select(针对下拉框出现滚动条不跟随问题)
 */
export default class MySelect extends Select {

    getPopupContainer = (node) => {
        return node.parentNode.parentNode.parentNode.parentNode;
        // return node.parentNode;
    };

    render(){
        const {className} = this.props;
        return  <Select dropdownClassName = {className ? className : "my-select"}
                        getPopupContainer={this.getPopupContainer}
                        {...this.props}

            />;
    }
}

