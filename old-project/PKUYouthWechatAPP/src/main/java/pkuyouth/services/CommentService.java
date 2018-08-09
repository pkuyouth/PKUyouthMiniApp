package pkuyouth.services;

/**
 * Created by yt476 on 2017/7/20.
 */
public interface CommentService {
    void comment(String userId, Integer articleId, String username, String userPicUrl, String comment);
    void deleteComment(String userId, Integer articleId, Integer commentId);
    void commentApprove(String userId, Integer articleId, Integer commentId);
    void cancelCommentApprove(String userId, Integer articleId, Integer commentId);
}
