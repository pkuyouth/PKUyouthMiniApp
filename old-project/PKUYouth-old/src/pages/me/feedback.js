//index.js
import { connect } from '../../vendors/weapp-redux.js';

import { fetchArticlesList } from '../../redux/models/articles.js';

import Toaster from '../../components/toaster/index.js';


let pageConfig = {
    data: {
        layerLevel: 0,
        currentTab: 2
    }
};

let mapStateToData = state => {
    return {
    }
};


let mapDispatchToPage = dispatch => ({
    fetchPosts: (errorCallback) => dispatch(fetchArticlesList(errorCallback))
});


pageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig);
Page(pageConfig);
