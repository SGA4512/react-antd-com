import React,{ Component } from "react";
import { Button,message } from 'antd';

/**
 * 導入
 */
export default class CommonImportBox extends Component {
    constructor(props){
        super(props);

        // 初始化state数据
        var json = { selectColumnsVisible : false };
        this.state = json;
    }

    componentDidMount=()=>{
        //    this.intParams();
    }

    //打开模态
    openModel=()=>{
        this.setState({selectColumnsVisible:true})
    };

    //关闭模态
    closeModel=()=>{
        this.setState({selectColumnsVisible:false})
    };

    componentWillMount(){

    }

    //组件销毁前触发
    componentWillUnmount() {

    }

    //选择文件
    fileInput= ()=>{

        var form = window.document.getElementById("form2");
        //移除上次添加的子元素
        while (form.firstChild) {
            form.removeChild(form.firstChild);
        }
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('name', "file");
        input.setAttribute('style', "display:none;");
        input.onchange = function(){
            var div = window.document.getElementById("showFile");
            div.innerHTML =  "你选择的文件是：" +input.value;
        };

        form.appendChild(input);
        input.click();
    }

    //执行文件导入
    onImport= ()=>{
        this.importInitParams();

        var form = window.document.getElementById("form2");
        form.setAttribute("enctype","multipart/form-data");
        form.action = this.props.url;
        form.submit();
    }

    //添加隐藏input
    addFormChild = (form, name, value) => {
        let input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', name);
        input.setAttribute('value', value);
        form.appendChild(input);
    }

    // 文件导入前初始化数据
    importInitParams= ()=>{

        var form = window.document.getElementById("form2");
        //移除上次添加的子元素
        /*  while (form.firstChild) {
              form.removeChild(form.firstChild);
          }*/
        //需要导入的列
        var columns  = this.props.importColumns;

        var n = columns.length;
        for(var i = 0 ; i < n ; i++){
            this.addFormChild(form,"keycolumns",columns[i].key);
        }
    }


    //文件导入后回调方法
    importOnload = () => {

        var iframe = window.document.getElementById("iframe2");
        var error = iframe.contentWindow.document.body.innerText;
        //  console.log(iframe);
        if(error != "" && error != null && error != undefined){
            if(error == "ok"){
                if(this.props.importCallBack){
                    this.props.importCallBack();
                }
            }else if(error == "error"){
                alert("文件导入错误，请与管理员联系！");
            }else{
                if(this.props.importCallBack){
                    this.props.importCallBack(error);
                }else {
                    message.error(error);
                }
                return;
            }
        }
    }

    render(){
        //布局
        const span = 6;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 }
        }

        return(
            <div className="cx-main">
                <Button type="primary" htmlType="submit" onClick={this.fileInput} >选择文件</Button>
                <div id={"showFile"} style={{minHeight:"30px"}} ></div>
                <iframe name="testIframeName2"  id="iframe2"  style={{display:'none'}} onLoad={this.importOnload} ></iframe>
                <form target="testIframeName2" id="form2" style={{display:''}}  action=''  method="post" >
                </form>
            </div>
        )
    }
}


