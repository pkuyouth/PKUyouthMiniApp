'use strict';

const requests = require('../../libs/requests.js');

/**
 * 用于自定义的懒加载函数，目前已经废弃
 * @param {[type]} newArticles [description]
 */
function addShowItem(newArticles) {
    return Array.from(newArticles, (news) => Object.assign(news, {show: false})); // 添加 show 字段
};

function filterExisted(newArticles) {
    let newsIDs = Array.from(this.data.articlesList, (news) => news.newsID);
    return newArticles.filter((news) => {
        return newsIDs.indexOf(news.newsID) === -1; // 返回不存在于已有 news 中的 news
    });
};

/**
 * 用于自定义的懒加载函数，目前已经废弃
 * @param {Array} newArticles [description]
 */
function addImgObserver(newArticles=[]) { // 如果 newArticles == [] 则不查重
    let windowHeight = getApp().globalData.systemInfo.windowHeight;
    let newArticlesIDs = Array.from(newArticles, (news) => news.newsID);
    let articlesList = this.data.articlesList;
    for (let idx = 0; idx < articlesList.length; idx++) {
        let news = articlesList[idx];
        if (newArticles !== [] && newArticlesIDs.indexOf(news.newsID) === -1) continue; // 避免重复监听
        wx.createIntersectionObserver().relativeToViewport({
            top: 0.2 * windowHeight, // 进入高度达 20% 时停止触发
            bottom: - 0.3 * windowHeight, // 离底端小于窗口高度 30% 时触发，提前加载图片
        }).observe(`.item-${idx}`, (res) => {
            if (res.intersectionRatio > 0 && !news.show) { // 如果已经显示则跳过
                console.log(idx)
                articlesList[idx].show = true;
                this.setData({
                    articlesList: articlesList,
                });
            };
        });
    };
};

function getNewsUrl(newsInfo) {
    let { newsID, sn } = newsInfo;
    return `https://mp.weixin.qq.com/s?__biz=MzA3NzAzMDEyNg==&mid=${newsID.substring(0, 10)}&idx=${newsID.substring(10)}&sn=${sn}#wechat_redirect`;
};

function handleTapStar() {
    this.setData({
        star: !this.data.star,
    });
    requests.post("/star_news",{
        newsID: this.data.newsID,
        action: this.data.star ? "star" : "unstar", // tap后的实际状态
        actionTime: new Date().getTime(),
    }).then((data)=>{
    }).catch((data)=>{
        if (data.errcode && data.errcode !== 0) {
            this.setData({
                star: !this.data.star,
            });
        };
    });
};

function handleTapRecommend() {
    wx.navigateTo({
        url: '/pages/recommend-result/recommend-result?newsid=' + this.data.newsID,
    });
};

function handleTapNavigate() {
    let url = encodeURIComponent(getNewsUrl(this.data));
    let title = encodeURIComponent(this.data.title);
    let cover = encodeURIComponent(this.data.cover_url);
    wx.navigateTo({
        url: `/pages/web-frame/web-frame?url=${url}&title=${title}&cover=${cover}&type=news"`,
    });
};


module.exports = {
    // addShowItem: addShowItem,
    filterExisted: filterExisted,
    // addImgObserver: addImgObserver,
    getNewsUrl: getNewsUrl,
    handleTapStar: handleTapStar,
    handleTapRecommend: handleTapRecommend,
    handleTapNavigate: handleTapNavigate,
};