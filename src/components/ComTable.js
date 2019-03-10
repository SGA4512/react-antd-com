import React,{ Component } from "react"
import {Table,Pagination,Button,Checkbox,Popover} from 'antd'
import { post } from "../utils/AxiosUtil";
import { Resizable } from 'react-resizable';
const ButtonGroup = Button.Group;

const ResizeableTitle = (props) => {
    const { onResize, width, ...restProps } = props;

    if (!width) {
        return <th {...restProps} />;
    }

    return (
        <Resizable width={width} height={0} onResize={onResize}>
            <th {...restProps} />
        </Resizable>
    );
};

/**
 * @author hui
 * @date 2018
 * @Description: table(显示|分页|隐藏显示列|鼠标移上显示|列可拖曳)
 */
class MyTable extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: this.props.data ? this.props.data : [],
            pagination: {
                pageNo:1,
                pageSize:10
            },
            total: 0,
            size:'middle',
            border:this.props.border == false ? false : true,
            loading: false,

            newColumns:this.props.columnsProps ? this.props.columnsProps : this.props.columns,  //保存原始数组
            plainOptions:[], //checkbox数组
            visible:false,  //显示checkbox
            fieldOrder:null,
            orderField:null,
        };
    }

    //渲染后初始化
    componentDidMount(){
        if(this.props.columnsProps) {
            let plainOptions = [];
            let columnsProps = [...this.props.columnsProps];
            if (this.props.showBtn) {//默认有隐藏字段
                columnsProps.map(item => {
                    if (item.display == false) {
                        plainOptions.push({
                            title: item.title,
                            checked: false
                        });
                    } else {
                        plainOptions.push({
                            title: item.title,
                            checked: true
                        });
                    }
                });
                columnsProps = columnsProps.filter(item => item.display != false)
            } else {
                columnsProps.map(item => {
                    plainOptions.push({
                        title: item.title,
                        checked: true
                    });
                });
            }
            this.setState({
                plainOptions: plainOptions,
                newColumns: columnsProps
            })
        }
    }

    //选中事件
    onChecked = (val,e)=>{  //不刷新table
        let plainOptions = [...this.state.plainOptions];
        plainOptions.map((item) =>{
            if(item.title == val.title){
                item.checked = e.target.checked;
            }
        });

        this.props.columnsProps.map(item =>{  //每次操作都会有记录
            if(item.title == val.title){
                item.display = e.target.checked;
            }
        })

        let newColumns = [...this.props.columnsProps].filter(item => item.display != false)
        this.setState({newColumns:newColumns,plainOptions:plainOptions});
    }

    //获取数据
    fetch = (postParam)=>{
        this.setState({ loading: true });
        let { pagination } = this.state;
        if(Object.keys(postParam).length !== 0){
            if(postParam.pageNo && postParam.pageSize){
                pagination = {
                    pageNo:postParam.pageNo,
                    pageSize:postParam.pageSize
                }
            }else{
                let size = this.state.pagination.pageSize;
                postParam = {
                    ...postParam,
                    pageNo:1,
                    pageSize:size
                }
                pagination = {
                    pageNo:1,
                    pageSize:size
                }
            }
        }else{
            postParam = {
                pageNo:1,
                pageSize:10
            }
        }
        post(this.props.url, postParam, this.props.getParam).then(res => {
            if(res.code === 200){
                if(postParam.getData){
                    this.props.getData(res.data.rows);
                }
                this.setState({
                    data: res.data.rows,
                    pagination,
                    total:res.data.total,
                    loading: false
                });
            }
        }).catch(error => {
            this.setState({ loading: false });
            console.log("table错误")
        });
    }

    //查询|排序
    handleTableChange = (pageNo,pageSize,pagination)=>{
        if(pagination != null){
            this.setState({
                orderField:pagination.field,
                fieldOrder:pagination.order,
            });
            this.fetch({
                ...this.props.postParam,
                pageNo: this.state.pagination.pageNo,
                pageSize: this.state.pagination.pageSize,
                total:this.state.total,
                attributeNamesForOrderBy :{[pagination.field]:pagination.order}
            });
        }
        else{
            let params = {
                ...this.props.postParam,
                pageNo: pageNo,
                pageSize: pageSize,
            };

            if(!this.state.orderField || !this.state.fieldOrder){
                this.fetch(params);
            } else{
                //排序
                this.fetch({...params, attributeNamesForOrderBy :{[this.state.orderField]:this.state.fieldOrder},});
            }
        }
    }

    //分页
    changeSize = (pageNo, pageSize)=>{
        this.setState({
            pagination:{
                pageNo: pageNo,
                pageSize: pageSize
            }
        });
        this.handleTableChange(pageNo,pageSize)
    }

    //table变化后刷新
    componentWillReceiveProps(){
        if(this.props.refresh != 0 && this.props.refresh!=undefined){
            this.fetch(this.props.postParam);
        }
    }

    handleResize = index => (e, { size }) => {
        this.setState(({ newColumns }) => {
            const nextColumns = [...newColumns];
            nextColumns[index] = {
                ...nextColumns[index],
                width: size.width,
            };
            return { newColumns: nextColumns };
        });
    };

    render() {
        const components = {
            header: {
                cell: ResizeableTitle
            }
        }

        const newColumns = this.state.newColumns.map((col, index) => ({
            ...col,
            onHeaderCell: column => {
                return ({
                    width: column.width,
                    onResize: this.handleResize(index),
                })
            }
        }));

        const content = (
            <div className="table-checkbox">
                {
                    [...this.state.plainOptions].map((item)=>{
                        if(item.checked == true){
                            return <Checkbox checked onChange={this.onChecked.bind(this,item)} key={item + Math.random()*10000} style={{display: 'block'}}>{item.title}</Checkbox>
                        }else{
                            return <Checkbox onChange={this.onChecked.bind(this,item)} key={item + Math.random()*10000} style={{display: 'block'}}>{item.title}</Checkbox>
                        }
                    })
                }
            </div>
        );

        let top = 0;
        if(this.props.showBtn && this.props.noBtnTop){top = 40;}

        return (
            <div style={{position:'relative',top:top}} className="com-table-all">
                <div style={{display:this.props.showBtn ? 'block':'none',height:'40px',position:'absolute',top:'-40px',right:0}}>
                    <div className="table-btn">
                        <Popover
                            style={{top:30}}
                            title="隐藏/显示列"
                            placement="bottomRight"
                            trigger="click"
                            arrowPointAtCenter
                            content={content}
                            visible={this.state.visible}
                            onVisibleChange={(visible) => {
                                this.setState({ visible });
                            }}
                            getPopupContainer={(node)=> {
                                return node.parentNode.parentNode.parentNode
                            }}
                        >
                            <Button type="dashed" icon="table" >隐藏/显示</Button>
                        </Popover>
                    </div>
                </div>
                <Table
                    {...this.props}
                    bordered = {this.state.border}
                    size = {this.state.size}
                    pagination = {false}
                    loading = {this.state.loading}
                    dataSource={this.state.data}
                    refresh = {this.state.refresh}
                    onChange={this.handleTableChange}
                    url = {this.props.url}
                    rowKey={this.props.rowKeys != null ? this.props.rowKeys : record => record.id}
                    columns={newColumns}
                    components={components}

                    plainOptions = {this.state.plainOptions}
                />

                {this.props.display ? null :
                    <Pagination
                        pagination="bottom"
                        showSizeChanger={true}
                        showQuickJumper={true}
                        // hideOnSinglePage={true}  //默认只有一页不显示分页

                        current={this.state.pagination.pageNo}
                        pageSize={this.state.pagination.pageSize}

                        total={this.state.total}
                        showTotal={(total, range) => `共有 ${total} 条记录`}
                        pageSizeOptions={this.props.pageSizeOpt==undefined?['10', '20', '30', '50', '100']:this.props.pageSizeOpt}

                        onChange={this.changeSize}
                        onShowSizeChange={this.changeSize}

                    />
                }
            </div>
        );
    }
}

export default MyTable
