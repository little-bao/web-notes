//引入express模块创建服务器
const express = require("express");
//引入用户路由器模块
const userRouter = require("./router/user.js");
//引入body-parser模块,将post请求的数据转为对象
const bodyParser = require("body-parser");

//创建web服务器
const app = express();
//设置端口
app.listen(8080);

//应用body-parser中间件
app.use(bodyParser.urlencoded({
    extended: false
}));

//托管静态资源到目录public
app.use(express.static("./public"));

//挂载用户路由器到web服务器下
app.use("/user",userRouter);
