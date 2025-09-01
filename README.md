# 영화의전당 Responsive Web 팀 프로젝트
media-query 활용 반응형 웹사이트 제작
<br/><br/>

### 🌐 프로젝트 소개
영화 산업 트렌드의 변화와 함께 온라인/모바일 예매가 활성화되고 있으나,  
그에 대응하지 못하는 미비한 영화의전당 모바일 사이트를 리뉴얼한 반응형 웹사이트입니다.
<br/><br/>

### 👥 멤버 구성(6명)
- 오승하, 김선영, 김제동, 우장호, 정명선, 최봉규  
- 자료 조사/기획/브레인 스토밍/아이디어 스케치/Figma 활용 시안 제작 **팀원 전원 참여**  
- 프론트엔드·퍼블리싱 과정 **단독 진행**
<br/><br/>

### 📅 기획/개발 기간
- 25.06.09. ~ 25.07.11.  
- 기획·디자인 2주 / 개발 2주
<br/><br/>

### 💡 반응형 설계 기준
- **Mobile**  
모바일에서 Wide PC 순서로 스타일 작성

- **Tablet**  
@media all and (min-width: 601px) and (max-width: 768px) {}  
@media all and (min-width: 601px) {}

- **PC**  
@media all and (min-width: 769px) and (max-width: 1024px) {}  
@media all and (min-width: 769px) {}

- **Wide PC**  
@media all and (min-width: 1279px) {}
<br/><br/>

### 🛠️ 코드 리뷰
## (1) Gnb 메뉴 hover 시 메뉴 슬라이드 이벤트 구현
- jQuery slideDown/slideUp 메서드를 사용해 부드러운 애니메이션 처리

```javaScript
// jQuery

$(function () {
  let gnbBtn = $('.PC_header .PC_header_02 .gnb_box');
  let gnbMenu = $('.PC_header .PC_header_02 .menu_box');

  gnbBtn.mouseover(function () {
    gnbMenu.stop().slideDown(300);
  });
  gnbBtn.mouseout(function () {
    gnbMenu.stop().slideUp(300);
  }); // @@@@ gnb_fulldown_event
```
<br/><br/>

## (2) 캘린더 구현 및 제어
- today, nowYear, nowMonth로 현재 연도·월 저장, months 배열로 월 텍스트 정의
- callCalandar 함수로 달력 생성 -> 날짜 계산 후 dateList에 HTML 적용
- 버튼 생성하여 월 이동 (nowMonth-- / nowMonth++)

```javaScript
// javaScript & jQuery

let today = new Date();
let nowYear = today.getFullYear();
let nowMonth = today.getMonth();

const months = ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'];

const dateList = document.querySelector('.date');
const currentMonth = document.querySelector('.month_text');
const calandarIcon = document.querySelectorAll('.calandar_btn');

const callCalandar = () => {

  let lastDateOfMonth = new Date(nowYear, nowMonth + 1, 0).getDate();
  let lastDateOfLastMonth = new Date(nowYear, nowMonth, 0).getDate();
  let firstDayOfMonth = new Date(nowYear, nowMonth, 1).getDay();
  let lastDayOfMonth = new Date(nowYear, nowMonth, lastDateOfMonth).getDay();

  currentMonth.innerHTML = `${months[nowMonth]}`;
  let dateText = '';

  for (let i = firstDayOfMonth; i > 0; i--) {
    dateText += `<li class="date_inactive">${lastDateOfLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateOfMonth; i++) {
    dateText += `<li><a>${i}</a></li>`;
  }

  for (let i = lastDayOfMonth; i < 6; i++) {
    dateText += `<li class="date_inactive">${i - lastDayOfMonth + 1}</li>`;
  }

  dateList.innerHTML = dateText;
};

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
```

<br/>

## (3) 날짜 선택 시 해당 날짜와 요일에 하이라이트 이벤트 처리
- .date 리스트 클릭 시 클릭한 날짜에 'date_on' 클래스 추가
- 클릭한 날짜의 요일 (index % 7) 계산 후 해당 요일에 'day_on' 클래스 적용

```javaScript
// jQuery

  const calandarDay = $('.calandar_wrap .date_list .day li');

    $('.calandar_wrap .date_list .date').on('click', 'li', function (e) {
    e.preventDefault();

    $('.calandar_wrap .date_list .date li').removeClass('date_on');
    $(this).addClass('date_on');

    let index = $(this).index() % 7;
    calandarDay.removeClass('day_on');
    calandarDay.eq(index).addClass('day_on');
  });
```
<br/><br/>

### 🔹 학습 포인트
- jQuery와 순수 JS를 활용한 동적 DOM 제어 및 이벤트 처리 경험
- Gnb 메뉴 hover와 fulldown 구현으로 사용자 인터랙션 설계 이해
- 미디어 쿼리를 활용한 반응형 웹 설계 경험 (Mobile / Tablet / PC / Wide PC 대응)
- 사용자 흐름을 고려한 UI/UX 최적화 경험
<br/><br/>
