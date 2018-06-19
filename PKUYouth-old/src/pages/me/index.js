//index.js
import { connect } from '../../vendors/weapp-redux.js';

import { fetchArticlesList } from '../../redux/models/articles.js';

import Toaster from '../../components/toaster/index.js';


let pageConfig = {
    data: {
        layerLevel: 0,
        currentTab: 2,
        image: "https://bbs.pku.edu.cn/attach/avatar/A/alwaysmoving.jpg?t=1486721025"
    },
    layerTrigger: function(e) {
        if (this.data.layerLevel == 0)
            this.setData({
                layerLevel: 1
            });
        else
            this.setData({
                layerLevel: 0
            });
    }
};

let mapStateToData = state => {
    return {};
};


let mapDispatchToPage = dispatch => ({
    fetchPosts: (errorCallback) => dispatch(fetchArticlesList(errorCallback))
});


pageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig);
Page(pageConfig);
