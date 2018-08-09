package pkuyouth.dao;

import pkuyouth.dtos.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

/**
 * Created by WangJian on 2017/1/30.
 */

@Mapper
public interface UserMapper {
    @Select("select * from test where title = #{title}")
    User getUser(@Param("title") int title);
}
