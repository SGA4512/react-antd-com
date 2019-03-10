import Cbase64 from 'crypto-js' //base64 编码和解码

/**
 * 获取Cookie
 * @type {{get: (function(*=): *), set: CookieUtil.set, unset: CookieUtil.unset}}
 */
var CookieUtil = {
    get: function (name){
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;
        if (cookieStart > -1){
            var cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1){
                cookieEnd = document.cookie.length;
            }

            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart
                + cookieName.length, cookieEnd));
            //解决cookies被编码问题
            if(cookieValue.indexOf("{") == -1){
                cookieValue = JSON.parse(Cbase64.enc.Utf8.stringify(Cbase64.enc.Base64.parse(cookieValue)));
            }else{
                cookieValue = JSON.parse(cookieValue);
            }
        }
        return cookieValue;
    },
    set: function (name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=" +
            encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        }
        if (path) {
            cookieText += "; path=" + path;
        }
        if (domain) {
            cookieText += "; domain=" + domain;
        }
        if (secure) {
            cookieText += "; secure";
        }
        document.cookie = cookieText;
    },
    unset: function (name, path, domain, secure){
        this.set(name, "", new Date(0), path, domain, secure);
    }

}

export default CookieUtil;
