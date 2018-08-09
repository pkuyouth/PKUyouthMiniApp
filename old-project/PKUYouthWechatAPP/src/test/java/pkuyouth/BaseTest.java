package pkuyouth;

import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

/**
 * 测试基类
 *
 * @author songlekan songlekan@baidu.com
 * @date 17/3/16.
 * Copyright  ©2016 百度
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
public class BaseTest {

    public static void main(String[] args) {
    }
}
