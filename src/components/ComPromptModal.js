import React,{ Component } from "react"
import {Modal} from 'antd'

/**
 * @author hui
 * @date 2018
 * @Description: msgModal(提示类型对话框)
*/
function MyInfoModal(content) {
  Modal.info({
    title: '提示',
    content: content,
    okText: '关闭'
  });
}

function MySuccessModal(content) {
  Modal.success({
    title: '成功',
    content: content,
    okText: '关闭'
  });
}

function MyErrorModal(content) {
  Modal.error({
    title: '错误',
    content: content,
    okText: '关闭'
  });
}

function MyWarningModal(content) {
  Modal.warning({
    title: '警告',
    content: content,
    okText: '关闭'
  });
}

//自定义title
function MyMsgModal(title,content) {
    Modal.warning({
        title: title,
        content: content,
        okText: '关闭'
    });
}

//自定义title
function SystemErrorModal(errorCode) {
    Modal.error({
        title: '错误',
        content: errorCode + "：系统错误，请联系管理员！",
        okText: '关闭'
    });
}

export default {MyInfoModal,MySuccessModal,MyErrorModal,MyWarningModal,MyMsgModal,SystemErrorModal}
