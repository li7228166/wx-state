/**
 * Created by lxp.
 */
/*
* 判断是否为Object对象
* */
export const isObject = function (target) {
    return target && target.constructor === Object;
};

/*
* 判断是否为数组
* */
export const isArray = function (target) {
    return target && target.constructor === Array;
};

/*
* 深度拷贝
* */
export const deepAssign = function (obj) {
    if (isObject(obj)) {
        let newObj = {};
        Object.keys(obj).forEach(key => {
            newObj[key] = deepAssign(obj[key]);
        });
        return Object.assign({}, newObj);
    } else if (isArray(obj)) {
        return Object.assign([], obj.map(item => {
            return deepAssign(item);
        }));
    }
    return obj;
};

/*
* 数据对比
* */
export const isEqual = (function () {
    var ObjProto = Object.prototype;
    var toString = ObjProto.toString;
    var hasOwnProperty = ObjProto.hasOwnProperty;
    var nativeKeys = Object.keys;

    var _ = function (obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };
    var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
    var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
        'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

    function collectNonEnumProps(obj, keys) {
        var nonEnumIdx = nonEnumerableProps.length;
        var constructor = obj.constructor;
        var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;
        var prop = 'constructor';
        if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);
        while (nonEnumIdx--) {
            prop = nonEnumerableProps[nonEnumIdx];
            if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
                keys.push(prop);
            }
        }
    }

    _.keys = function (obj) {
        if (!_.isObject(obj)) return [];
        if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var key in obj) if (_.has(obj, key)) keys.push(key);
        // Ahem, IE < 9.
        if (hasEnumBug) collectNonEnumProps(obj, keys);
        return keys;
    };
    var eq = function (a, b, aStack, bStack) {
        if (a === b) return a !== 0 || 1 / a === 1 / b;
        if (a == null || b == null) return a === b;
        if (a instanceof _) a = a._wrapped;
        if (b instanceof _) b = b._wrapped;
        var className = toString.call(a);
        if (className !== toString.call(b)) return false;
        switch (className) {
            case '[object RegExp]':
            case '[object String]':
                return '' + a === '' + b;
            case '[object Number]':
                if (+a !== +a) return +b !== +b;
                return +a === 0 ? 1 / +a === 1 / b : +a === +b;
            case '[object Date]':
            case '[object Boolean]':
                return +a === +b;
        }
        var areArrays = className === '[object Array]';
        if (!areArrays) {
            if (typeof a != 'object' || typeof b != 'object') return false;
            var aCtor = a.constructor, bCtor = b.constructor;
            if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                _.isFunction(bCtor) && bCtor instanceof bCtor)
                && ('constructor' in a && 'constructor' in b)) {
                return false;
            }
        }
        aStack = aStack || [];
        bStack = bStack || [];
        var length = aStack.length;
        while (length--) {
            if (aStack[length] === a) return bStack[length] === b;
        }
        aStack.push(a);
        bStack.push(b);
        if (areArrays) {
            length = a.length;
            if (length !== b.length) return false;
            while (length--) {
                if (!eq(a[length], b[length], aStack, bStack)) return false;
            }
        } else {
            var keys = _.keys(a), key;
            length = keys.length;
            if (_.keys(b).length !== length) return false;
            while (length--) {

                key = keys[length];
                if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
            }
        }
        aStack.pop();
        bStack.pop();
        return true;
    };

    _.isEqual = function (a, b) {
        return eq(a, b);
    };
    _.has = function (obj, key) {
        return obj != null && hasOwnProperty.call(obj, key);
    };
    _.isObject = function (obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };

    _.isFunction = function (obj) {
        return typeof obj == 'function' || false;
    };
    return _.isEqual;
}.call(this));
