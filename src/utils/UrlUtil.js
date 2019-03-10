/**
 * 获取url地址
 * @type {{getQueryString(*): (*|null)}}
 */
let UrlUtil = {
	getQueryString(name) {
		let reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(&|$)", "i");
		let result = window.location.href.match(reg);
		if (result) return unescape(result[2]);
		return null;
	}
}
export default UrlUtil;