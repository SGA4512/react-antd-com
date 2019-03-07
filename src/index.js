const ENV = process.env.NODE_ENV;
if (ENV !== 'production' && ENV !== 'test' && typeof console !== 'undefined' && console.warn && typeof window !== 'undefined') {
    console.warn('You are using a whole package of react-antd-com,' + 'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.');
}

export { default as Hello } from './components/Hello.js';
export { default as ComModal } from './components/ComModal';