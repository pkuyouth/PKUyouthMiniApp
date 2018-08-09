package pkuyouth.services;

import pkuyouth.requestobjects.CollectObject;
import pkuyouth.responsevos.SearchArticleVO;

/**
 * Created by WangJian on 2017/3/3.
 */
public interface CollectService {
    void collect(String user_id, Integer article_id);
    SearchArticleVO showCollect(String userId);
    void cancelCollect(String userId, Integer articleId);
}
