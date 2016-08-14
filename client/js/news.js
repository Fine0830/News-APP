//    $("#mycarousel").on("swipeleft",function(){
//        $("#mycarousel").carousel("next");
//        alert("成功");
//    })
//    $("#mycarousel").on("swiperight",function(){
//        $("#mycarousel").carousel("prev");
//        alert("成功");
//    })
$("#myHeader span:first-child").click(function(){
    if($("#logo")[0].innerHTML=="Moment"){
        $("#menu").panel("open");
    }else{
        $("#myMenu").css({"font-family":"myIcon"});
        $("#myMenu")[0].innerHTML="&#xe623;";
        $("#logo")[0].innerHTML="Moment";
        $("#search").css("color","white");
    }

});
$("#search").click(function(){
    if($("#logo")[0].innerHTML=="Moment"){

        $("#myMenu").css({"font-family":"return"});
        $("#myMenu")[0].innerHTML="&#xe61c;";
        $("#logo")[0].innerHTML="<input type='text' placeholder='search'/>";
        $("#myHeader input").css({"width":"60%","background":"transparent","outline":"none",
            "border":"0","fontSize":"14px"});
    }else{
        alert("现在是绿色的")
    }


})

$(".myHead").click(function () {
    $("#newsPage").load("myInformation.html");
})