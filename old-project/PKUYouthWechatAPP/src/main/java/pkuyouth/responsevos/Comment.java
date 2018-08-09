package pkuyouth.responsevos;

/**
 * Created by WangJian on 2017/1/30.
 */
public class Comment {
    private String user_name;
    private String user_img_url;
    private String comment;
    private String user_id;
    private Integer id;
    private String response;
    /////////////////
    private Integer is_user;
    private Integer approve_count;
    private Integer approve;


    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getIs_user() {
        return is_user;
    }

    public void setIs_user(Integer is_user) {
        this.is_user = is_user;
    }

    public Integer getApprove_count() {
        return approve_count;
    }

    public void setApprove_count(Integer approve_count) {
        this.approve_count = approve_count;
    }

    public Integer getApprove() {
        return approve;
    }

    public void setApprove(Integer approve) {
        this.approve = approve;
    }


    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getUser_img_url() {
        return user_img_url;
    }

    public void setUser_img_url(String user_img_url) {
        this.user_img_url = user_img_url;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
