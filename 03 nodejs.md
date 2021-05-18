## 一.Node.js概述

```
基于谷歌V8,一种运行在服务器端的JS解释器,可以实现所有后端语言的功能,例如java,php能做的Node.js也可以.
```

### 1.对比JS和Node.js

```
1.JS运行在客户端浏览器上,存在多款浏览器,因此有兼容性问题;
  Node.js运行在服务器端,只有谷歌V8引擎一种解释器,不存在兼容性问题.

2.两个都有ES(内置)对象,自定义对象,不同的宿主对象.

3.JS用于开发浏览器端交互效果,Node.js用于服务器的操作,例如数据库访问,网络操作等.
Node.js适合做IO操作为主的应用,不适合做CPU密集型的应用
官网: www.nodejs.org
```

### 2.Node.js的运行方式

```
脚本模式:  node F:/.../01.js 回车
交互模式:  node 回车 进入到交互模式 (两次ctrl+c退出交互模式)
```

## 二.全局对象

### 1.global

```
检测一个变量或者一个函数是否是全局的
(JS下的名字是window)
①在交互模式下,属于全局作用域
②在脚本模式下,不属于全局作用域
③在浏览器下,js文件属于全局作用域
```

```
练习：在脚本文件03_global.js下声明变量a，创建函数fn，查看是否能通过global访问 
var a = 1;
function fn(){
    console.log("fn函数");
}

console.log(global.a);//undefined
console.log(global.fn);//undefined
练习：创建04_window.js和04.html，在js下声明变量a，创建函数fn，查看是否能通过全局window访问
04.html
<script src="./04_window.js"></script>

04_window.js
var a = 1;
function fn(){
    console.log("这是fn函数");
}
console.log(window.a); //1
window.fn();//这是fn函数
```

### 2.console

```
控制台对象,用于测试的时候输出
console.log() 输出日志
console.info() 输出消息
console.warn() 输出警告
console.error() 输出错误
console.time() 开始计时
console.timeEnd() 结束计时
注意: 开始计时和结束计时的参数要保持一致
```

```
练习：查看for、while、do-while分别循环100000的耗时

console.time("for");
for (var i = 0; i < 100000; i++) {

}
console.timeEnd("for");

console.time("while");
var j = 0;
while (j < 100000) {
    j++;
}
console.timeEnd("while");

console.time("do-while");
var k = 0;
do {
    k++;
} while (k < 100000);
console.timeEnd("do-while");

/*
    for: 0.880ms
    while: 2.289ms
    do-while: 0.535ms
*/
```

### 3.process进程

```
计算机上的软件占用相应的内存,CPU
每个运行的软件都可以称作一个进程
process.arch 查看当前CPU架构
process.platform 查看当前的操作系统
process.version 查看当前nodejs的版本号
process.pid 查看当前nodejs版本号
process.kill() 结束指定编号的进程
```

### 4.Buffer

```
缓冲区,缓冲器
buffer数据是一种临时存储在内存中的数据格式,例如: 视频数据
var buf = Buffer.alloc(5,'abcde'); //创建buffer并存储数据
buf.toString() //将buffer数据转为字符串
```

## 三.模块

### 1.模块中的参数

```
模块是一个独立的功能块,Node.js下的每一个文件都是模块
分为自定义模块,核心模块,第三方模块
require() 用于引入其他的模块,得到的是引入模块的导出对象
module 模块的对象
module.exports 当前模块的导出对象,默认是一个空对象,如果要导出内容,需要往对象下添加
__filename 当前模块的绝对路径和模块名称
__dirname 当前模块的绝对路径
```

```
练习:创建主模块main.js和功能模块circle.js，在功能模块下创建两个函数，分别传递半径返回圆的周长和面积，在把两个函数导出；在主模块下引入功能模块，并调用导出的函数。
circle.js
function getLen(r){
    return 2 * Math.PI * r;
}
function getArea(r){
    return Math.PI * r * r;
}

module.exports = {
    getLen: getLen,
    getArea: getArea
};
main.js
var circle = require("./circle.js");
console.log(circle.getLen(5));//31.41592653589793
console.log(circle.getArea(5));//78.53981633974483
```

### 1.模块的分类

|          | 以路径开头                                                   | 不以路径开头                                                 |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 文件模块 | require("./circle.js") <br /> 常用于引入自定义模块           | require("querystring") <br />用于引入官方提供的核心模块,只要安装了nodejs就存在了 |
| 目录模块 | require("./02.ran")<br />会到目录下找package.json文件中main对应的文件,如果找不到会寻找index.js | require("range")<br />会到当前目录下的node_modules中寻找range目录,如果找不到会不断往上一级目录的node_modules中寻找;常用于引入第三方模块 |

```
练习:在03_1.js中引入一个路径开头的目录03_2，目录中包含文件index.js，在文件中导出函数，传递两个参数，计算任意两个数字相加的和。最后在03_1.js中调用该函数。

文件:03_1.js
var obj = require("./03_2");
var res = obj.add(3,5);
console.log(res);

文件:index.js
function add(a,b){
    return a + b;
}
module.exports = {
    add: add
};
```

### 3.包和npm

```
包(package): 指第三方模块,都是目录模块形式
commonJs:是一种规范,指定了模块的引入和导出规范,Node.js模块概念基于这种规范.
npm: 用于管理第三方模块的工具,包括下载安装,升级,卸载,上传...会在nodejs安装的时候附带安装
npm -v 查看版本号
```

#### 1)切换命令行的路径

```
第一种方法: cd 目录的路径  回车
如果有盘符变化,需要添加 盘符名称: 回车
第二种方法: 在要进入的目录的空白区域,按住shift键,单击鼠标右键,选择"在此处打开powershell窗口"
```

#### 2)常用npm命令

```
npm init -y 生成一个package.json文件,是项目说明文件,可以记录安装的包的信息

npm install 包的名称 下载安装包,会将下载的包放入到node_modules目录中,这个目录不存在会自动创建;会将当前包的信息记录在package.json中,会生成一个package-lock.json文件,记录所有包的信息.

npm官网: www.npmjs.com
```

### 4.querystring模块

```
查询字符串模块用于解析和格式化查询字符串
查询字符串: 浏览器向服务器发请求,传递数据的一种方式,位于URL中

http://www.codeboy.com:9999/products.html?kw=戴尔&price=4999
其中(kw=戴尔&price=4999)就是查询字符串

parse() 将查询字符串解析为对象,为了获取其中的数据
```

```
练习:将京东的查询字符解析为对象keyword=thinkpad&enc=utf-8&pvid=20
代码如下:
//引入查询字符串模块
const querystring = require("querystring");
let str = "keyword=thinkpad&enc=utf-8&pvid=20";
//将查询字符串解析为对象
let obj = querystring.parse(str);
console.log(obj); //{ keyword: 'thinkpad', enc: 'utf-8', pvid: '20' }
```

### 5.URL模块

```
网络上任何资源都有对应的URL
http://codeboy.com:9999/products_detail.html?lid=1
协议    域名(IP地址) 端口   文件在服务器的路径   查询字符串

URL模块用于处理和解析URL
parse() 将URL解析为对象
```

```
练习:获取url中查询字符串的数据
https://www.tmooc.cn:443/course/web.html?cid=2004&cname=nodejs

代码如下:
//引入URL模块
const url = require("url");
//引入querystring模块
const querystring = require("querystring");

//准备URL
let str = "https://www.tmooc.cn:443/course/web.html?cid=2004&cname=nodejs";

//将url解析为对象
let obj = url.parse(str);
// console.log(obj);

//将查询字符串解析为对象
let obj2 = querystring.parse(obj.query);
console.log(obj2);//{ cid: '2004', cname: 'nodejs' }
```

### 6.timer模块

```
提供一组定时器函数
```

#### 1)一次型定时器

```
开启
let timer = setTimeout(回调函数,间隔时间);
当间隔时间到了,调用一次回调函数

清除
clearTimeout(timer);
```

#### 2)周期性定时器

```
开启
let timer = setInterval(回调函数,间隔时间);
每隔一段时间,调用一次回调函数

清除
cleatInterval(timer);
```

#### 3)立即执行定时器

```
开启
let timer = setImmediate(回调函数);

清除
clearImmediate(timer);

process.nextTick(回调函数);
```

事件队列: 存放了一组回调函数,等待执行

### 7.文件系统模块

```
nodejs下文件包含有文件形式和目录形式
注意: 操作文件系统模块,必须保证cmd目录在要测试的文件目录下
```

#### 1)查看文件的状态

```
fs.statSync(path)
	isFile() 是否为文件
	isDirectory() 是否是目录
fs.stat(path,callback)
	path 文件的路径
	callback 回调函数,用于获取结果
		err 可能产生的错误
		s 读取的结果
练习1:
//引入fs模块
const fs = require("fs");
let res = fs.statSync("./03_1.js");
console.log(res.isFile()); //true
console.log(res.isDirectory());//false

练习2:
const fs = require("fs");
fs.stat("./01_homework.js",(error,res)=>{
	console.log(res);
});
console.log("执行结束");
```

#### 2)同步和异步

```
同步: 阻止后续代码的执行,执行完当前同步操作才能继续往后执行,通过返回值获取结果

异步: 不会阻止后续代码的执行,在一个独立线程中执行,通过回调函数的方式获取结果
```

#### 3)创建目录

```
mkdir(path,callback) / mkdirSync(path)

练习1:使用异步方法创建目录mydir
//引入fs模块
const fs = require("fs");
fs.mkdir("./mydir",(err,res)=>{
    if(err) throw err;
    console.log("目录创建成功");
});

练习2:使用同步方法创建目录mkdirSync
//引入fs模块
const fs = require("fs");
fs.mkdirSync("./mydirSync");
```

#### 4)读取目录

```
readdir(path,callback) / readdirSync(path)

练习：使用同步方法读取目录mydir
//引入fs模块
const fs = require("fs");
let res = fs.readdirSync("./mydir");
console.log(res); //[ 'myfile.txt' ]
```

#### 5)移除目录

```
rmdir(path,callback) / rmdirSync(path)

练习:使用同步方法移除目录mydirSync
//引入fs模块
const fs = require("fs");
fs.rmdirSync("./mydirSync");
```

#### 6)写入文件 / 创建文件

```
writeFile(path,data,callback) / writeFileSync(path,data)
	path: 文件的路径
	data: 要写入的数据
如果文件不存在,会先创建然后再写入数据
如果文件已经存在,则会覆盖内容写入数据

练习：使用异步方法写入文件01.txt，'下周没课，再去趟非洲'
//引入fs模块
const fs = require("fs");
fs.writeFile("./01.txt","下周没课，再去趟非洲",(err,res)=>{
    if(err) throw err;
})

练习2:使用同步方法写入文件02.txt，'下周没课，再去趟非洲'
//引入fs模块
const fs = require("fs");
fs.writeFileSync("./02.txt","下周没课，再去趟非洲");
```

#### 7)追加写入/创建文件

```
appendFile(path,data,callback) / appendFileSync(path,data)
如果文件不存在,会先创建然后再写入数据
如果文件存在,会追加(在文件末尾)写入数据

练习: 准备一个数组，包含有多个姓名，遍历数组得到每个元素，最后使用同步方法追加写入到data.txt
//引入fs模块
const fs = require("fs");
let arr = ["zero","one","two","three","four","five","six","seven","eight","nine","ten"];
for(let i = 0;i < arr.length;i++){
    fs.appendFileSync("./data.txt",arr[i]+"\n");
}
```

#### 8)读取文件

```
readFile(path,callback) / readFileSync(path)
	err 可能产生的错误
	data 读取到的数据,格式为buffer
	
练习: 使用同步方法读取data.txt中的数据
//引入fs模块
const fs = require("fs");
let res = fs.readFileSync("./data.txt");//获取到的数据是buffer格式
console.log(res.toString());
```

#### 9)删除文件

```
unlink(path,callback) / unlinkSync(path)
```

#### 10)拷贝文件

```
copyFile(src,dest,callback) / copyFileSync(src,dest)
```

#### 11)检测文件是否存在

```
existsSync(path)
如果存在返回true,不存在返回false

练习：如果文件data.txt存在，则同步删除；如果目录mydir不存在，则同步创建该目录。
//引入fs模块
const fs = require("fs");
let res = fs.existsSync("./data.txt");
if(res){
    fs.unlinkSync("./data.txt");
}

let resDir = fs.existsSync("./mydir");
if(!resDir){
    fs.mkdirSync("./mydir");
}
```

#### 12)文件流

```
流是为了解决大文件的操作,如果一次性读取占用的内存空间很大,如果使用流只需要很小空间就可以读取大文件,形式是分段的,每次读取一段
createReadStream(path) 创建可读取的文件流
createWriteStream(path) 创建可写入的文件流(相当于空文件,等待写入)

//引入fs模块
const fs = require("fs");
//创建读取数据的流
let rs = fs.createReadStream("./a.zip");
//事件:一旦有数据流入到内存中,会自动触发回调函数
//on用于添加事件,data(固定的名称)是数据流入的事件
let count = 0;//用于测试文件被分成了多少段
rs.on("data",(chunk)=>{
    //chunk 分块,一段一段的数据
    //每读取1段加1
    count++;
})
//事件: 当读取结束自动触发回调函数
//end 结束的事件,固定写法
rs.on("end",()=>{
    console.log(count);
});

练习: 通过读取流和写入流完成大文件的拷贝
//引入fs模块
const fs = require("fs");
//创建可读取的流
let rs = fs.createReadStream("./a.zip");
//创建可写入的流(想弹雨创建一个空文件)

let ws = fs.createWriteStream("./b.zip");
//把读取到的流通过管道添加到写入流
//管道pipe
rs.pipe(ws);
```

### 8.http模块

#### 1)http协议

```
http协议:是浏览器和web服务器之间的通信协议
(1)通用头信息,包含了部分响应和请求信息
Request URL: 请求的URL,表示浏览器要请求的资源
Request Method: 请求的方法,常见的有get / post
Status Code: 响应的状态码
1**: 正在响应,还没有结束
2**: 成功的响应
3**: 响应的重定向,会跳转到另一个URL
4**: 客户端错误
5**: 服务器端错误

(2)响应的头信息 response
web服务器作出的叫做响应
Content-Type: 响应的文件类型
Content-Length: 响应的文件长度,单位是字节
Location: 跳转的URL,往往结合着状态码302使用

(3)请求的头信息 request
浏览器发出的叫做请求

(4)请求主体
传递的数据,例如注册,登陆传递数据
可有可无,没有传递数据,这项不显示
```

#### 2)创建web服务器

```
创建web服务器
//引入http模块
const http = require("http");
//创建web服务器
const app = http.createServer();
//设置端口号
app.listen(8080);
//通过事件来接收浏览器的请求,一旦请求自动执行回调函数
app.on("request",(req,res)=>{
	req 请求的对象
	req.url 请求的URL,得到的是端口号后的部分,例如 /jianbing
	req.method 请求的方法
	res 响应的对象
	res.writeHead(状态码,头信息对象)//设置状态码和头信息,头信息可以为空
	res.writeHead(302,{
		Location: "https://www.baidu.com"
	});
	res.write();//设置响应的内容
	res.end();//结束并发送响应
});
```

```
练习:
创建web服务器，设置端口为8080，接受浏览器请求,根据浏览器请求的URL作出响应
     /index    响应    '这是首页'
     /login    响应    this  is  login page
     /list      响应文件   list.html （同步读取文件，然后把读取到的响应过去）
     /study    跳转   'https://www.baidu.com'
     其它     响应 404   Not  found  
     
代码如下:
 //引入http模块
const http = require("http");
//引入fs模块
const fs = require("fs");
//创建web服务器
const app = http.createServer();
//设置端口号
app.listen(8080);

//通过事件接收浏览器的请求,一旦请求自动执行回调函数
app.on("request", (req, res) => {
    let reqUrl = req.url;
    if (reqUrl === "/index") {
        res.writeHead(200, {
            "content-type": "text/html;charset=utf-8" //解决中文乱码问题
        });
        res.write("这是首页");
    } else if (reqUrl === "/login") {
        res.write("this is login page");
    } else if (reqUrl === "/list") {
        //先读取文件再响应
        //返回buffer数据
        let result = fs.readFileSync("./list.html");
        //把读取的数据响应到浏览器端,buffer数据隐式转为了字符串
        res.write(result);
    } else if (reqUrl === "/study") {
        //跳转
        res.writeHead(302, {
            Location: "https://www.baidu.com"
        });
    } else {
        //设置状态码为4.4
        res.writeHead(404);
        res.write("Not Found");
    }
    res.end();
})
```



## 四.express

```
基于Node.js平台,快速,开放,极简的WEB开发框架
npm install express   下载安装
```

### 1.创建web服务器

```
const app = express();//创建web服务器
app.listen(8080);//设置端口
```

### 2.路由

```
用来处理特定的请求,根据请求的方法和请求的URL来作出响应,一旦匹配自动执行回调函数

express中请求的对象和响应的对象和之前http模块中的两个不一样,它比之前的功能更为强大

app.get("/login",(req,res)=>{
	req 请求的对象
	req.url 获取请求的URL
	req.method 获取请求的方法
	req.query 获取查询字符串传递的数据
	req.params 获取路由传参的数据
	req.body 获取post传递(流的方式)的数据,需要使用插件才可以(body-parser)
	res 响应的对象
	res.send()设置响应内容并发送
	res.sendFile() 设置响应文件并发送,需要使用绝对路径(__dirname)
	res.redirect() 响应的重定向,执行跳转
})
```

```
练习: 创建文件03_express.js，使用express创建web服务器并设置端口为8080，添加商品列表的路由(get，/list)，响应'这是商品的列表'

代码如下:
// 引入express模块
const express = require("express");
//创建web服务器
const app = express();
//设置端口号
app.listen(8080);
//写路由
app.get("/list",(req,res)=>{
    res.send("这是商品的列表");
});
```

### 3.路由中获取传递的数据

| 传递方式 | 格式             | 获取                                                         |
| -------- | ---------------- | ------------------------------------------------------------ |
| post传递 | 流的方式         | 通过事件,一旦触发执行回调函数<br>req.on("data",(chunk)=>{<br>    // chunk的格式为buffer<br>   // chunk.toString()  //转字符串后为查询字符串,需要使用查询字符串模块解析为对象<br>}) |
| get传递  | 查询字符串       | req.query 结果为对象                                         |
| 路由传参 | /package/express | app.get("/package/:pname",(req,res)=>{<br>    //pname是实参,用于接收实参<br>    req.params 获取传递数据,格式为对象//<br>}) |

```
练习:编写文件04_get.js，使用express创建web服务器，设置端口为8080；创建路由获取搜索的网页(get  /search)，响应文件search.html；

代码如下:
04_get.js
//引入express模块
const express = require("express");
//创建web服务器
const app = express();
//设置端口
app.listen(8080);

//创建路由
app.get("/search",(req,res)=>{
    res.sendFile(__dirname+"/search.html");
});

app.get("/mysearch",(req,res)=>{
    console.log(req.query.username);
    res.send("搜索成功");
});

search.html
<form action="/mysearch" method="get">
    <input type="text" name="username" />
    <input type="submit" value="提交">
</form>
```

```
练习2:
添加获取登陆网页的路由(请求方法:get,请求URL:/login),响应login.html,点击提交,再次发送请求(请求方法post,请求URL:/mylogin),响应”登录成功”
代码如下:
04_get.js
//引入express模块
const express = require("express");
//引入查询字符串模块
const querystring = require("querystring");
//创建web服务器
const app = express();
//设置端口号
app.listen(8080);

//创建路由
app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});

//根据表单的请求,创建对应的路由
app.post("/mylogin", (req, res) => {
	//获取传递的数据
	//post传递的数据也是流的形式
	//通过事件获取
	//事件:一旦有数据流入,自动执行回调函数获取
    req.on("data", (chunk) => {
    	//chunk是获取的分段数据,格式为buffer,需要转换为查询字符串格式
        let data = chunk.toString();
        data = querystring.parse(data);
        console.log(data);
        res.send("登录成功");
    });

});
login.html
<form action="/mylogin" method="post">
        用户名<input type="text" name="username"><br />
        密　码<input type="password" name="password">
        <input type="submit" value="提交">
</form>
```

```
练习3:
练习：创建添加到购物车的路由，(get  /shopping)，传递商品的编号lid和价格price，最后在浏览器端响应 '商品编号：xx  价格：xxx￥'

代码如下:
//引入express模块
const express = require("express");
//创建web服务器
const app = express();
//设置端口号
app.listen(8080);

//创建路由
app.get("/shopping/:lid/:price",(req,res)=>{
    res.send("商品编号:"+req.params.lid+"  价格:"+req.params.price+"￥");
});
```

### 4.对比post和get请求

```
get 请求传递的数据通过查询字符串,可见的,会被浏览器缓存,安全程度低,但是速度快,通常用在搜索等

post 请求传递的数据通过流的方式传递,不可见,安全程度高,但是速度慢,通常用在注册,登陆
```

### 5.路由器

```
1.如果所有的路由写在一个文件下,无法多个人同时开发项目
2.不同的模块下的路由可能会出现相同的URL
3.路由器可以解决以上问题: 将每个功能模块单独的放到路由器下,给每个路由器下的路由添加前缀
```

#### 1.创建路由器

```
user.js
//引入express模块,路由器是express下的一个功能
const express = require("express");
//创建路由器对象
const router = express.Router();
//往路由器中添加路由
router.get("/list",(req,res)=>{
    res.send("这是用户的列表");
});

//这个路由器最终要给web服务器使用的,因此需要导出路由器对象router
module.exports = router;
```

#### 2.在web服务器下引入并挂载

```
// 引入express模块
const express = require("express");
//引入用户路由user.js
const userRouter = require("./user.js");
//创建web服务器
const app = express();
//设置端口号
app.listen(8080);

//把用户路由挂载到web服务器下,给所有路由中的url添加前缀 /user
//参数1: 添加的前缀 访问形式 /user/list
//参数2: 要挂载的路由器
app.use("/user",userRouter);
```

```
练习:
创建web服务器app.js和商品路由器product.js，在路由器下添加路由(get /list)，把路由器挂载到服务器下，并添加前缀/product

代码如下:
app.js
//引入express模块创建web服务器
const express = require("express");
//引入产品路由
const proRouter = require("./pro.js");
//创建web服务器
const app = express();
//设置端口
app.listen(8080);

//把产品路由挂载到web服务器上
app.use("/pro",proRouter);

pro.js
//引入express模块创建路由器
const express = require("express");
//创建路由器
const router = express.Router();

//往路由器中添加路由
router.get("/list", (req, res) => {
    res.send("这是商品的列表");
});
module.exports = router;
```

## 五.中间件

```
所有的app.use()都是在应用中间件
中间件: 用来拦截对路由的请求,为路由服务的.在中间件中既可以获取到请求,也可以做出响应
中间件分为应用级中间件(自定义中间件),路由级中间件,内置中间件,第三方中间件,错误处理中间件
```

### 1.应用级中间件(自定义中间件)

```
app.use(url,(req,res,next)=>{})

url: 表示要拦截的URL,和要拦截的路由中的URL相对应,一旦拦截到会自动执行回调函数;在回调函数中可以获取到请求以及作出响应,next是一个函数,表示要执行下一个中间件或路由
```

```
例子:
//引入express模块创建web服务器
const express = require("express");
//创建web服务器
const app = express();
//设置端口
app.listen(8080);

//添加中间件,拦截对/list的请求
//中间件按照URL来拦截的
//参数1: 要拦截的URL
// 参数2:回调函数,一旦拦截到,就会自动执行
app.use("/list",(req,res,next)=>{
    //req 请求的对象
    //获取查询字符串传递的数据
    let obj = req.query;
    //判断是否为root
    //如果不是root,则响应"请提供管理员账号"
    if(obj.uname != "root"){
        res.send("请提供管理员账号");
    }else{
        //否则,是root账号则会往后执行其他的中间件或路由
        next();
    }
});

//显示所有用户的路由,要求管理员root才有权限
app.get("/list",(req,res)=>{
    res.send("这是所有的用户");
})

```

```
练习:
创建购物车的路由（get  /shopping）,传递商品的价格price(通过查询字符串的方式传递),添加中间件拦截对购物车的请求，在中间件中对传递的商品价格price打9折；最后在路由中响应‘该商品的价格为：xxx’

代码如下:
//引入express模块创建服务器
const express = require("express");
//创建服务器
const app = express();
//设置端口
app.listen(8080);

//添加中间件,拦截对/shopping的请求
app.use("/shopping",(req,res,next)=>{
    req.query.price *= 0.9;
    next();
})

//创建商品路由
app.use("/shopping",(req,res)=>{
    res.send("该商品的价格为: "+req.query.price);
});

```

### 2.路由级中间件

```
就是路由器的使用
```

### 3.内置中间件

```
就是express自带的中间件

只有一个,托管静态资源中间件

静态资源(html,css,js,图像)

如果浏览器要请求服务器端的文件,不需要使用路由响应文件,而是让浏览器自动到某个目录下寻找

app.use(express.static("目录名称"))
```

```
练习:
编写文件04_three.js，创建web服务器，设置端口；托管静态资源到public目录，在该目录下创建文件login.html；点击提交，向服务器发请求(post  /login)，创建对应的路由，响应‘登录成功’；获取到post传递的数据

代码如下:
04_three.js
//引入express模块创建web服务器
const express = require("express");
//引入查询字符串模块
const querystring = require("querystring");
//创建web服务器
const app = express();
//设置端口
app.listen(8080);

//托管静态资源到public目录
app.use(express.static("./public"));

app.post("/login",(req,res)=>{
    req.on("data",(chunk)=>{
        //chunk的格式是buffer,需要转换成查询字符串
        let str = chunk.toString();
        //将查询字符串转为对象
        let data = querystring.parse(str);
        res.send("响应成功");
        console.log(data);//{ username: 'zero', password: '123456' }
    });
});

login.html
<form action="/login" method="post">
        用户名: <input type="text" name="username" /><br />
        密　码: <input type="password" name="password"><br />
        <input type="submit" value="提交" />
</form>
```

### 4.第三方中间件

```
也属于第三方模块,需要先下载安装(比如: npm install body-parser(通常都会附带下载))并引入
```

```
//1.引入body-parser中间件
const bodyParser = require("body-parser");
//应用body-parser中间件,将post请求的数据解析为对象
app.use(bodyParser.urlencoded({
	extended: false;//false表示不使用扩展的qs模块,而是使用核心模块 querystring;true表示使用第三方的qs
}));
//3.在路由中获取post传递数据,格式为对象
req.body
```

```
例子:
//引入express模块创建web服务器
const express = require("express");
//引入body-parser模块,将post请求的数据转为对象
const bodyParser = require("body-parser");
//创建web服务器
const app = express();
//设置端口
app.listen(8080);
//应用body-parser中间件,将post请求的数据转为对象
app.use(bodyParser.urlencoded({
    extended: false
}))
//托管静态资源到public目录下
app.use(express.static("./public"));

//创建路由
app.post("/login",(req,res)=>{
    console.log(req.body);//{ username: 'zero', password: '123456' }
    res.send("登录成功");
});
```

## 六.mysql模块

```
是Node.js下专门用于操作mysql数据库的一个第三方模块
先下载安装 npm install mysql
```

### 1.普通连接

```
//引入mysql模块,使用前确保已下载(npm install mysql)
const mysql = require("mysql");
//创建数据库对象
const c = mysql.createConnection({
	host: "127.0.0.1",
	post: "3306",
	user: "root",
	password: "",
	database: "tedu"
})
//c.connect();//建立连接
//执行SQL语句,同时也会自动建立连接
/*
c.query(sql,callback);
	sql要执行的SQL语句
	callback 使用回调函数获取结果
		err 可能产生的错误
		result SQL语句的执行结果
*/
c.query("select * from emp",(err,result)=>{
	if(err) throw err;
	console.log(result);//result,执行SQL命令的结果
});
```

### 2.使用连接池连接

```
//引入mysql模块
const mysql = require("mysql");
//创建数据连接池
const pool = mysql.createPool({
    host: "127.0.0.1",
    post: "3306",
    user: "root",
    password:"",
    database: "tedu",
    connectionLimit: "20"//设置连接池的大小
});
/*
    //执行sql命令
    pool.query("select * from emp",(err,result)=>{
        if(err) throw err;
        console.log(result);
    });
*/
//执行SQL命令
//参数2:是一个数组,把要过滤的值放入到里面
//占位符(?),过滤好的数据会自动替换占位符
pool.query("select * from emp where eid=?",["2 or 1=1"],(err,result)=>{
	if(err) throw err;
	console.log(result);
});
```

#### sql注入

```
SQL注入: 在用户提供的数据中含有SQL语法
查询是否登录成功
select * from user where uname="range" and upwd="123456" or 1 = 1;
select * from emp where eid = 1 or 1 = 1;
delete * from emp where eid = 1 or 1 = 1;

解决方法: 对所有用户提供的值进行过滤
mysql模块中使用的是占位符(?),先对数据进行过滤,然后再把值添加到SQL命令中(query(SQL命令,要过滤的数据,回调函数))
```

```
练习
//引入mysql模块
const mysql = require("mysql");
//创建数据库连接池对象
const pool = mysql.createPool({
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "",
    database: "tedu",
    connectionLimit: "20" //设置连接池大小
});
//利用对象插入值
let obj = {
    eid: 16,
    ename: "zero",
    sex: 0,
    birthday: "1989-06-25",
    salary: 9000.00,
    deptId: 20
}

pool.query("insert into emp set ?", [obj], (err, result) => {
    if (err) throw err;
    console.log(result);
});
```

```
练习:
创建web服务器，托管静态资源到public目录，在该目录下创建add.html，点击提交按钮，向服务器发送请求(get /add)，创建对应路由获取表单传递的数据，把这个数据插入到mysql数据库下的tedu下的dept表中，响应‘部门添加成功’

代码如下:
01.js
//引入express模块创建web服务器
const express = require("express");
//引入mysql模块
const mysql = require("mysql");

//创建web服务器
const app = express();
//设置端口
app.listen(8080);

// 创建数据库连接池对象
const pool = mysql.createPool({
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "",
    database: "tedu",
    connectionLimit: "20"
});

//托管静态资源到public目录下
app.use(express.static("./public"));

// 创建路由
app.get("/add", (req, res) => {
    let data = req.query;
    pool.query("insert into dept set ?",[data], (err, result) => {
        if (err) throw err;
        if (result.affectedRows !== 0) {
            res.send("部门添加成功");
        }
    });
});

add.html
<form action="/add" method="get">
        部门编号<input type="text" name="deptId" /><br />
        部门名称<input type="text" name="dname" /><br />
        <input type="submit" />
</form>
```







