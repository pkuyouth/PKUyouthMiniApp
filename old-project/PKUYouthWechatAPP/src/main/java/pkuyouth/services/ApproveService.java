package pkuyouth.services;

import org.springframework.stereotype.Service;
import pkuyouth.requestobjects.ApproveObject;

/**
 * Created by WangJian on 2017/3/3.
 */
public interface ApproveService {
    void manageApprove(String userId, Integer articleId);
    void cancelApprove(String userId, Integer articleId);
}
