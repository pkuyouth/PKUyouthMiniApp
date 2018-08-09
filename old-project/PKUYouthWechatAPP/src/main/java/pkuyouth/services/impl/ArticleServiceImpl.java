package pkuyouth.services.impl;

import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import pkuyouth.constants.Constants;
import pkuyouth.dao.ApproveMapper;
import pkuyouth.dao.ArticleMessageMapper;
import pkuyouth.dao.CollectMapper;
import pkuyouth.dao.CommentMapper;
import pkuyouth.dtos.ArticleMessage;
import pkuyouth.dtos.CommentApprove;
import pkuyouth.responsevos.ArticleVO;
import pkuyouth.responsevos.Comment;
import pkuyouth.responsevos.SearchArticleVO;
import pkuyouth.responsevos.ShowArticleVO;
import pkuyouth.services.ArticleService;
import pkuyouth.utils.TimeUtils;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.*;

/**
 * Created by WangJian on 2017/2/18.
 */
@Service
public class ArticleServiceImpl implements ArticleService {
    private static Logger logger = LoggerFactory.getLogger(ArticleServiceImpl.class);
    @Resource
    private ArticleMessageMapper articleMessageMapper;
    @Resource
    private CommentMapper commentMapper;
    @Resource
    private ApproveMapper approveMapper;
    @Resource
    private CollectMapper collectMapper;

    @Override
    public SearchArticleVO replaceArticle() {
        List<ArticleMessage> articleMessageList = articleMessageMapper.getArticleMessages();
        List<ArticleMessage> selectResult = new ArrayList<ArticleMessage>(Constants.replaceArticleNumber);
        int interval = articleMessageList.size() / Constants.replaceArticleNumber;
        for (int i = 0; i < Constants.replaceArticleNumber; i++) {
            int margin = (int) (Math.random() * interval);
            int index = margin + interval * i;
            selectResult.add(articleMessageList.get(index));
        }
        return createSearchArticleVO(selectResult);
    }

    @Override
    public SearchArticleVO searchArticle(String searchContent) {
        String parsedTime = TimeUtils.parseTime(searchContent);
        List<ArticleMessage> searchResult = new LinkedList<ArticleMessage>();
        if (parsedTime == null) {
            List<ArticleMessage> searchResultByTitle = articleMessageMapper.searchArticlesByTitle(searchContent);
            List<ArticleMessage> searchResultByContent = articleMessageMapper.searchArticlesByContent(searchContent);
            searchResult.addAll(searchResultByTitle);
            searchResult.addAll(searchResultByContent);
        } else {
            List<ArticleMessage> searchResultByTime = articleMessageMapper.searchArticlesByTime(searchContent);
            searchResult.addAll(searchResultByTime);
        }
        return createSearchArticleVO(searchResult);
    }

    @Override
    public ShowArticleVO showArticle(Integer articleId, String userId) {
        ArticleMessage article = articleMessageMapper.getArticleMessageById(articleId);
        ShowArticleVO result = new ShowArticleVO();
        int isApprove = approveMapper.findApprove(userId, articleId);
        int isCollect = collectMapper.findCollect(userId, articleId);
        List<Comment> comments = commentMapper.getArticleComment(articleId);
        result.setId(article.getANo());
        result.setTitle(article.getTitle());
        result.setDesc(article.getDescription());
        result.setPic_url(article.getPicurl());
        result.setUrl(article.getUrl());
        result.setApprove(isApprove);
        result.setCollect(isCollect);
        // set comments
        for (Comment comment : comments) {
            Integer id = comment.getId();
            List<CommentApprove> commentApproves = commentMapper.getApprovedComments(articleId, id);
            comment.setApprove_count(commentApproves.size());
            if (comment.getUser_id().equals(userId)) {
                comment.setIs_user(1);
            } else {
                comment.setIs_user(0);
            }
            comment.setApprove(0);
            for (CommentApprove commentApprove : commentApproves) {
                if (commentApprove.getUser_id().equals(userId)) {
                    comment.setApprove(1);
                }
            }
        }
        result.setComments(comments);
        return result;
    }

    @Override
    public SearchArticleVO searchArticleByIds(List<Integer> articleIds) {
        SearchArticleVO result = new SearchArticleVO();
        result.setArticle_count(articleIds.size());
        List<ArticleMessage> articleMessages = new LinkedList<ArticleMessage>();
        for (Integer articleId : articleIds) {
            ArticleMessage articleMessage = articleMessageMapper.getArticleMessageById(articleId);
            articleMessages.add(articleMessage);
        }
        return createSearchArticleVO(articleMessages);
    }

    @Override
    public SearchArticleVO searchSubject(String subject) {
        List<ArticleMessage> articleMessages = articleMessageMapper.searchArticleBySubject(subject);
        return createSearchArticleVO(articleMessages);
    }

    private SearchArticleVO createSearchArticleVO(List<ArticleMessage> articleMessages) {
        SearchArticleVO searchArticleVO = new SearchArticleVO();
        searchArticleVO.setArticle_count(articleMessages.size());
        ArticleVO[] articleVOs = new ArticleVO[articleMessages.size()];
        for (int i = 0; i < articleVOs.length; i++) {
            articleVOs[i] = new ArticleVO();
            articleVOs[i].setTitle(articleMessages.get(i).getTitle());
            articleVOs[i].setId(articleMessages.get(i).getANo());
            articleVOs[i].setDesc(articleMessages.get(i).getDescription());
            articleVOs[i].setUrl(articleMessages.get(i).getUrl());
            articleVOs[i].setPic_url(articleMessages.get(i).getPicurl());
        }
        searchArticleVO.setArticleVOs(articleVOs);
        return searchArticleVO;
    }

    private String getArticleContent(String url) {
        Document doc = null;
        try {
            doc = Jsoup.connect(url).get();
        } catch (IOException e) {
            logger.error("cannot connect the article url");
            throw new RuntimeException("cannot connect the article url");
        }
        Elements p = doc.select("p");
        StringBuilder result = new StringBuilder();
        boolean isWrite = true;
        for (Element e : p) {
            Elements children = e.children();
            for (Element img : children) {
                if (img.is("img") && isWrite)
                    // System.out.println(img);
                    result.append("<p>" + img + "</p>");
            }
            if (haveSubSection(children)) {
                continue;
            }
            String text = e.text();
            if (StringUtils.isEmpty(text) || StringUtils.isAllBlank(text)) {
                continue;
            }
            text = "<p>" + text + "</p>";
            // System.out.println(text);
            /*
            if(text.contains("本报记者")||text.contains("摄影")){
                isWrite = true;
            }
            */
            if (text.contains("微信编辑")) {
                isWrite = false;
            }
            if (isWrite) {
                result.append(text);
            }
        }
        return result.toString();
    }

    private boolean haveSubSection(Elements children) {
        for (Element e : children) {
            if (e.is("p")) {
                return true;
            }
        }
        return false;
    }

    @Deprecated
    private Set<Integer> selectNumber(int totalNumber, int selectNumber) {
        Set<Integer> resultSet = new HashSet<Integer>(selectNumber);
        for (int i = 0; i < selectNumber; i++) {
            int num = (int) (Math.random() * totalNumber);
            if (resultSet.contains(num)) {
                i--;
                continue;
            } else {
                resultSet.add(num);
            }
        }
        return resultSet;
    }
}
