package pkuyouth.utils;

import redis.clients.jedis.Jedis;

/**
 * Created by wangjian on 17-11-6.
 */
public class RedisUtils {
    public static String getUserId(String accessToken){
        Jedis jedis = new Jedis("127.0.0.1", 6379);
        String id = jedis.get(accessToken);
        if(id!= null){
            jedis.expire(accessToken,3600*24);
            jedis.close();
        }else{
            jedis.close();
            throw new RuntimeException("not logged in");
        }
        return id;
    }
}
