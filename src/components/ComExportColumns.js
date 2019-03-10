import React,{ Component } from "react";
import {Row, Col, Button,Form,message,Checkbox} from 'antd';
import ComModal from './ComModal';
import ComSelect from "./ComSelect";
const FormItem = Form.Item;
const Option = ComSelect.Option;
const CheckboxGroup = Checkbox.Group;

/**
 * 文件导出选择列模态
 */
export default class CommonExportBox extends Component {
    constructor(props){
        super(props);

        // 初始化state数据
        var json = { selectColumnsVisible : false , selectExportColumns : this.props.exportColumns};
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

    //执行导出
    getExportParm = ()=>{
        this.refs.selectExportColumns.getExportColumns(this.export);
    }

    //添加隐藏input
    addFormChild = (form, name, value) => {
        let input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', name);
        input.setAttribute('value', value);
        form.appendChild(input);
    }

    //导出方法
    export = (selectColumns)=>{

        var form = window.document.getElementById("form");
        //移除上次添加的子元素
        while (form.firstChild) {
            form.removeChild(form.firstChild);
        }

        let url = this.props.url;
        //需要导出的列
        var columns ;
        if(selectColumns != undefined && selectColumns !=null){
            columns = selectColumns;
        }else{
            columns = this.props.exportColumns;
        }

        var n = columns.length;
        for(var i = 0 ; i < n ; i++){
            this.addFormChild(form,"keycolumns",columns[i].key+";;"+columns[i].title+";;"+columns[i].children);
        }

        //查询参数
        var exportParams = this.props.exportParams;
        if(exportParams.length){
            for(let list of exportParams){
                this.addFormChild(form,"strList",list);
            }
        }else{
            for(let key in exportParams){
                if(exportParams[key]!=undefined) {
                    this.addFormChild(form,key,exportParams[key]);
                }
            }
        }


        this.addFormChild(form,"_t",""+new Date().getTime());
        this.addFormChild(form,"url",url);
        if(this.props.code){
            this.addFormChild(form,"code",this.props.code);
        }

        // 表单提交 用户excel导出
        form.action = url;
        form.submit();

    }

    //文件导出时（报错后方法回调）
    exportOnload = () => {
        var iframe = window.document.getElementById("iframe");
        var error = iframe.contentWindow.document.body.innerText;
        var isJsonType = true;
        try{
            JSON.parse(error);
        }catch (e) {
            isJsonType = false;
        }
        if(error && isJsonType && JSON.parse(error).message){
            message.warn(JSON.parse(error).message);
        }
        else if(error){
            message.warn(error);
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
                <ComModal
                    key={Math.random()*10000}
                    className="md-md2"
                    title="导出"
                    visible={this.state.selectColumnsVisible}
                    onCancel={this.closeModel}
                    footer={[
                        <Button key={Math.random()*10000} type="primary" size="large" onClick={this.getExportParm}>
                            导出
                        </Button>,
                        <Button key={Math.random()*10000} type="primary" size="large" ghost onClick={this.closeModel}>
                            取消
                        </Button>
                    ]}
                >
                    <SelectExportColumns
                        exportColumns = {this.props.exportColumns}
                        ref={"selectExportColumns"}
                    />
                </ComModal>
                <iframe name="testIframeName"  id="iframe"  style={{display:'none'}} onLoad={this.exportOnload} ></iframe>
                <form target="testIframeName" id="form" style={{display:'none'}}  action=''  method="post" >
                </form>

            </div>
        )
    }
}

//选择导出列的模态
class SelectExportColumns extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible:false,
            refresh:0,        //刷新table的标识
            selectedColumns:[], //已选列
            allColumns : [],
        };
    }

    //打开高级搜索模态
    openMode=()=>{
        this.setState({modalVisible:true})
    };

    //关闭高级搜索模态
    cancel=()=>{
        this.setState({modalVisible:false});
    };

    //获取导出列并执行导出
    getExportColumns = (callBack) => {
        var selectedColumns = this.state.selectedColumns;
        var n1 = selectedColumns.length;
        if(n1 == 0){
            message.error("你没有选择需要导出的列");
            return;
        }

        var json = [];
        this.state.allColumns.map((allItem)=>{
            selectedColumns.map((selectedItem)=>{
                if(allItem == selectedItem){
                    var arr = allItem.split(";;");
                    json.push({ key : arr[0] , title : arr[1] , children : arr[2]});
                }
            });
        });
        callBack(json);
    }

    componentDidMount=()=>{

    }

    componentWillMount(){

        this.props.exportColumns.map((item, index)=>{
            if (item.children){
                let str = [];
                for (let i=0;i<item.children.length;i++){
                    str.push(item.children[i].title);
                }
                this.state.allColumns.push(item.key+";;"+item.title+";;"+str);
                if ( item.defaultSelected == undefined || item.defaultSelected != false ){
                    this.state.selectedColumns.push(item.key+";;"+item.title+";;"+str);
                }
            }else{
                this.state.allColumns.push(item.key+";;"+item.title);
                if ( item.defaultSelected == undefined || item.defaultSelected != false ){
                    this.state.selectedColumns.push(item.key+";;"+item.title);
                }
            }
        });

    }

    //组件销毁前触发
    componentWillUnmount() {
    }

    //单个选择
    selectedChangeFun = (e) => {
        this.setState({selectedColumns:e});
    }

    //全部选择和反选
    selectedFun = (e) => {
        if(e == 'allSelected'){
            this.setState({selectedColumns:this.state.allColumns});
        }else if(e == 'inverseSelected'){
            this.setState({selectedColumns:[]});
        }
    }

    render(){
        const span = 12;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 }
        }

        return(
            <div className="md-all">

                <Form layout="inline" id="selectInputModal" className="md-main" style={{position: 'relative'}}>
                    <Row gutter={24}>
                        <Button.Group style={{marginBottom:15}}>
                            <Button onClick={e => this.selectedFun("allSelected")}>全选</Button>
                            <Button onClick={e=> this.selectedFun("inverseSelected")} >反选</Button>
                        </Button.Group>
                        <CheckboxGroup value={this.state.selectedColumns} onChange={this.selectedChangeFun}  >
                            { this.props.exportColumns.map((item, index) =>{
                                    if (item.children) {
                                        let str = [];
                                        for (let i=0;i<item.children.length;i++){
                                            str.push(item.children[i].title);
                                        }
                                        return<Checkbox style={{width :"185px"}} key = {item.key} value = {item.key+";;"+item.title+";;"+str}>{item.title}</Checkbox>
                                    }else{
                                        return<Checkbox style={{width :"185px"}} key = {item.key} value = {item.key+";;"+item.title}>{item.title}</Checkbox>
                                    }
                                }
                            ) }
                        </CheckboxGroup>
                    </Row>
                </Form>
            </div>
        )
    }
}