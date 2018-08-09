package pkuyouth.responsevos;

/**
 * Created by WangJian on 2017/3/3.
 */
public class ErrorVO extends BasicVO{
    private int error_code;
    private String error_msg;

    public int getError_code() {
        return error_code;
    }

    public void setError_code(int error_code) {
        this.error_code = error_code;
    }

    public String getError_msg() {
        return error_msg;
    }

    public void setError_msg(String error_msg) {
        this.error_msg = error_msg;
    }

    public ErrorVO(int error_code, String error_msg) {
        this.error_code = error_code;
        this.error_msg = error_msg;
    }

    public ErrorVO() {
    }
}
