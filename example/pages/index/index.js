import articleStore from '../../stores/article';
import {connect} from "../../utils/wx-state";

const mapStateToData = function ({articleStore}) {
    return {
        nodeList: articleStore.nodeList,
        brandList: articleStore.brandList
    }
};

Page(connect(mapStateToData)({
    data: {},
    onLoad: function (options) {
        setTimeout(function () {
            articleStore.changeData()
        }, 1000)
    }
}));
