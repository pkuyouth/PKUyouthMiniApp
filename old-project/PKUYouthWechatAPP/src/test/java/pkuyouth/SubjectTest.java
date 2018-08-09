package pkuyouth;

import org.junit.Test;
import pkuyouth.dtos.ArticleMessage;
import pkuyouth.responsevos.ArticleVO;
import pkuyouth.responsevos.SearchArticleVO;
import pkuyouth.services.ArticleService;
import pkuyouth.services.impl.ArticleServiceImpl;

import java.util.List;

/**
 * Created by yt476 on 2017/11/3.
 */
public class SubjectTest {
    @Test
    public void subjectTest(){
        ArticleService service = new ArticleServiceImpl();
        SearchArticleVO result = service.searchSubject("光阴");
        for(ArticleVO articleVO : result.getArticleVOs()){
            System.out.println(articleVO.getTitle());
        }
    }
}
