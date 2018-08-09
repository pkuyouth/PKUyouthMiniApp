package pkuyouth.services.impl;

import org.springframework.stereotype.Service;
import pkuyouth.dao.SuggestionMapper;
import pkuyouth.services.SuggestionService;

import javax.annotation.Resource;

/**
 * Created by yt476 on 2017/7/21.
 */
@Service
public class SuggestionServiceImpl implements SuggestionService{
    @Resource
    private SuggestionMapper suggestionMapper;

    @Override
    public void suggest(String userId, String username, String suggestion) {
        suggestionMapper.suggest(userId, username, suggestion);
    }
}
