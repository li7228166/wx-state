import store from './store';
import {makeProxy} from './core';

/*
* store修饰器
* */
export const observable = function (StoreClass, storeName) {
    if (!storeName) {
        throw 'observable修饰器，参数storeName 不能空';
    }
    store.add(storeName, new StoreClass());
    return makeProxy(new StoreClass(), [storeName]);
};
/*
export default {
    observable
};*/
