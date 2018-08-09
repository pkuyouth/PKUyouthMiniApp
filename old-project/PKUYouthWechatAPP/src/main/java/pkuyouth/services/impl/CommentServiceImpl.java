package pkuyouth.services.impl;

import org.springframework.stereotype.Service;
import pkuyouth.dao.CommentMapper;
import pkuyouth.services.CommentService;

import javax.annotation.Resource;

/**
 * Created by yt476 on 2017/7/20.
 */
@Service
public class CommentServiceImpl implements CommentService{
    @Resource
    private CommentMapper commentMapper;

    @Override
    public void comment(String userId, Integer articleId, String username, String userPicUrl, String comment) {
        commentMapper.addComment(userId, articleId, username,userPicUrl, comment);
    }

    @Override
    public void deleteComment(String userId, Integer articleId, Integer commentId) {
        commentMapper.deleteComment(userId, articleId, commentId);
    }

    @Override
    public void commentApprove(String userId, Integer articleId, Integer commentId) {
        commentMapper.commentApprove(articleId, userId, commentId);
    }

    @Override
    public void cancelCommentApprove(String userId, Integer articleId, Integer commentId) {
        commentMapper.deleteCommentApprove(articleId, userId, commentId);
    }

}
