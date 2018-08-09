package pkuyouth.services.impl;

import org.springframework.stereotype.Service;
import pkuyouth.dao.CollectMapper;
import pkuyouth.requestobjects.CollectObject;
import pkuyouth.responsevos.SearchArticleVO;
import pkuyouth.services.ArticleService;
import pkuyouth.services.CollectService;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by WangJian on 2017/3/3.
 */
@Service
public class CollectServiceImpl implements CollectService {
    @Resource
    CollectMapper collectMapper;
    @Resource
    private ArticleService articleService;
    public void collect(String user_id, Integer article_id){
        if(collectMapper.findCollect(user_id,article_id)<=0) {
            collectMapper.addCollect(user_id,article_id);
        }else{
            collectMapper.deleteCollect(user_id,article_id);
        }
    }

    @Override
    public SearchArticleVO showCollect(String userId) {
        List<Integer> articleIds = collectMapper.getCollectByUser(userId);
        return articleService.searchArticleByIds(articleIds);
    }

    @Override
    public void cancelCollect(String userId, Integer articleId) {
        collectMapper.deleteCollect(userId, articleId);
    }
}
