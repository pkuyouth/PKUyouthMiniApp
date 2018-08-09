package pkuyouth.requestobjects;

/**
 * Created by yt476 on 2017/11/8.
 */
public class ArticleCommentObject {
    private String article_id;
    private Integer comment_id;

    public String getArticle_id() {
        return article_id;
    }

    public void setArticle_id(String article_id) {
        this.article_id = article_id;
    }

    public Integer getComment_id() {
        return comment_id;
    }

    public void setComment_id(Integer comment_id) {
        this.comment_id = comment_id;
    }
}
