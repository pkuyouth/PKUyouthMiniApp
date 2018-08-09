package pkuyouth.services;

import org.springframework.stereotype.Service;

/**
 * Created by wangjian on 17-11-6.
 */
@Service
public interface LoginService {
    String login(String code);
}
