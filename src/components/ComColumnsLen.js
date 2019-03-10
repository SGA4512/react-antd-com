import React,{ Component } from "react";

/**
 * @author hui
 * @date 2018
 * @Description: table(合并数据)
 */
function columnsLen (datas,type){
    if(datas != undefined && datas.length > 1) {
        let indexArr = [];
        let lenArr = [];
        let num = 0;
        let size=datas.length
        for (let i=0 ;i<size;i++) {
            let a = parseInt(i);
            if (datas[a + 1]) {
                if (datas[a][type] == datas[parseInt(a + 1)][type]) {
                    indexArr.push(a);
                    num++;
                } else {
                    if (num != 0) {
                        lenArr.push({index: indexArr[0], len: num});
                        indexArr = [];
                        num = 0;
                    }
                }
            } else {
                if (datas[a][type] == datas[parseInt(a - 1)][type]) {
                    indexArr.push(a);
                    if (num != 0) {
                        lenArr.push({index: indexArr[0], len: num});
                        indexArr = [];
                        num = 0;
                    }
                }
            }
        }
        return lenArr;
    }else{
        return false;
    }
}

export default {columnsLen}
