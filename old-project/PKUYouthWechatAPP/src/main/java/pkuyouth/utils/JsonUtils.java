package pkuyouth.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

/**
 * Created by WangJian on 2017/1/29.
 */
@Deprecated
public class JsonUtils {
    @Deprecated
    public static <T> T jsonToObject(String json,Class<T> className) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        T result = objectMapper.readValue(json,className);
        return result;
    }
    @Deprecated
    public static <T> String objectToJson(T t) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        String result = objectMapper.writeValueAsString(t);
        return result;
    }
}
