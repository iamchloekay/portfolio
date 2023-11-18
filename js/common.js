let arr = [];
$( document ).ready(function() {
    // masonry 
    let count = $('.grid-masonry img').length;
    $('.grid-masonry img').each(function() {
        let tmpImg = new Image() ;
        tmpImg.onload = function(){
            count--;
            if(count == 0){
                $('.grid-masonry').masonry({
                    // options
                    itemSelector: '.grid-item',
                    columnWidth: '.grid-sizer',
                    percentPosition: true
                });
                
            }
        }
        tmpImg.src = $(this).attr('src');
    });
    
    // lightbox
    // $('.grid-item a').each(function(i,e){
    //     arr.push(new SimpleLightbox(e, {}));
    // });
    let $gallery = new SimpleLightbox('.grid-item a', {});

    // header scroll;
    let lastScrollTop = 0, delta = 15;
    $(window).scroll(function(event){
        const st = $(this).scrollTop();
       
        if(Math.abs(lastScrollTop - st) <= delta) return;
        if ((st > lastScrollTop) && (lastScrollTop>0)) {
            // downscroll code
            const headerHeight = $("header").height();
            $("header").css("top","-"+headerHeight+"px");
            console.log('downscroll');
        } else {
            // upscroll code
            $("header").css("top","0px");
            console.log('upscroll');
        }
        lastScrollTop = st;
    });
});

function menuToggle(){
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("nav").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
}

function menuOnClick(url, el){
    if($(document).width() > 767 ) { // PC
        window.location.href = url;
    }else if($(el).parent().find('ul').length == 0){
        window.location.href = url;
    }else{
        if($(el).parent().hasClass('on')){
            $(el).parent().removeClass('on');
            $("#menu-bg").removeClass("sub-bg");
        }else{
            $(el).parent().addClass('on');
            $("#menu-bg").addClass("sub-bg");
        }
    }
}

function expand(){
    $('.expandable').addClass('expanded');
    $('.see-more').hide();
}
