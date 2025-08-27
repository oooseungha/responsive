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

### 💡 기획의도
**문제점**
- 회원만이 이용할 수 있는 불친절한 내비게이션 서비스와 복잡한 레이아웃과 정보구조 구성 리뉴얼

**개선 방향**
- 다양한 이미지와 와이드 배너, 애니메이션을 적절히 활용해 다이나믹한 웹페이지 제작  
- 현 웹사이트 제작 트렌드에 맞추어 세련됨 강조  
- 브랜드 이미지의 세련됨을 반영한 디자인과 더불어 유저의 사용성과 접근성 확보
<br/><br/>

### 📍 프로젝트 목표
- 단순 크기 조정이 아닌, 해상도별 맞춤 레이아웃 구성  
- 기기별 사용자 흐름 분석 후 UX 최적화
- 멘탈 모델을 반영한 내비게이션의 배치
- 텍스트보다 이미지를 강조한 홈페이지 구성
- 섹션별 명확한 단 구분
- 카드 배너를 활용한 레이아웃의 배치
- 스크롤 시 gnb 고정
- 콘셉트를 반영한 명확한 포인트 컬러와 폰트 활용 
<br/><br/>


### 📐 디자인 가이드
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/21204141-6669-43d4-836e-85b09c96d3ab" />
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
(1) Gnb 메뉴 hover 시 메뉴 fulldown 되도록 slideDown 이벤트 구현
- 사용자가 Gnb 메뉴 위에 마우스를 올리면 .menu_box가 내려오고, 마우스를 떼면 다시 올라가도록 구현
- jQuery slideDown/slideUp 메서드를 사용해 부드러운 애니메이션 처리

```javaScript
// jQuery

$(function () {
  let gnbBtn = $('.PC_header .PC_header_02 .gnb_box');
  let gnbMenu = $('.PC_header .PC_header_02 .menu_box');

  gnbBtn.mouseover(function () {
    gnbMenu.stop().slideDown(300); // 마우스 hover 시 메뉴 내려오기
  });
  gnbBtn.mouseout(function () {
    gnbMenu.stop().slideUp(300); // 마우스 hover 시 메뉴 올라가며 숨기기
  }); // @@@@ gnb_fulldown_event
```
![Image](https://github.com/user-attachments/assets/ff175ee5-9611-4645-9f7f-6eebf4a5a90d)

<br/><br/>
(2) 캘린더 구현 및 제어
- 현재 연도와 월, 일을 호출해 달력 생성

```javaScript
// javaScript & jQuery

// 오늘 기준 날짜 초기화
let today = new Date();
let nowYear = today.getFullYear();
let nowMonth = today.getMonth();

// 달력 표시용 월 배열 생성
const months = ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'];

// DOM 요소 선택
const dateList = document.querySelector('.date'); // 달력 날짜가 들어갈 ul
const currentMonth = document.querySelector('.month_text'); // 현재 월이 들어갈 span
const calandarIcon = document.querySelectorAll('.calandar_btn'); // 앞뒤의 월로 전환 가능한 버튼 div

// ✔️ 캘린더 호출 이벤트
const callCalandar = () => {

  let lastDateOfMonth = new Date(nowYear, nowMonth + 1, 0).getDate();
// 현재 달의 마지막 날짜(date) 계산
// 1) nowMonth + 1 -> 다음 달
// 2) day에 0 입력 -> 다음 달의 0일 = 이번 달 마지막 날
// 3) .getDate() -> 일(date) 추출

  let lastDateOfLastMonth = new Date(nowYear, nowMonth, 0).getDate();
// 지난달의 마지막 날짜(date) 계산
// 1) nowMonth -> 현재 달
// 2) day에 0 입력 -> 현재 달의 0일 = 지난달의 마지막 날
// 3) .getDate() -> 일(date) 추출

  let firstDayOfMonth = new Date(nowYear, nowMonth, 1).getDay();
// 현재 달의 첫 번째 요일(day) 계산
// 1) nowMonth -> 현재 달
// 2) day에 1 입력 -> 현재 달의 1일
// 3) .getDate() -> 요일(day) 추출

  let lastDayOfMonth = new Date(nowYear, nowMonth, lastDateOfMonth).getDay();
// 현재 달의 마지막 요일(day) 계산
// 1) nowMonth -> 현재 달
// 2) day에 lastDateOfMonth 입력 -> 이번 달의 마지막 날짜
// 3) new Date(...) -> 마지막 날 날짜 객체 생성
// 4) .getDay() -> 0(일요일) ~ 6(토요일) 형태로 요일(day) 반환


  // 0. 달 호출: 현재 달 표시
  currentMonth.innerHTML = `${months[nowMonth]}`;
  let dateText = '';

  // 1. 지난달 날짜: 이번 달 1일이 시작되기 전 남은 칸 채움
  for (let i = firstDayOfMonth; i > 0; i--) {
    // 지난달의 마지막 날짜부터 차례대로 출력
    dateText += `<li class="date_inactive">${lastDateOfLastMonth - i + 1}</li>`;
  }

  // 2. 이번달 날짜: 1일부터 마지막 날짜까지 채움
  for (let i = 1; i <= lastDateOfMonth; i++) {
    // 달력에 현재 달 날짜 표시
    dateText += `<li><a>${i}</a></li>`;
  }

  // 3. 다음달 날짜: 이번 달 마지막 요일 이후 남은 칸 채움
  for (let i = lastDayOfMonth; i < 6; i++) {
    // 다음 달 날짜를 차례대로 표시하며 비활성화 처리
    dateText += `<li class="date_inactive">${i - lastDayOfMonth + 1}</li>`;
  }

  // 4. 달력 ul에 HTML 문자열 적용
  dateList.innerHTML = dateText;
};

// ✔️ 캘린더 월 이동 버튼 이벤트
calandarIcon.forEach((icon) => {
  icon.addEventListener('click', () => {
    if (icon.classList.contains('month_btn_left')) {
      nowMonth -= 1;
      if (nowMonth < 0) {
        nowMonth = 11;
      } // 이전 달로 이동, 0월보다 작아지면 12월로 돌아가기
    } else if (icon.classList.contains('month_btn_right')) {
      nowMonth += 1;
      if (nowMonth > 11) {
        nowMonth = 0;
      } // 다음 달로 이동, 11월보다 커지면 1월로 돌아가기
    }
    callCalandar(); // 변경된 달 기준 달력 재호출
  });
});

callCalandar(); // 초기 달력 호출

```

- 날짜 선택 시 해당 날짜와 요일에 하이라이트 이벤트 처리

```javaScript
// jQuery

  const calandarDay = $('.calandar_wrap .date_list .day li');

    $('.calandar_wrap .date_list .date').on('click', 'li', function (e) {
    e.preventDefault();

    // 모든 날짜 하이라이트 비활성화
    $('.calandar_wrap .date_list .date li').removeClass('date_on');
    // 클릭한 날짜 하이라이트 활성화
    $(this).addClass('date_on');

    // 클릭한 날짜의 요일 계산
    let index = $(this).index() % 7;
    // 모든 요일 비활성화
    calandarDay.removeClass('day_on');
    // 해당 요일 활성화
    calandarDay.eq(index).addClass('day_on');
  });
```
![Image](https://github.com/user-attachments/assets/e90ec7dd-f80b-401e-8028-42ca7345daf9)


<br/><br/>


### ✅ 코드 리뷰 요약
- Gnb 메뉴 hover, 달력 생성 및 날짜 선택 기능을 구현하며 UI/UX 향상을 목표로 개발
- jQuery와 순수 JS를 활용해 동적 DOM 제어 및 이벤트 처리 구현
- 프로젝트를 통해 반응형 설계 및 사용자 인터랙션 처리 경험 확보

<br/><br/>
