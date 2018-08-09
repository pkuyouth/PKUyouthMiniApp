package pkuyouth;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.junit.Test;
import pkuyouth.dao.ArticleMessageMapper;
import pkuyouth.dao.SummaryDataMapper;
import pkuyouth.dtos.ArticleMessage;
import pkuyouth.dtos.SummaryData;

import javax.annotation.Resource;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by yt476 on 2017/8/4.
 */
public class DatabaseTest extends BaseTest {
    @Resource
    ArticleMessageMapper articleMessageMapper;

    @Resource
    SummaryDataMapper summaryDataMapper;
    private static String path = "E:\\Wangjian\\北青微信\\";

    private void writeFile(String text, String filePath) throws IOException {
        File file = new File(filePath);
        BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file)));
        bufferedWriter.write(text);
        bufferedWriter.close();
    }

    @Test
    public void readSummaryData() throws IOException {
        List<SummaryData> summaryDataList = summaryDataMapper.getSummaryData();
        JSONArray summaryDataJson = (JSONArray) JSONObject.toJSON(summaryDataList);
        System.out.println(summaryDataJson.toJSONString());
        writeFile(summaryDataJson.toJSONString(), path + "summary_data.txt");
    }

    @Test
    public void readArticleMessage() throws IOException {
        List<ArticleMessage> articleMessages = articleMessageMapper.getArticleMessages();
        JSONArray articleMessageJSON = (JSONArray) JSONObject.toJSON(articleMessages);
        System.out.println(articleMessageJSON.toJSONString());
        writeFile(articleMessageJSON.toJSONString(), path + "article_message.txt");
    }

    @Test
    public void readArticleContent() throws IOException {
        List<ArticleMessage> articleMessages = articleMessageMapper.getArticleMessages();
        List<ArticleFullText> articleFullTexts = new ArrayList<ArticleFullText>();
        for(ArticleMessage articleMessage:articleMessages){
            String url = articleMessage.getUrl();
            String content = getArticleContent(url);
            ArticleFullText articleFullText = new ArticleFullText();
            articleFullText.setId(articleMessage.getANo());
            articleFullText.setText(content);
            articleFullTexts.add(articleFullText);
            if(articleMessage.getANo()%10 ==0){
                System.out.println(articleMessage.getANo());
            }
        }
        JSONArray articleFullTextJson = (JSONArray) JSONObject.toJSON(articleFullTexts);
        System.out.println(articleFullTextJson.toJSONString());
        writeFile(articleFullTextJson.toJSONString(), path + "article_full_text.txt");
    }

    class ArticleFullText{
        private Integer id;
        private String text;

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }
    }


    private String getArticleContent(String url){
        Document doc = null;
        try {
            doc = Jsoup.connect(url).get();
        } catch (IOException e) {
            throw new RuntimeException("cannot connect the article url");
        }
        String document = doc.toString().replaceAll("section", "p");
        doc = Jsoup.parse(document);
        Elements p = doc.select("p");
        StringBuilder result = new StringBuilder();
        boolean isWrite = true;
        for (Element e : p) {
            Elements children = e.children();
            for(Element img:children){
                if(img.is("img") && isWrite)
                    // System.out.println(img);
                    result.append(img);
            }
            if (haveSubSection(children)) {
                continue;
            }
            String text = e.text();
            if(StringUtils.isEmpty(text)||StringUtils.isAllBlank(text)){
                continue;
            }
            // System.out.println(text);
            /*
            if(text.contains("本报记者")||text.contains("摄影")){
                isWrite = true;
            }
            */
            text = text+"\n";
            if(text.contains("微信编辑")){
                isWrite = false;
            }
            if(isWrite) {
                result.append(text);
            }
        }
        return result.toString();
    }
    private boolean haveSubSection(Elements children) {
        for (Element e : children) {
            if (e.is("p")) {
                return true;
            }
        }
        return false;
    }
}
