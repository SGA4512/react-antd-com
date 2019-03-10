import React,{ Component } from "react";
import { Input, Icon } from 'antd';

/**
 * @author lijiasong
 * @time 2018/5/4
 * @Description: table编辑
 *
 * @time 2018/09/29
 * @Description: 调整为不点check，全部保存
 */
export default class EditableCell extends Component {
    state = {
        value: this.props.value,
        editable: false,
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
        /*let flag = this.props.flag;
        if (flag) {
            this.props.onChange(value);
        }*/
        this.props.onChange(value);
    }

    check = () => {
        this.setState({ editable: false });
        if(this.props.editValue != undefined){
            if (this.state.value == undefined || this.state.value == "" || this.state.value.length>20){
                this.setState({ value: this.props.editValue });
            }
        }else{
            if (this.props.onChange) {
                this.props.onChange(this.state.value);
            }
        }

    }

    edit = () => {
        this.setState({ editable: true });
    }

    //保存变化后刷新
    componentWillReceiveProps(){
        if(this.props.editable != 0 && this.props.editable != undefined){
            this.check();
        }
    }

    render() {
        const { value, editable } = this.state;
        return (
            <div className="editable-cell">
                {
                    editable ?
                        <div className="editable-cell-input-wrapper">
                            <Input
                                value={value}
                                onChange={this.handleChange}
                                onPressEnter={this.check}
                            />
                            {/*<Icon
                                type="check"
                                className="editable-cell-icon-check"
                                onClick={this.check}
                            />*/}
                        </div>
                        :
                        <div className="editable-cell-text-wrapper">
                            {value || ''}
                            <Icon
                                type="edit"
                                className="editable-cell-icon"
                                onClick={this.edit}
                            />
                        </div>
                }
            </div>
        );
    }
}
