package pkuyouth.dao;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by WangJian on 2017/3/3.
 */
@Mapper
public interface CollectMapper {
    @Insert("insert into collect (user_id,article_id) values (#{user_id},#{article_id});")
    void addCollect(@Param("user_id") String user_id, @Param("article_id") int article_id);
    @Select("select count(*) from collect where user_id = #{user_id} and article_id = #{article_id};")
    int findCollect(@Param("user_id") String user_id, @Param("article_id") int article_id);
    @Delete("delete from collect where user_id = #{user_id} and article_id = #{article_id};")
    int deleteCollect(@Param("user_id") String user_id, @Param("article_id") int article_id);
    @Select("select article_id from collect where user_id=#{user_id};")
    List<Integer> getCollectByUser(@Param("user_id")String user_id);
}
