//index.js
import { connect } from '../../vendors/weapp-redux.js';

import { fetchArticlesList } from '../../redux/models/articles.js';

import Toaster from '../../components/toaster/index.js';


let pageConfig = {
    data: {
        article:
            {
                id: 1,
                image: 'http://i0.hdslb.com/bfs/archive/57c5ced363be9f08b4cacf1745e221d3bb99d7c5.png',
                title:'我是一个标题',
                desc: '都是什么鬼啊',
                content:'我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容\n\n\n\n我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容\n\n\n我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容',
                approve:1,
                collect:1,
                comments:[]
            }
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
