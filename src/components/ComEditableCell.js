import React,{ Component } from "react";
import { Input, Icon } from 'antd';

/**
 * @author hui
 * @date 2018
 * @Description: table编辑,调整为不点check，全部保存
 */
export default class EditableCell extends Component {
    state = {
        value: this.props.value,
        editable: false,
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
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
