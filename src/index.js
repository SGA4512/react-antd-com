const ENV = process.env.NODE_ENV;
if (ENV !== 'production' && ENV !== 'test' && typeof console !== 'undefined' && console.warn && typeof window !== 'undefined') {
    console.warn('You are using a whole package of react-antd-com,' + 'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.');
}

/**
 * @author hui
 * @date 2019/3/7
 * @Description: 导出文件
     * table：ComTable | ComTableHover | ComEditableCell | ComNumEditableCell | CommonEditTable | ComColumnsLen
     * antd：ComModal | ComPortal | ComPromptModal | ComSelect | ComUpload
     * 导入导出：CommonImportBox | ComExportColumns
     * 工具类：* | UrlUtil | CookieUtil
     * 測試：Hello
 */


//table
export { default as ComTable} from './components/ComTable';
export { default as ComTableHover} from './components/ComTableHover';
export { default as ComEditableCell} from './components/ComEditableCell';
export { default as ComColumnsLen} from './components/ComColumnsLen';

//antd
export { default as ComModal} from './components/ComModal';
export { default as ComPortal} from './components/ComPortal';
export { default as ComPromptModal} from './components/ComPromptModal';
export { default as ComSelect} from './components/ComSelect';
export { default as ComUpload} from './components/ComUpload';

//工具类
export { default as AxiosUtil} from './utils/AxiosUtil';
export { default as UrlUtil} from './utils/UrlUtil';
export { default as CookieUtil} from './utils/CookieUtil';

export { default as Hello } from './components/Hello.js';