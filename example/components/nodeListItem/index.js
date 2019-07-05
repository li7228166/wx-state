// components/listItem/index.js
import {connect} from "../../utils/wx-state";

const mapStateToData = function ({articleStore}) {
    return {
        msg: articleStore.obj.msg
    }
};
Component(connect(mapStateToData)({
    properties: {},
    data: {},
    methods: {}
}));

