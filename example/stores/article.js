import {observable} from "../utils/wx-state";

class Article {
    constructor() {
        this.nodeList = [];
        this.brandList = [1, 2, 3, 4, 5];
        this.obj = {
            msg: 'Hello'
        };
    }

    changeData() {
        this.nodeList = [1, 2, 3, 4];
        setTimeout(() => {
            this.brandList = [1, 2];
            setTimeout(() => {
                this.nodeList = [1, 2, 3];
                setTimeout(() => {
                    this.obj.msg = '你好';
                }, 1500)
            }, 1500)
        }, 1500)
    }
}

export default observable(Article, 'articleStore');