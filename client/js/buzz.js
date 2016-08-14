var state=true;
function scrollBar(){
        $(document).scroll(function(){
            if($(window).scrollTop()+10>=$(document).height()-$(window).height()&&state==true&&$(window).scrollTop()!=0){
                //console.log($(window).scrollTop());
                //console.log($(document).height());
                //console.log($(window).height());
                $(".footer").show();
                createBlocksandItems();
                setTimeout(function(){
                    $(".footer").hide();
                },2000);
            }
        })
}
var itemId=0;
$(function(){
    createBlocksandItems();
    scrollBar();
});
function createBlocksandItems(){
    $.getJSON("loadIndexData.do",{allItem:itemId},function(JSON){
        var block=new Blocks();
        for(var i=1;i<=7;i++){
            var src=JSON[i-1].i_pictop;
            //var src="./images/music2-detail1.jpg";
            var caption=JSON[i-1].i_title;
            itemId++;
            var item=new Items(src,caption,i,itemId,block.thisBlock);
        }
    });
}
function Blocks(){
    this.blockObj=$(
        " <div class='block'>" +
            "<div class='ui-grid-a' >" +
                "<div class='leftCol ui-block-a'></div>" +
                "<div class='rightCol ui-block-b'></div>" +
             "</div>" +
             "<div class='centerCol'></div>" +
        "</div>"
    );
    this.leftCol=this.blockObj.find(".leftCol");
    this.rightCol=this.blockObj.find(".rightCol");
    this.centerCol=this.blockObj.find(".centerCol");
    this.blockObj.appendTo(".content");
    this.thisBlock=this;
}
function Items(src,caption,numCol,itemId,thisBlock){
    this.src=src;
    this.caption=caption;
    this.numCol=numCol;
    this.itemId=itemId;
    this.itemObj=$("<div class='buzzItem'><div class='item-pic'></div><div class='item-caption'><p></p></div></div>");
    this.itemObj.find(".item-pic").css("backgroundImage","url("+this.src+")");
    this.itemObj.find("p").text(this.caption);
    if(this.numCol%2==0){
        this.itemObj.appendTo(thisBlock.rightCol);
    }else if(this.numCol%7==0){
        this.itemObj.appendTo(thisBlock.centerCol);
    }else if(this.numCol%2!=0){
        this.itemObj.appendTo(thisBlock.leftCol);
    }
    var _this=this;
    this.itemObj.on("tap",function(){
        //console.log(_this);
        $(this).toggleClass("tapChange");
        $(".content").load("detail.html",{itemId:_this.itemId});
        $("#myHeader span:nth-child(1)").hide();
        $("#myHeader span:nth-child(2)").show();
        $("#myHeader span:nth-child(2)").click(function(){
            back();
        });
        state=false;
    })
}
$("#myHeader span:nth-child(4)").on("tap",function(){
    $(".content").html("");
    $(".content").load("page/login.html");
})
$("#myHeader span:nth-child(6)").on("tap",function(){
    $(".content").html("");
    $(".content").load("page/register.html");
})
function back(){
   window.location="buzz.html";
}
//function backSports(){
//    window.location="/page/sports.html";
//}
//function backEntertainment(){
//   window.location="/page/entertainment.html";
//}