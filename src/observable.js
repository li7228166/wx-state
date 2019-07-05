import store from './store';
import {makeProxy} from './core';

/*
* store修饰器
* */
export const observable = function (StoreClass, storeName) {
    if (!storeName) {
        throw 'observable, parameter cannot be empty';
    }
    store.add(storeName, new StoreClass());
    return makeProxy(new StoreClass(), [storeName]);
};
/*
export default {
    observable
};*/
