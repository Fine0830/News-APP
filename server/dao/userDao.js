var mysql=require("../node_modules/mysql");
var cookieParser=require("../node_modules/cookie-parser");
exports.loadIndexData=function(req,res){
    var myconnection=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'buzz'
    });
    myconnection.connect();
    console.log(req.query.allItem);
    var sql=" select i_title,i_pictop from t_item limit ? ,7 ";
    var startNum=parseInt(req.query.allItem);
    //if(startNum==49){
    //    startNum=0;
    //}
    //console.log(startNum);
    myconnection.query(sql,[startNum],function(err,data){
        //console.log(data);
        //console.log(err);
        res.send(JSON.stringify(data));
        console.log(JSON.stringify(data));
    });
    myconnection.end();
}
exports.detail=function(req,res){
    var myconnection=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'buzz'
    });
    myconnection.connect();
    var sql="select * from t_item where i_id=?";
    myconnection.query(sql,[req.body.itemId],function(err,data){
        res.render("detail",{myTitle:data});
    });
    myconnection.end();
}

