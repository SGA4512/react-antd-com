import React,{ Component } from "react"
import {message, Button } from 'antd';
import Upload from 'rc-upload';

/**
 * @author zhanglei
 * @date 2018
 * @Description: Upload(ie9)
 */
class MyUpload extends Upload {
    state = {
        fileName:"",
        fileNameError:'',
        fileSize:5242880 //默认文件最大为5M
    }
    
    render() {
        let self = this;
        let text = "文件上传";
        if(this.props.text){
            text = this.props.text;
        }
        let fileSize = this.props.fileSize?this.props.fileSize:this.state.fileSize;
        const props = {
            name: 'file',
            action: self.props.url + '?&_t'+ new Date().getTime(),
            data:this.props.data?{...this.props.data,fileName:this.state.fileName}:{},
            onChange(info) {
                //console.log('beforeUpload', info);
            },
            beforeUpload(file) {
                if(file.name){
                    let fileName = file.name;
                    let fileSuffix = file.name.substr(fileName.lastIndexOf('.') + 1 );
                    let fileNameError = "";
                    self.setState({fileName:file.name.substr(fileName.lastIndexOf('\\') + 1 )});
                    if(self.props.fileTypeArray && self.props.fileTypeArray.indexOf(fileSuffix) == -1){
                        fileNameError = 'red';
                        self.setState({fileNameError:fileNameError});
                        message.error(`请选择正确的文件格式！`);
                        self.props.failCallback?self.props.failCallback(file):null;
                        return false;
                    }else if(file.size && file.size > fileSize){
                        fileNameError = 'red';
                        self.setState({fileNameError:fileNameError});
                        message.error(`文件过大！`);
                        self.props.failCallback?self.props.failCallback(file):null;
                        return false;
                    }
                    self.state.fileName = fileName;
                    self.setState({fileNameError:fileNameError});
                }else{
                    message.error(`请先选择文件！`);
                    self.props.failCallback?self.props.failCallback(file):null;
                    return false;
                }
            },
            onStart: (file) => {
                //console.log('onStart', file);
                // this.refs.inner.abort(file);
            },
            onSuccess(response) {
                //ie下返回的是text/plan
                if(!response.code){
                    response = JSON.parse(response);
                }
                response.data.fileName = self.state.fileName;
                self.props.onSuccess(response);
                //console.log('onSuccess',response);
            },
            onProgress(step, file) {
                //console.log('onProgress', Math.round(step.percent), file.name);
            },
            onError(err) {
                self.setState({fileNameError:'red'});
                message.error(`文件错误！`);
                self.props.failCallback?self.props.failCallback(err):null;
                return false;
            },
        };
        const { href,hrefPath } = this.props;
        return (
            <div ref="upload" style={{display:'inline-block'}}>
                <Upload {...props}>
                    <Button type="ghost">{text}</Button>
                </Upload>
                {
                    href ?
                        <a href={hrefPath} disabled={this.state.fileNameError} type="_blank" style={{marginLeft:'7px',color: '#0891ff',textDecoration:'underline'}}>{this.state.fileName}</a>
                        :
                        <span className={this.state.fileNameError} style={{marginLeft:'7px'}}>{this.state.fileName}</span>
                }
            </div>
        );
    }
}

export default MyUpload
