package pkuyouth;

import org.junit.Test;
import pkuyouth.utils.HttpClientUtils;

/**
 * Created by wangjian on 17-11-29.
 */
public class HttpTest extends BaseTest {
    @Test
    public void test() throws Exception {
        String url = "https://api.weixin.qq.com/sns/jscode2session?appid=wx5bd37693add6d8a5&secret=811628b585af1e0b214b0e62a921a405&js_code=071oa7BA0mWqGe2wDfCA0KeYAA0oa7BR&grant_type=authorization_code";
        String returnString = HttpClientUtils.get(url);
        System.out.println(returnString);
    }
}
