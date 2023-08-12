// evoteworld Common JS
$(document).ready(function () {
  preventDefaultAnchor();
  setCurrentNav();
  navEvent();
  setFooter();
});

function preventDefaultAnchor() {
  $(document).on("click", 'a[href="#"]', function (e) {
    e.preventDefault();
  });
}

function setCurrentNav() {
  var bodyClass = $("body").attr("class");
  var classArray = bodyClass.split(" ");
  if (classArray[0] === "main") {
    $("header").append(`
      <h1>
      <a href="./index.html"
        ><img alt="투표24" src="./img/voting.png"
      /></a>
      </h1>
      <a href="#" class="menu mobile"><span>내비게이션 열기/닫기</span></a>
      <nav id="gnb">
        <ul>
          <li class="sub1" data-menu="service-intro">
            <a href="./page/00-service-intro/00-summary.html">서비스 소개</a>
            <ul>
              <li data-menu="summary"><a href="./page/00-service-intro/00-summary.html">서비스 개요</a></li>
              <li data-menu="who"><a href="./page/00-service-intro/01-who.html">서비스 제공 대상</a></li>
              <li data-menu="caution"><a href="./page/00-service-intro/02-caution.html">유의사항</a></li>
              <li data-menu="who"><a href="./page/00-service-intro/03-misa.html">선거 안내</a></li>
            </ul>
          </li>
          <li class="sub2" data-menu="how-to">
            <a href="./page/01-how-to/00-how-to.html">이용방법</a>
            <ul>
              <li data-menu="how-to"><a href="./page/01-how-to/00-how-to.html">이용방법</a></li>
            </ul>
          </li>
          <li class="sub3" data-menu="fee">
            <a href="./page/02-fee/00-fee.html">이용수수료</a>
            <ul>
              <li data-menu="fee"><a href="./page/02-fee/00-fee.html">이용수수료</a></li>
            </ul>
          </li>
          <li class="sub5" data-menu="apply">
            <a href="./page/03-apply/00-procedure.html">이용신청</a>
            <ul>
              <li data-menu="procedure"><a href="./page/03-apply/00-procedure.html">이용신청</a></li>
            </ul>
          </li>
        </ul>
        <span class="bar"></span>
      </nav>
    `);
    return false;
  } else {
    $("header").append(`
      <h1>
      <a href="../../index.html"
        ><img alt="투표24" src="../../img/voting.png"
        /></a>
      </h1>
      <a href="#" class="menu mobile"><span>내비게이션 열기/닫기</span></a>
      <nav id="gnb">
        <ul>
          <li class="sub1" data-menu="service-intro">
            <a href="../00-service-intro/00-summary.html">서비스 소개</a>
            <ul>
              <li data-menu="summary"><a href="../00-service-intro/00-summary.html">서비스 개요</a></li>
              <li data-menu="who"><a href="../00-service-intro/01-who.html">서비스 제공 대상</a></li>
              <li data-menu="caution"><a href="../00-service-intro/02-caution.html">유의사항</a></li>
              <li data-menu="who"><a href="../00-service-intro/03-misa.html">선거 안내</a></li>
            </ul>
          </li>
          <li class="sub2" data-menu="how-to">
            <a href="../01-how-to/00-how-to.html">이용방법</a>
            <ul>
              <li data-menu="how-to"><a href="../01-how-to/00-how-to.html">이용방법</a></li>
            </ul>
          </li>
          <li class="sub3" data-menu="fee">
            <a href="../02-fee/00-fee.html">이용수수료</a>
            <ul>
              <li data-menu="fee"><a href="../02-fee/00-fee.html">이용수수료</a></li>
            </ul>
          </li>
          <li class="sub5" data-menu="apply">
            <a href="../03-apply/00-procedure.html">이용신청</a>
            <ul>
              <li data-menu="procedure"><a href="../03-apply/00-procedure.html">이용신청</a></li>
            </ul>
          </li>
        </ul>
        <span class="bar"></span>
      </nav>
    `);
  }

  $("#gnb > ul > li").each(function () {
    if ($(this).attr("data-menu") === classArray[1]) {
      $(this).addClass("on");
      return false;
    }
  });

  $("#gnb > ul > li.on > ul > li").each(function () {
    if ($(this).attr("data-menu") === classArray[2]) {
      $(this).addClass("on");
      return false;
    }
  });
}

function navEvent() {
  $("#gnb > ul > li > a").on("mouseenter", function () {
    $("#header").addClass("open");
  });
  $("#header").on("mouseleave", function () {
    $("#header").removeClass("open");
  });

  $("#gnb").on("focusin", function () {
    $("#header").addClass("open");
  });
  $("#gnb").on("focusout", function () {
    $("#header").removeClass("open");
  });

  $("#header a.menu").on("click", function () {
    $(this).toggleClass("close");
    $("#gnb").toggleClass("open");
    $("#gnb > ul > li.on > a").trigger("click");
  });

  $("#gnb > ul > li").each(function () {
    var numSub = $(this).find("> ul > li").length;
    if (numSub > 0) {
      $(this).find("> a").append('<i class="fas fa-plus mobile"><span>열림</span></i>');
    }
  });

  $("#gnb > ul > li > a").on("click", function (e) {
    if ($(window).width() < 1024 && $(this).next().find("li").length > 0) {
      e.preventDefault();
      var height = 0;
      $(this)
        .next()
        .find("li")
        .each(function () {
          height += $(this).outerHeight(true);
        });
      $(this)
        .next()
        .css({ height: height + "px" });
      $(this).find("i").attr({ class: "fas fa-minus mobile" });

      $(this).parent().siblings().find("> ul").css({ height: 0 });
      $(this).parent().siblings().find("> a i").attr({ class: "fas fa-plus mobile" });
    }
  });

  $("#gnb > ul > li").on("focusin", function () {
    $(this).find("> a").trigger("click");
  });

  $(window).on("resize", function () {
    if ($(window).width() >= 1024) {
      $("#gnb > ul > li > ul").removeAttr("style");
      $("#gnb").removeClass("open");
      $("#gnb").find("i").attr({ class: "fas fa-plus mobile" });
      $("#header a.menu").removeClass("close");
    }
  });
}

function setFooter() {
  $("#footer").append(`
  <p class="copyright">
  제이블소프트 | 경기도 하남시 미사강변동로 125(망월동)
  | 대표 이민옥 |
  사업자등록번호 869-02-02207 | 대표번호 010-7217-8550 | 메일
  jableit@naver.com <br />Copyright © 제이블소프트
  All Rights Reserved.
</p>
  `);
}
