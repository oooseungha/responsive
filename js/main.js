

// -------------- jQuery
$(function () {
  let gnbBtn = $('.PC_header .PC_header_02 .gnb_box');
  let gnbMenu = $('.PC_header .PC_header_02 .menu_box');

  gnbBtn.mouseover(function () {
    gnbMenu.stop().slideDown(300);
  });
  gnbBtn.mouseout(function () {
    gnbMenu.stop().slideUp(300);
  }); // @@@@ gnb_fulldown_event



  const calandarDay = $('.calandar_wrap .date_list .day li');


    $('.calandar_wrap .date_list .date').on('click', 'li', function (e) {
    e.preventDefault();


    $('.calandar_wrap .date_list .date li').removeClass('date_on');
    $(this).addClass('date_on');


    let index = $(this).index() % 7;
    calandarDay.removeClass('day_on');
    calandarDay.eq(index).addClass('day_on');

  }); // @@@@ calandar_date_event


  const calandarList = $('.calandar_wrap .calandar_list .calandar_sheet ul')

  calandarList.click(function () {
    calandarList.removeClass('list_on');
    $(this).addClass('list_on');
  }); // @@@@ calandar_list_event


  let topBtn = $('.quick_menu .top_btn');

  topBtn.click(function (e) {
    e.preventDefault();
    $('html, body').stop().animate({
      scrollTop: 0
    }, 500)
  }); // @@@@ top_btn_event



  $(function () {
    $(window).scroll(function () {
      if ($(window).scrollTop() >= 100) {
        $('.PC_header_02').addClass('fixed');
      } else {
        $('.PC_header_02').removeClass('fixed');
      }
    });
  }); // @@@@ fixed_event @@@@


  function initSlick() {
    if (window.innerWidth >= 769) {
      if (!$('.movie_sheet_01').hasClass('slick-initialized')) {
        $('.movie_sheet_01').slick({
          infinite: true,
          slidesToShow: 5,
          slidesToScroll: 5,
          arrows: true,
          prevArrow: $('.movie_left_btn_01')[0],
          nextArrow: $('.movie_right_btn_01')[0]
        });
      }
      if (!$('.movie_sheet_02').hasClass('slick-initialized')) {
        $('.movie_sheet_02').slick({
          infinite: true,
          slidesToShow: 5,
          slidesToScroll: 5,
          arrows: true,
          prevArrow: $('.movie_left_btn_02')[0],
          nextArrow: $('.movie_right_btn_02')[0]
        });
      }
    }
  }

  function destroySlick() {
    if (window.innerWidth < 769) {
      if ($('.movie_sheet_01').hasClass('slick-initialized')) {
        $('.movie_sheet_01').slick('unslick');
      }
      if ($('.movie_sheet_02').hasClass('slick-initialized')) {
        $('.movie_sheet_02').slick('unslick');
      }
    }
  }

  initSlick();
  destroySlick();

  $(window).on('resize', function () {
    destroySlick();
    initSlick();
  });

  $('.movie_tab_btn label').on('click', function () {
    const target = $(this).attr('for');
    setTimeout(() => {
      if (window.innerWidth >= 769) {
        if (target === 'movie_tab_01') {
          $('.movie_sheet_01').slick('setPosition');
        } else if (target === 'movie_tab_02') {
          $('.movie_sheet_02').slick('setPosition');
        }
      }
    }, 100);
  }); // @@@@ movie_slide_event


  function initKeywordSlick() {
    if (window.innerWidth >= 1024) {
      if (!$('.keyword_row_01').hasClass('slick-initialized')) {
        $('.keyword_row_01').slick({
          infinite: true,
          autoplay: true,
          autoplaySpeed: 0,
          speed: 5000,
          cssEase: 'linear',
          arrows: false,
          variableWidth: true
        });
      }
      if (!$('.keyword_row_02').hasClass('slick-initialized')) {
        $('.keyword_row_02').slick({
          infinite: true,
          autoplay: true,
          autoplaySpeed: 0,
          speed: 5000,
          cssEase: 'linear',
          arrows: false,
          variableWidth: true
        });
      }
    }
  }

  function destroyKeywordSlick() {
    if (window.innerWidth < 1024) {
      if ($('.keyword_row_01').hasClass('slick-initialized')) {
        $('.keyword_row_01').slick('unslick');
      }
      if ($('.keyword_row_02').hasClass('slick-initialized')) {
        $('.keyword_row_02').slick('unslick');
      }
    }
  }

  initKeywordSlick();
  destroyKeywordSlick();

  $(window).on('resize', function () {
    destroyKeywordSlick();
    initKeywordSlick();
  });// @@@@ keyword_slide_event



let recommendData = [];

fetch('./js/recommend.json')
  .then(response => response.json())
  .then(data => {
    recommendData = data; 

    $('.recommend_movie').click(function () {
      const index = $(this).index();
      const selectedMovie = recommendData[index];

      $('.recommend_none_select').css('display', 'none');
      $('.recommend_result .recommend_img_box').css('background-image', `url(${selectedMovie.image})`);
      $('.recommend_movie_info .recommend_movie_title').text(selectedMovie.movieTitle).css('display', 'block');
      $('.recommend_movie_info .running_time').text(selectedMovie.schduleTime).css('display', 'block');
    });



  });
});




// -------------- javaScript

document.addEventListener('DOMContentLoaded', function () {
  let swiper = new Swiper(".mySwiper", {
    loop: true,
    speed: 700,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  }); // @@@@ wide_banner_swiper



// @@@@ calandar_event
// date_reset
let today = new Date();
let nowYear = today.getFullYear();
let nowMonth = today.getMonth();
// months
const months = ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'];

const dateList = document.querySelector('.date');
const currentMonth = document.querySelector('.month_text');
const calandarIcon = document.querySelectorAll('.calandar_btn');



//---------------------------------------- calandar_load_event
const callCalandar = () => {

  let lastDateOfMonth = new Date(nowYear, nowMonth + 1, 0).getDate();
  let lastDateOfLastMonth = new Date(nowYear, nowMonth, 0).getDate();
  let firstDayOfMonth = new Date(nowYear, nowMonth, 1).getDay();
  let lastDayOfMonth = new Date(nowYear, nowMonth, lastDateOfMonth).getDay();

  // 0) 달 호출
  currentMonth.innerHTML = `${months[nowMonth]}`;

  let dateText = '';

  // 1) 지난달 날짜
  for (let i = firstDayOfMonth; i > 0; i--) {
    dateText += `<li class="date_inactive">${lastDateOfLastMonth - i + 1}</li>`;
  }

  // 2) 이번달 날짜
  for (let i = 1; i <= lastDateOfMonth; i++) {
    dateText += `<li><a>${i}</a></li>`;
  }

  // 3) 다음달 날짜
  for (let i = lastDayOfMonth; i < 6; i++) {
    dateText += `<li class="date_inactive">${i - lastDayOfMonth + 1}</li>`;
  }

  dateList.innerHTML = dateText;


  // @@@@ today_select_event 
  if (today.getFullYear() === nowYear && today.getMonth() === nowMonth) {
    const todayDate = today.getDate();
    const calandarDate = $('.calandar_wrap .date_list .date li');
    const calandarDay = $('.calandar_wrap .date_list .day li');

    calandarDate.removeClass('date_on');
    calandarDay.removeClass('day_on');

    calandarDate.eq(todayDate + 1).addClass('date_on');
    calandarDay.eq((todayDate + 1) % 7).addClass('day_on');
  }

};


//---------------------------------------- calandar_month_btn_event
calandarIcon.forEach((icon) => {
  icon.addEventListener('click', () => {
    if (icon.classList.contains('month_btn_left')) {
      nowMonth -= 1;
      if (nowMonth < 0) {
        nowMonth = 11;
      }
    } else if (icon.classList.contains('month_btn_right')) {
      nowMonth += 1;
      if (nowMonth > 11) {
        nowMonth = 0;
      }
    }
    callCalandar();
  });
});

callCalandar();


// calandar_date_click_event ☆☆☆☆★★★★ㅁ8























}); 
