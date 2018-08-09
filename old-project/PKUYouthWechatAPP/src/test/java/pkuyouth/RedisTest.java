package pkuyouth;

import org.junit.Test;
import redis.clients.jedis.Jedis;

/**
 * Created by wangjian on 17-11-6.
 */
public class RedisTest extends BaseTest{
    @Test
    public void test(){
        Jedis jedis = new Jedis("127.0.0.1", 6379);
        String result = jedis.get("123");
        System.out.println(result);
    }
    @Test
    public void insert(){
        Jedis jedis = new Jedis("127.0.0.1", 6379);
        jedis.set("123","456");
    }
}
