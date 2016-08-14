
var state=true;
function scrollBar(){
    $(document).scroll(function(){
        if($(window).scrollTop()+10>=$(document).height()-$(window).height()&&state==true&&$(window).scrollTop()!=0){
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
$(".sports").on("tap",function(){
    $(".content").html="";
    createBlocksandItems();
    scrollBar();
});
function createBlocksandItems(){
    $.post("/loadSportsData.do",{allItem:itemId},function(data){
//        console.log(data);
        var a =JSON.parse(data);
        var block=new Blocks();
        for(var i=1;i<=7;i++){
            var src=a[i-1].i_pictop;
            var caption=a[i-1].i_title;
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
    this.itemObj.find("p").css("cursor","pointer");
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
//function backSports(){
//    window.location="sports.html";
//}
function back(){
    window.location="../buzz.html";
    $(".content").html="";
    createBlocksandItems();
    scrollBar();
}
//function backEntertainment(){
//    window.location="entertainment.html";
//}