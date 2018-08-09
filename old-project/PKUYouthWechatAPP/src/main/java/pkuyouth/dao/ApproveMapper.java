package pkuyouth.dao;

import org.apache.ibatis.annotations.*;

/**
 * Created by WangJian on 2017/3/3.
 */
@Mapper
public interface ApproveMapper {
    @Insert("insert into approve (user_id,article_id) values (#{user_id},#{article_id});")
    void approve(@Param("user_id") String user_id, @Param("article_id") int article_id);
    @Select("select count(*) from approve where user_id = #{user_id} and article_id = #{article_id};")
    int findApprove(@Param("user_id") String user_id, @Param("article_id") int article_id);
    @Delete("delete from approve where user_id = #{user_id} and article_id = #{article_id};")
    int deleteApprove(@Param("user_id") String user_id, @Param("article_id") int article_id);
}
