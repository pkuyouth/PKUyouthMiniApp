package pkuyouth.controller;

import com.alibaba.fastjson.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import pkuyouth.requestobjects.*;
import pkuyouth.responsevos.*;
import pkuyouth.services.*;
import pkuyouth.utils.RedisUtils;
import redis.clients.jedis.Jedis;

import javax.annotation.Resource;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by WangJian on 2017/1/29.
 */
@RestController
@RequestMapping(value = "/pkuyouth")
public class PKUYouthController {
    private static Logger logger = LoggerFactory.getLogger(PKUYouthController.class);

    @Resource
    private
    ArticleService articleService;
    @Resource
    private
    CollectService collectService;
    @Resource
    private
    ApproveService approveService;
    @Resource
    private CommentService commentService;
    @Resource
    private SuggestionService suggestionService;
    @Resource
    private LoginService loginService;


    // 取消评论点赞
    @RequestMapping(value = "/cancel_comment_approve", method = RequestMethod.POST)
    @ResponseBody
    public BasicVO cancel_comment_approve(@RequestParam(name = "access_token")String accessToken,
                                          @RequestBody ArticleCommentObject articleCommentObject) {
        try{
            String userId = RedisUtils.getUserId(accessToken);
            commentService.cancelCommentApprove(userId, Integer.valueOf(articleCommentObject.getArticle_id()), articleCommentObject.getComment_id());
            return new SuccessVO();
        }catch (Exception e){
            logger.error("cancel comment approve error", e);
            return new ErrorVO(12, "cancel comment approve error : " + e.getMessage());
        }
    }

    // 评论点赞
    @RequestMapping(value = "/comment_approve", method = RequestMethod.POST)
    @ResponseBody
    public BasicVO commentApprove(@RequestParam(name = "access_token")String accessToken,
                                 @RequestBody ArticleCommentObject articleCommentObject) {
        try{
            String userId = RedisUtils.getUserId(accessToken);
            commentService.commentApprove(userId, Integer.valueOf(articleCommentObject.getArticle_id()), articleCommentObject.getComment_id());
            return new SuccessVO();
        }catch (Exception e){
            logger.error("comment approve error", e);
            return new ErrorVO(11, "comment approve error : " + e.getMessage());
        }
    }

    // 获取所有栏目
    @RequestMapping(value = "/get_all_subject", method = RequestMethod.GET)
    @ResponseBody
    public String getAllSubject() {
        List<SubjectVO> subjectVOList = new LinkedList<SubjectVO>();
        String base = "https://www.pkuyouth.top/";
        subjectVOList.add(new SubjectVO("调查", base + "img/diaocha.jpg"));
        subjectVOList.add(new SubjectVO("雕龙", base + "img/diaolong.jpg"));
        subjectVOList.add(new SubjectVO("光阴", base + "img/guangyin.jpg"));
        subjectVOList.add(new SubjectVO("机动", base + "img/jidong.jpg"));
        subjectVOList.add(new SubjectVO("评论", base + "img/pinglun.jpg"));
        subjectVOList.add(new SubjectVO("人物", base + "img/renwu.jpg"));
        subjectVOList.add(new SubjectVO("视界", base + "img/shijie.jpg"));
        subjectVOList.add(new SubjectVO("特稿", base + "img/tegao.jpg"));
        subjectVOList.add(new SubjectVO("言己", base + "img/yanji.jpg"));
        subjectVOList.add(new SubjectVO("姿势", base + "img/zishi.jpg"));

        return JSON.toJSONString(subjectVOList);
    }

    // 登录
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public BasicVO login(@RequestBody LoginCode loginCode) {
        try {
            String accessToken = loginService.login(loginCode.getCode());
            return new AccessTokenVO(accessToken);
        } catch (Exception e) {
            logger.error("login error", e);
            return new ErrorVO(10, "Login Error");
        }
    }

    //评论
    @RequestMapping(value = "/comment", method = RequestMethod.POST)
    public
    @ResponseBody
    BasicVO comment(@RequestBody CommentObject commentObject,
                    @RequestParam(name = "access_token") String accessToken) {
        try {
            String userId = RedisUtils.getUserId(accessToken);
            commentService.comment(userId, Integer.valueOf(commentObject.getArticle_id()), commentObject.getUser_name(), commentObject.getUser_pic_url(), commentObject.getComment());
            return new SuccessVO(1);
        } catch (Exception e) {
            return new ErrorVO(6, "评论失败: " + e.getMessage());
        }
    }

    //删除评论
    @RequestMapping(value = "/cancel_comment", method = RequestMethod.POST)
    @ResponseBody
    public BasicVO cancelComment(@RequestBody CancelCommentObject cancelCommentObject,
                                 @RequestParam(name = "access_token")String accessToken) {
        try {
            String userId = RedisUtils.getUserId(accessToken);
            commentService.deleteComment(userId, Integer.valueOf(cancelCommentObject.getArticle_id()), cancelCommentObject.getComment_id());
            BasicVO result = new SuccessVO(1);
            return result;
        } catch (Exception e) {
            return new ErrorVO(5, "删除评论出错"+ e.getMessage());
        }
    }

    // 读者查看收藏
    @RequestMapping(value = "/view_collect", method = RequestMethod.GET)
    @ResponseBody
    public BasicVO viewCollect(@RequestParam(name = "access_token") String accessToken) {
        try {
            String userId = RedisUtils.getUserId(accessToken);
            BasicVO basicVO = collectService.showCollect(userId);
            return basicVO;
        } catch (Exception e) {
            return new ErrorVO(7, "查看收藏错误: " + e.getMessage());
        }
    }

    // 取消收藏
    @RequestMapping(value = "/cancel_collect", method = RequestMethod.POST)
    @ResponseBody
    public BasicVO cancelCollect(@RequestBody CancelCollectObject cancelCollectObject,
                                 @RequestParam(name = "access_token") String accessToken) {
        try {
            String userId = RedisUtils.getUserId(accessToken);
            collectService.cancelCollect(userId, Integer.valueOf(cancelCollectObject.getArticle_id()));
            return new SuccessVO(1);
        } catch (Exception e) {
            return new ErrorVO(8, "取消收藏失败" + e.getMessage());
        }
    }

    //收藏
    @RequestMapping(value = "/collect", method = RequestMethod.POST)
    @ResponseBody
    public BasicVO collect(@RequestBody CollectObject collectObject,
                           @RequestParam(name = "access_token") String accessToken) {
        BasicVO collectVO;
        //TODO
        try {
            String userId = RedisUtils.getUserId(accessToken);
            collectService.collect(userId, Integer.valueOf(collectObject.getArticle_id()));
            collectVO = new SuccessVO();
        } catch (Exception e) {
            collectVO = new ErrorVO(3, "收藏失败"+e.getMessage());
            e.printStackTrace();
            logger.error(new Date().toString() + "收藏失败", e);
        }
        return collectVO;
    }

    // 取消赞
    @RequestMapping(value = "/cancel_approve", method = RequestMethod.POST)
    @ResponseBody
    public BasicVO cancelApprove(@RequestBody ArticleIdObject articleId,
                                 @RequestParam(name = "access_token") String accessToken) {
        try {
            String userId = RedisUtils.getUserId(accessToken);
            approveService.cancelApprove(userId, Integer.valueOf(articleId.getArticle_id()));
            return new SuccessVO(1);
        } catch (Exception e) {
            return new ErrorVO(9, "取消赞失败");
        }
    }

    // 点赞
    @RequestMapping(value = "/approve", method = RequestMethod.POST)
    @ResponseBody
    public BasicVO approve(@RequestBody ArticleIdObject articleId,
                           @RequestParam(name = "access_token") String accessToken) {
        BasicVO approveVO;
        //TODO
        try {
            String userId = RedisUtils.getUserId(accessToken);
            approveService.manageApprove(userId, Integer.valueOf(articleId.getArticle_id()));
            approveVO = new SuccessVO();
        } catch (Exception e) {
            approveVO = new ErrorVO(4, "赞赏失败: "+ e.getMessage());
            e.printStackTrace();
            logger.error(new Date().toString() + "赞赏失败", e);
        }
        return approveVO;
    }

    //意见反馈
    @RequestMapping(value = "/suggestion", method = RequestMethod.POST)
    @ResponseBody
    public BasicVO suggestion(@RequestBody SuggestionObject suggestionObject,
                              @RequestParam(name = "access_token") String accessToken) {
        try {
            String userId = RedisUtils.getUserId(accessToken);
            suggestionService.suggest(userId, suggestionObject.getUser_name(), suggestionObject.getSuggestion());
            return new SuccessVO(1);
        } catch (Exception e) {
            logger.error("opinion error", e);
            return new ErrorVO(10, "意见反馈失败");
        }
    }

    //文章展示
    @RequestMapping(value = "/show", method = RequestMethod.POST)
    @ResponseBody
    public BasicVO show(@RequestBody ArticleIdObject articleId,
                        @RequestParam(name = "access_token") String accessToken) {
        try {
            String userId = RedisUtils.getUserId(accessToken);
            ShowArticleVO showArticleVO = articleService.showArticle(Integer.valueOf(articleId.getArticle_id()), userId);
            return showArticleVO;
        } catch (Exception e) {
            BasicVO result = new ErrorVO(3, "文章读取失败:"+e.getMessage());
            logger.error("article read error", e);
            return result;
        }
    }

    //搜索栏目
    @RequestMapping(value = "/subject", method = RequestMethod.POST)
    @ResponseBody
    public BasicVO subject(@RequestBody SubjectObject subjectObject) {
        String subject = subjectObject.getSubject();
        BasicVO subjectVO;
        try {
            subjectVO = articleService.searchSubject(subject);
        } catch (Exception e) {
            subjectVO = new ErrorVO(2, "搜索栏目发生错误");
            logger.error(new Date().toString() + "搜索栏目发生错误", e);
        }
        return subjectVO;
    }

    //搜索
    @RequestMapping(value = "/search", method = RequestMethod.POST)
    @ResponseBody
    public BasicVO search(@RequestBody SearchObject searchObject) {
        String content = searchObject.getContent();
        BasicVO searchArticleVO;
        try {
            searchArticleVO = articleService.searchArticle(content);
        } catch (Exception e) {
            searchArticleVO = new ErrorVO(2, "搜索文章发生错误"+e.getMessage());
            e.printStackTrace();
            logger.error(new Date().toString() + "搜索文章发生错误", e);
        }

        return searchArticleVO;
    }

    //换一批
    @RequestMapping(value = "/replace", method = RequestMethod.GET)
    @ResponseBody
    public BasicVO replace() {
        BasicVO replaceArticleVO;
        try {
            replaceArticleVO = articleService.replaceArticle();
        } catch (Exception e) {
            replaceArticleVO = new ErrorVO(1, "替换文章发生错误:"+e.getMessage());
            e.printStackTrace();
            logger.error(new Date().toString() + "替换文章发生错误", e);
        }
        return replaceArticleVO;
    }
    /*
    @Resource
    SearchArticleService searchArticleService;

    //测试
    @RequestMapping(value = "/test", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, String> test() {
        Map<String, String> result = new HashMap<String, String>();
        result.put("success", "1");

        System.out.println(searchArticleService.getUser(1).getName());
        return result;
    }
    */
}
