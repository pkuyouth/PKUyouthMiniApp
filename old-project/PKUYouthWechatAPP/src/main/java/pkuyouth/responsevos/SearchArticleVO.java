package pkuyouth.responsevos;

/**
 * Created by WangJian on 2017/1/30.
 */
public class SearchArticleVO extends BasicVO {
    int article_count;
    ArticleVO[] articleVOs;

    public int getArticle_count() {
        return article_count;
    }

    public void setArticle_count(int article_count) {
        this.article_count = article_count;
    }

    public ArticleVO[] getArticleVOs() {
        return articleVOs;
    }

    public void setArticleVOs(ArticleVO[] articleVOs) {
        this.articleVOs = articleVOs;
    }
}
