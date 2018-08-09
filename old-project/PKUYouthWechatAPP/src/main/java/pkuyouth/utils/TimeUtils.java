package pkuyouth.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by WangJian on 2017/3/3.
 */
public class TimeUtils {
    public static String parseTime(String time) {
        String regex = "20[0-1][0-9]-[0-1]?[0-9]-[0-3]?[0-9]";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(time);
        if (matcher.matches()) {
            return time;
        } else {
            return null;
        }

    }
}
