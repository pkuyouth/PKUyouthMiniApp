功能api
所有编码均为utf-8
请求地址是104.194.84.194:8081
所有的post方法的请求header均为Content-Type: application/json
所有的api的失败返回均如下所示：
失败：
{
	“error_code”: 10,
	“error_msg”: “发生内部错误！开发同学正在维护中！”
}
参数说明：error_code指错误号
error_msg指错误相关信息
1、用户登录
地址	/pkuyouth/login
https方法	post
body	{
   “code”:”asdfasdfa”
}
参数解释：	code：指小程序登录时wx.login函数返回的code
返回json	{
“access_token”:”asdfasdfasdf”
}
返回参数解释：	session是第三方服务器生成的session
注：由于考虑采用rest api，所以不按照微信小程序开发文档所说，将生成的第三方session存入session；而是直接返回生成的第三方access_token,即采用access_token的鉴权方式，小程序与服务器的后续通信，url中均需要带有access_token参数
由于登录的过期时间由微信方面控制，可以由小程序方面调用wx.checkSession方法查询，因此这里不设置access_token的过期时间，一切以微信方面的登录态过期时间为准。

2、换一批

地址	/pkuyouth/replace
url参数	access_token=asdfadsfad
https方法	get
参数	无
参数解释：	无
返回json	{
	“article_count”: 10,
	“articles”:[
			{
             “id”：1234567,
				“title”: “标题标题标题”,
				“desc”: “文章描述，就是文章大图下面的那些小字”,
				“pic_url”:“http://www.xxx.com:8080/xxxx”,
             “url”: “http://xxxxxx”
}
……
]
	
}
返回参数解释：	id：文章的id，每篇文章唯一
article_count:文章的数目
articles：文章列表，其中每一个元素代表一个文章
title：文章题目
desc：文章描述
pic_url：图片的url
url：文章的url


3、搜索文章
地址	/pkuyouth/search
https方法	post
url参数	access_token=adsfasdfads
header	Content-Type: application/json
参数	{
   “content”:“你好”
}
参数解释：	content中包含搜索文章时搜索框中输入的内容，可能包含日期，题目，作者，文章内容等任意字符串
返回json	{
	“article_count”: 10,
	“articles”:[
			{
             “id”：1234567
				“title”: “标题标题标题”,
				“desc”: “文章描述，就是文章大图下面的那些小字”,
				“pic_url”:“http://www.xxx.com:8080/xxxx”,
             “url”: “http://xxxxxx”
}
]
	
}
返回参数解释：	id：文章的id，每篇文章唯一
article_count:文章的数目
articles：文章列表，其中每一个元素代表一个文章
title：文章题目
desc：文章描述
pic_url：图片的url
url：文章的url


4、获取栏目
地址	/pkuyouth/subject
https方法	post
url参数	access_token=adsfasdfads
header	Content-Type: application/json
参数	{
   “subject”:”光阴”
}
参数解释：	content中包含搜索文章时搜索框中输入的内容，可能包含日期，题目，作者，文章内容等任意字符串
返回json	{
	“article_count”: 10,
	“articles”:[
			{
             “id”：1234567
				“title”: “标题标题标题”,
				“desc”: “文章描述，就是文章大图下面的那些小字”,
				“pic_url”:“http://www.xxx.com:8080/xxxx”,
             “url”: “http://xxxxxx”
}
]
	
}
返回参数解释：	id：文章的id，每篇文章唯一
article_count:文章的数目
articles：文章列表，其中每一个元素代表一个文章
title：文章题目
desc：文章描述
pic_url：图片的url
url：文章的url


5、文章展示
地址	/pkuyouth/show
https方法	post
url参数	access_token=adsfasdfads
body中json	{
   “article_id”: “1234567”
}
参数解释：	article_id指的是文章的id，独一无二
返回json	{
	            “id”：1234567
				“title”: “标题标题标题”,
				“desc”: “文章描述，就是文章大图下面的那些小字”,
				“pic_url”:“http://www.xxx.com:8080/xxxx”,
            “url”:” http://xxxxxx”,
             “approve”:1,
             “approve_count”:100,
             “collect”:1,
            “comments”:[
                         {
                          “comment_id”:1,
                          “is_user”:1,
                         “user_name”:”王健”,
                         “user_img_url”:”http://xxxx”,
                         “comment”:”北大青年万岁”,
                         “approve_count”:10,
                         “approve”: 0
                         “response”:”作者回复”
                         }
]
}
返回参数解释：	id：文章的id，每篇文章唯一
title：文章题目
desc：文章描述
pic_url：图片的url
url：文章的url
approve：本读者对本文是否赞，赞：1，不赞：0
approve_count : 评论的点赞数
collect：本读者对本文是否收藏，收藏:1，不收藏：0
comments：本文下的所有评论内容列表
comment_id：评论的id
is_user : 是否是本人发表的评论，1：是，0：不是
user_name：每条评论的评论人昵称
user_img_url：每条评论的评论人头像
comment：评论的具体内容
approve_count : 评论的点赞数
response ： 作者回复
approve：本读者对本评论是否赞，赞：1，不赞：0


6、意见反馈
地址	/pkuyouth/suggestion
https方法	post
url参数	access_token=adsfasdfads
body中json	{
   “user_name”:”王健”,
   “suggestion”:”我爱死北青了！”
}
参数解释：	user_name指的是用户的微信昵称
suggestion指的是用户的意见内容
返回json	{
   “success”:1
}
返回参数解释：	success：若反馈成功则返回success = 1，如果反馈调用失败，则返回文档开头写的失败json


7、读者点赞
地址	/pkuyouth/approve
https方法	post
url参数	access_token=adsfasdfads
body中json	{
   “article_id”:”1234567”,
}
参数解释：	article_id指的是文章的id，独一无二 

返回json	{
   “success”:1
}
返回参数解释：	success：若点赞成功则返回success = 1，如果点赞调用失败，则返回文档开头写的失败json


8、读者取消赞
地址	/pkuyouth/cancel_approve
https方法	post
url参数	access_token=adsfasdfads
body中json	{
   “article_id”:”1234567”,
}
参数解释：	article_id指的是文章的id，独一无二 

返回json	{
   “success”:1
}
返回参数解释：	success：若取消赞成功则返回success = 1，如果取消赞调用失败，则返回文档开头写的失败json


9、读者收藏
地址	/pkuyouth/collect
https方法	post
url参数	access_token=adsfasdfads
body中json	{
   “article_id”:”1234567”,
}
参数解释：	article_id指的是文章的id，独一无二 

返回json	{
   “success”:1
}
返回参数解释：	success：若收藏成功则返回success = 1，如果收藏调用失败，则返回文档开头写的失败json

10、读者取消收藏
地址	/pkuyouth/cancel_collect
https方法	post
url参数	access_token=adsfasdfads
body中json	{
   “article_id”:”1234567”,
}
参数解释：	article_id指的是文章的id，独一无二 

返回json	{
   “success”:1
}
返回参数解释：	success：若取消收藏成功则返回success = 1，如果取消收藏调用失败，则返回文档开头写的失败json

11、读者查看收藏
地址	/pkuyouth/view_collect
https方法	Get
url参数	access_token=adsfasdfads
返回json	{
	“article_count”: 10,
	“articles”:[
			{
             “id”：1234567,
				“title”: “标题标题标题”,
				“desc”: “文章描述，就是文章大图下面的那些小字”,
				“pic_url”:“http://www.xxx.com:8080/xxxx”,
             “url”: “http://xxxxxx”
}
……
]
	
}
返回参数解释：	同“搜索文章”


12、读者评论
地址	/pkuyouth/comment
https方法	post
url参数	access_token=adsfasdfads
body中json	{
   “article_id”:”1234567”,
   “user_name”:”王健”,
   “user_pic_url”:”http://xxx”,
   “comment”:”爱死北青了”
}
参数解释：	article_id指的是文章的id，独一无二 
user_name指的是用户的微信昵称
user_pic_url指的是用户头像的url
comment指的是用户评论的内容
返回json	{
   “success”:1
}
返回参数解释：	success：若评论成功则返回success = 1，如果评论调用失败，则返回文档开头写的失败json

13、读者取消评论
地址	/pkuyouth/cancel_comment
https方法	post
url参数	access_token=adsfasdfads
body中json	{
   “article_id”:”1234567”,
   “comment_id”:1
}
参数解释：	article_id指的是文章的id，独一无二 
comment_id指的是评论的id
返回json	{
   “success”:1
}
返回参数解释：	success：若评论成功则返回success = 1，如果评论调用失败，则返回文档开头写的失败json


14、获取所有栏目
地址	/pkuyouth/get_all_subject
https方法	get
url参数	access_token=adsfasdfads
返回json	
[
{
“name”:”调查”,
“img”:”img/diaocha.jpg”
},
…
]
返回参数解释：	返回的是一个json列表，其中每一项是一个栏目，其中包含了栏目名称和题图路径两个参数

15、评论点赞
地址	/pkuyouth/comment_approve
https方法	post
url参数	access_token=adsfasdfads
body中json	{
   “article_id”:”1234567”,
   “comment_id”:1
}
参数解释：	comment_id指的是评论的id，独一无二 
article_id指的是文章的id
返回json	{
   “success”:1
}
返回参数解释：	success：若点赞成功则返回success = 1，如果点赞调用失败，则返回文档开头写的失败json


16、读者取消评论赞
地址	/pkuyouth/cancel_comment_approve
https方法	post
url参数	access_token=adsfasdfads
body中json	{
   “article_id”:”1234567”,
“comment_id”:1
}
参数解释：	 article_id指的是文章的id
comment_id指的是评论的id，独一无二 

返回json	{
   “success”:1
}
返回参数解释：	success：若取消赞成功则返回success = 1，如果取消赞调用失败，则返回文档开头写的失败json

