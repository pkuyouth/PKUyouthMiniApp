package pkuyouth.responsevos;

/**
 * Created by yt476 on 2017/5/2.
 */
public class AccessTokenVO extends BasicVO{
    private String access_token;

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }

    public AccessTokenVO(String access_token) {
        this.access_token = access_token;
    }

    public AccessTokenVO() {
    }
}
