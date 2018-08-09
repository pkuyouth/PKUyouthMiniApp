package pkuyouth.dtos;

/**
 * Created by WangJian on 2017/2/18.
 */
public class ArticleMessage {
    private Integer ANo;
    private String time;
    private String title;
    private String description;
    private String picurl;
    private String url;

    public Integer getANo() {
        return ANo;
    }

    public void setANo(Integer ANo) {
        this.ANo = ANo;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPicurl() {
        return picurl;
    }

    public void setPicurl(String picurl) {
        this.picurl = picurl;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
