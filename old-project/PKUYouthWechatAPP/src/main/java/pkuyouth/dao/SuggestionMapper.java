package pkuyouth.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * Created by yt476 on 2017/7/21.
 */
@Mapper
public interface SuggestionMapper {
    @Insert("insert into suggestion (user_id, user_name, suggestion) values (user_id=#{user_id},user_name=#{user_name},suggestion=#{suggestion});")
    void suggest(@Param("user_id")String user_id, @Param("user_name")String user_name, @Param("suggestion")String suggestion);
}
