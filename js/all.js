$().ready(function(){

    $(".header2 li a").click(function(){
        $(".header2 a").removeClass("active");
        $(this).addClass("active");
    });

$(`.fixed-menu .gear`).click(function(){
    $(this).parent('.fixed-menu').toggleClass('testclass')
    if($(this).parent('.fixed-menu').hasClass('testclass')){
        $(this).parent('.fixed-menu').animate({
            right :0
        },500);

        $('body').animate({
            paddingRight:320
        },500);
    }else{
        $(this).parent('.fixed-menu').animate({
            right:'-320px'
        },500) ;

        $('body').animate({
            paddingRight:0
        },500);
    }
});



setInterval(myDate, 1000)

function myDate() {
    const time = new Date();
    document.getElementById('time').innerHTML ="الساعة الآن  " + time.toLocaleTimeString('ar-EG')+"\n الموافق"+time.toLocaleDateString();
}


});