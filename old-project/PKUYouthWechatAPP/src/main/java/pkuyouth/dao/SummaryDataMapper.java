package pkuyouth.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import pkuyouth.dtos.SummaryData;

import java.util.List;

/**
 * Created by yt476 on 2017/8/4.
 */
@Mapper
public interface SummaryDataMapper {
    @Select("select * from summary_data;")
    List<SummaryData> getSummaryData();
}
