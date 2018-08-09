package pkuyouth.services.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import pkuyouth.services.LoginService;
import pkuyouth.utils.HttpClientUtils;
import redis.clients.jedis.Jedis;

import javax.annotation.Resource;
import java.security.SecureRandom;

/**
 * Created by wangjian on 17-11-6.
 */
@Service
public class LoginServiceImpl implements LoginService{
    private static Logger logger = LoggerFactory.getLogger(LoginServiceImpl.class);
    @Value("${appid}")
    private String appid;
    @Value(("${secret}"))
    private String secret;

    @Override
    public String login(String code) {
        Jedis jedis = new Jedis("127.0.0.1", 6379);

        String url = "https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code";
        url = String.format(url,appid, secret, code);
        String loginResponse;
        try {
            loginResponse = HttpClientUtils.get(url);
        }catch (Exception e){
            logger.error("http get exception", e);
            throw new RuntimeException("Http Get Error", e);
        }

        JSONObject jsonObject = JSON.parseObject(loginResponse);
        if(jsonObject.containsKey("errcode")){
            logger.error(jsonObject.getString("errmsg"));
            throw new RuntimeException("Login error");
        }
        String openid = jsonObject.getString("openid");
        String session_key = jsonObject.getString("session_key");
        String unionid = jsonObject.getString("unionid");

        String accessToken = generateRandomString();
        jedis.setex(accessToken, 3600*24, openid);
        jedis.close();
        return accessToken;
    }

    private String generateRandomString(){
        SecureRandom random = new SecureRandom();
        byte bytes[] = new byte[32];
        random.nextBytes(bytes);
        String token = bytes.toString();
        return token;
    }
}
