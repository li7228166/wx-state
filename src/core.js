/**
 * Created by lxp.
 */
import {isEqual, isObject, isArray, deepAssign} from './util';
import store from './store';

/*
* 存放待进行数据对比的视图数据
* map:{
*   key:                wxwebviewId,
*   mapStateToData:     当前组件所链接mapStateToData方法
*   setData:            (Page/Component)的setData方法
*   old:                mapStateToData方法中保留的原始数据
* }
* */
const _compareMap = {};

/*
* 添加对比项
* */
export const addCompareItem = function (key, value) {
    _compareMap[key] = value;
};

/*
* 移除对比项
* */
export const removeCompareItem = function (key) {
    delete _compareMap[key];
};

/*
* 对比状态锁(优化性能)
* */
let _lock = false;

/*
* 进行数据对比并渲染页面
* */
const _compare = function () {
    _lock = true;
    //添加宏任务及状态锁，优化性能
    setTimeout(() => {
        if (!_lock) return;
        _lock = false;
        for (let key in _compareMap) {
            const item = _compareMap[key];
            const newData = item.mapStateToData(store.getMap());
            //打印日志
            if (item.data.stateCheck) {
                console.log('--------------');
                console.log('nodeId：', item.nodeId);
                console.log('oldData：', item.data);
                console.log('newData：', newData);
                console.log('isEqual：', isEqual(item.data, newData));
                console.log('--------------');
            }
            //进行数据对比，判断是否需要触发setData重新渲染页面
            if (!isEqual(item.data, newData)) {
                item.data = deepAssign(newData);
                item.setData(deepAssign(newData));
                //console.log(`setData:${item.nodeId}`);
            }
        }
        //console.log('notifyCompare');
    }, 50)
};


/*
* 进行 ES6 Proxy 封装
* */
export const makeProxy = function (target, keys = []) {
    //递归完成proxy监听树
    Object.getOwnPropertyNames(target).forEach(item => {
        if (item === 'length') return;
        let currentTarget = target[item];
        if (isObject(currentTarget) || isArray(currentTarget)) {
            target[item] = makeProxy(currentTarget, keys.concat([item]));
        }
    });

    return new Proxy(target, {
        set(target, key, value, receiver) {
            const currentKeys = keys.concat([key]);

            if (isEqual(store.getValue(currentKeys), value)) {
                return true;
            }

            store.setValue(currentKeys, value);
            _compare();

            //proxy封装value值，修复proxy监听树
            if (isObject(value) || isArray(value)) value = makeProxy(deepAssign(value), currentKeys);
            return Reflect.set(target, key, value, receiver);
        },
        get(target, key, receiver) {
            return Reflect.get(target, key, receiver);
        },
        deleteProperty(target, key) {
            const currentKeys = keys.concat([key]);
            store.deleteKey(currentKeys);
            _compare();
            return Reflect.deleteProperty(target, key);
        }
    });
};
