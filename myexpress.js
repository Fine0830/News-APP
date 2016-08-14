var express =require("./server/node_modules/express");
var ejs=require("./server/node_modules/ejs");
var partials=require("./server/node_modules/express-partials");
var fs=require("fs");
var userDao=require("./server/dao/userDao.js");
var buzzDao=require("./server/dao/buzzDao.js");
var app = express();
app.set("port",8888);//设置app端口

app.configure(function(){
    app.set("views", __dirname + "/client/views");// 视图目录
    app.engine('html',ejs.__express);
    app.set("view engine", "html");//启动视图引擎
    app.use(express.logger("dev"))
    app.use(express.bodyParser()); //post请求数据
    app.use(express.methodOverride());   //非get post请求转换
    app.use(app.router);   //路由分发
    app.use(express.static(__dirname + '/client'));//资源路径
    app.use(express.errorHandler());
    app.use(partials());

})
app.listen(app.get('port'),function(){//服务器监听端口号
    console.log(app.get('port'))
})
app.get("/loadIndexData.do",function(req,res){
    console.log("enter data")
    userDao.loadIndexData(req,res);
})
app.post("/loadSportsData.do",function(req,res){
    buzzDao.loadIndexData(req,res);
//    console.log("2222");
})
app.post("/detail.html",function(req,res){
    userDao.detail(req,res);
})
app.get("/page/register.html",function(req,res){
    res.sendfile("client/page/register.html");
})
//app.all("buzz.html",function(req,res){
//    //console.log("enter data");
//    //userDao.loadIndexData(req,res);
//    res.indirect("buzz.html");
//})