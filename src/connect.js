import store from './store';
import {deepAssign} from './util';
import {addCompareItem, removeCompareItem} from './core';

/*
* 状态 组件 链接器
* */
export const connect = function (mapStateToData) {
    return function (component) {
        const {onLoad, onUnload, lifetimes} = component;

        //合并数据到（Page/Component）data，并添加对比项；
        const commonAdd = function () {
            const mapState = mapStateToData.call(this, store.getMap());
            const nodeId = this.__wxExparserNodeId__;
            addCompareItem(nodeId, {
                nodeId: nodeId,
                setData: this.setData.bind(this),
                mapStateToData: mapStateToData.bind(this),
                data: mapState
            });
            this.setData(deepAssign(mapState));
        };

        //移除当前（Page/Component）对比项；
        const commonRemove = function () {
            removeCompareItem(this.__wxExparserNodeId__);
        };

        //override Component 的lifetimes.attached,lifetimes.detached对象
        component.lifetimes = Object.assign({}, lifetimes, {
            attached: function () {
                commonAdd.call(this);
                lifetimes && lifetimes.attached && lifetimes.attached.call(this);
            },
            detached: function () {
                commonRemove.call(this);
                lifetimes && lifetimes.detached && lifetimes.detached.call(this);
            }
        });

        //override Page 的onLoad、onUnload对象
        component = Object.assign({}, component, {
            onLoad: function (options) {
                commonAdd.call(this);
                onLoad && onLoad.call(this, options);
            },
            onUnload: function () {
                commonRemove.call(this);
                onUnload && onUnload.call(this);
            }
        });
        return component;
    }
};
