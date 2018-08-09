package pkuyouth.responsevos;

/**
 * Created by yt476 on 2017/11/4.
 */
public class SubjectVO {
    private String name;
    private String img;

    public SubjectVO() {
    }

    public SubjectVO(String name, String img) {
        this.name = name;
        this.img = img;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
