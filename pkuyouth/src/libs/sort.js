'use strict';

function _baseFuncs (goal, key, descVar) {
    let articlesList = this.data.articlesList;
    if (articlesList.length === 0) return;
    articlesList.sort((news1,news2)=>{
        if (this.data.descByTime) {
            return (news1.time > news2.time ? -1 : 1);
        } else {
            return (news2.time > news1.time ? -1 : 1);
        };
    });
    this.setData({
        articlesList: articlesList,
        descByTime: !this.data.descByTime,
    });
}

function newsByTime() {
    let articlesList = this.data.articlesList;
    if (articlesList.length === 0) return;
    articlesList.sort((news1,news2)=>{
        if (this.data.descByTime) {
            return (news1.time > news2.time ? -1 : 1);
        } else {
            return (news2.time > news1.time ? -1 : 1);
        };
    });
    this.setData({
        articlesList: articlesList,
        descByTime: !this.data.descByTime,
    });
};

function newsByRank() {
    let articlesList = this.data.articlesList;
    if (articlesList.length === 0) return;
    articlesList.sort((news1,news2)=>{
        if (this.data.descByRank) {
            return (news1.rank > news2.rank ? -1 : 1);
        } else {
            return (news2.rank > news1.rank ? -1 : 1);
        };
    });
    this.setData({
        articlesList: articlesList,
        descByRank: !this.data.descByRank,
    });
};

function newsByWeight() {
    let articlesList = this.data.articlesList;
    if (articlesList.length === 0) return;
    articlesList.sort((news1,news2)=>{
        if (news1.weight > news2.weight) {
            return -1
        } else if (news1.weight == news2.weight && news1.time > news2.time) {
            return -1
        } else {
            return 1
        };
    });
    this.setData({
        articlesList: articlesList,
    });
};

function newsByReadNum() {
    let articlesList = this.data.articlesList;
    if (articlesList.length === 0) return;
    articlesList.sort((news1,news2)=>{
        if (this.data.descByReadNum) {
            return (news1.read_num > news2.read_num ? -1 : 1);
        } else {
            return (news2.read_num > news1.read_num ? -1 : 1);
        };
    });
    this.setData({
        articlesList: articlesList,
        descByReadNum: !this.data.descByReadNum,
    });
};

function newsByStarTime() {
    let articlesList = this.data.articlesList;
    if (articlesList.length === 0) return;
    articlesList.sort((news1,news2)=>{
        if (this.data.descByStarTime) {
            return (news1.starTime > news2.starTime ? -1 : 1);
        } else {
            return (news2.starTime > news1.starTime ? -1 : 1);
        };
    });
    this.setData({
        articlesList: articlesList,
        descByStarTime: !this.data.descByStarTime,
    });
};

function rptByNameSpell() {
    let rptsInfoList = this.data.rptsInfoList;
    if (rptsInfoList.length === 0) return;
    rptsInfoList.sort((rpt1,rpt2)=>{
        if (this.data.descBySpell) {
            return (rpt1.nameSpell > rpt2.nameSpell ? -1 : 1);
        } else {
            return (rpt2.nameSpell > rpt1.nameSpell ? -1 : 1);
        };
    });
    this.setData({
        rptsInfoList: rptsInfoList,
        descBySpell: !this.data.descBySpell,
    });
};

function rptByNewsCount() {
    let rptsInfoList = this.data.rptsInfoList;
    if (rptsInfoList.length === 0) return;
    rptsInfoList.sort((rpt1,rpt2)=>{
        if (this.data.descBynewsCount) {
            return (rpt1.newsCount > rpt2.newsCount ? -1 : 1);
        } else {
            return (rpt2.newsCount > rpt1.newsCount ? -1 : 1);
        };
    });
    this.setData({
        rptsInfoList: rptsInfoList,
        descBynewsCount: !this.data.descBynewsCount,
    });
};

module.exports = {
    newsByTime: newsByTime,
    newsByRank: newsByRank,
    newsByWeight: newsByWeight,
    newsByReadNum: newsByReadNum,
    newsByStarTime: newsByStarTime,
    rptByNameSpell: rptByNameSpell,
    rptByNewsCount: rptByNewsCount,
};
