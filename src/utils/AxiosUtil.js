import axios from "axios";
const prefix = 'xxxxx';
const indexUrl = '/home/';
const logoutPath = '/signOut';

axios.defaults.withCredentials = true;
axios.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';//Ajax get请求标识
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';//Ajax post请求标识
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';//POST请求参数获取不到的问题
axios.defaults.headers.put['X-Requested-With'] = 'XMLHttpRequest';//Ajax put请求标识
axios.defaults.headers.delete['X-Requested-With'] = 'XMLHttpRequest';//Ajax delete请求标识

function query(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(`${prefix}${url}`, {params: params}).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

//post请求会有post参数也可能有get参数
function post(url, datas, params) {
    return new Promise((resolve, reject) => {
        axios.post(`${prefix}${url}`,datas,{params:params}).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

function requestAll(...paramsFun) {
    return new Promise((resolve, reject) => {
        axios.all(...paramsFun).then(axios.spread(function (...response) {
            let responseList = [];
            for(let res of response){
                if(!res.status && res.response){
                    responseList.push(res.response.data);
                }else{
                    responseList.push(res.data);
                }
            }
            return responseList;
        })).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err.data)
        })
    })
}

function deletes(url, params){
    return new Promise((resolve, reject) => {
        axios.post(`${prefix}${url}` + "/delete", params, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.response)
        })
    })
}

export default {query, post, requestAll, deletes}