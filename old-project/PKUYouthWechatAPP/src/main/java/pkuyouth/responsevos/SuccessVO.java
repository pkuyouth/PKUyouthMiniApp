package pkuyouth.responsevos;

/**
 * Created by WangJian on 2017/1/29.
 */
public class SuccessVO extends BasicVO {
    int success;

    public int getSuccess() {
        return success;
    }

    public void setSuccess(int success) {
        this.success = success;
    }

    public SuccessVO(int success) {
        this.success = success;
    }
    public SuccessVO(){
        this.success = 1;
    }
}
