package pkuyouth.services;

import pkuyouth.responsevos.SearchArticleVO;
import pkuyouth.responsevos.ShowArticleVO;

import java.util.List;

/**
 * Created by WangJian on 2017/2/18.
 */
public interface ArticleService {
    SearchArticleVO replaceArticle();
    SearchArticleVO searchArticle(String searchContent);
    ShowArticleVO showArticle(Integer articleId, String userId);
    SearchArticleVO searchArticleByIds(List<Integer> articleIds);
    SearchArticleVO searchSubject(String subject);
}
