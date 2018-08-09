package pkuyouth.services;

import pkuyouth.dtos.User;
import pkuyouth.dao.UserMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by WangJian on 2017/1/30.
 */
@Service("searchArticleService")
@Deprecated
public class SearchArticleService {
    @Resource
    UserMapper userMapper;
    public User getUser(int title){
        return userMapper.getUser(title);
    }

}
