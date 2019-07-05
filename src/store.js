/*
* 存放未proxy封装的纯净store数据
* */

const _storeMap = {};

/*
* 添加store到map
* */
const add = (key, store) => {
    _storeMap[key] = store;
};

/*
* 获得store
* */
const get = (key) => {
    return _storeMap[key];
};

/*
* 获得整个storeMap
* */
const getMap = () => {
    return _storeMap;
};

/*
* 同步修改操作到storeMap
* */
const setValue = (keys, value) => {
    const length = keys.length;
    const lastKey = keys[length - 1];
    let target = _storeMap;
    for (let i = 0; i < length - 1; i++) {
        target = target[keys[i]]
    }
    target[lastKey] = value;
};

/*
* 获得store[...keys]的value
* */
const getValue = (keys) => {
    let target = _storeMap;
    keys.forEach(key => {
        target = target[key];
    });
    return target;
};

/*
* 同步删除操作到storeMap
* */
const deleteKey = (keys) => {
    const length = keys.length;
    const lastKey = keys[length - 1];
    let target = _storeMap;
    for (let i = 0; i < length - 1; i++) {
        target = target[keys[i]]
    }
    delete target[lastKey]
};

export default {
    add,
    get,
    getMap,
    setValue,
    getValue,
    deleteKey
};