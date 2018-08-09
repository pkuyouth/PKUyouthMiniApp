package pkuyouth.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

/**
 * Created by WangJian on 2017/2/27.
 */
@Mapper
public interface ArticleNumberMapper {
    @Select("select count(*) from articlemessage;")
    int getArticleNumber();
}
