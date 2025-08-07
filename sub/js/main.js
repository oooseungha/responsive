

// -------------- jQuery
$(function(){
  let gnbBtn = $('.PC_header .PC_header_02 .gnb_box');
  let gnbMenu = $('.PC_header .PC_header_02 .menu_box');

  gnbBtn.mouseover(function() {
    gnbMenu.stop().slideDown(300);
  });
  gnbBtn.mouseout(function(){
    gnbMenu.stop().slideUp(300);
  }); // @@@@ gnb_fulldown_event



  $('body').scroll(function () {
    if ($('body').scrollTop() >= 100) {
      $('.PC_header_02').addClass('fixed');
    } else {
      $('.PC_header_02').removeClass('fixed');
    }
  }); // @@@@ fixed_event @@@@


  let topBtn = $('.quick_menu .top_btn');

  topBtn.click(function (e) {
    e.preventDefault();
    $('html, body').stop().animate({
      scrollTop: 0
    }, 500)
  }); //top_btn_event


});




