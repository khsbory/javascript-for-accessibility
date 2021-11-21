/**
 * jQuery 라이브러리 버전이 1.7.0 미만이거나 없을 경우 jQuery 최신 버전 적용
 */
try {
  var jScript = document.createElement("script");
  jScript.type = "text/javascript";
  jScript.charset = "utf-8";
  jScript.src = "https://code.jquery.com/jquery-latest.min.js";

  var jQuery_current_version = jQuery.fn.jquery.split(".").map(Number); // 페이지에 적용된 jQuery 버전을 가져옴
  var jQuery_minimum_version = 17; // jQuery 최소 버전 1.7.0

  jQuery_current_version = jQuery_current_version[0] * 10 + jQuery_current_version[1];
  if (jQuery_minimum_version > jQuery_current_version){
    document.getElementsByTagName("head")[0].appendChild(jScript);
  }

} catch { // jQuery가 없을 경우 예외처리 하여 최신 버전을 적용함
  document.getElementsByTagName("head")[0].appendChild(jScript);
}

// DOM 을 미리 로드시켜 라이브러리를 정상적으로 작동시키기 위함
window.addEventListener('load', function() {

  /**
   * 스크린 리더 사용자를 위한 테이블 정렬(오름, 내림차순) 확인 이벤트
   * announceForAccessibility 를 호출
   * th > button [role=button], [role=columnheader, rowheader] > button, [role=button]
   */
  $(document).on("click", "th > :button, th > [role='button'], " +
      "[role='columnheader'] > :button, [role='columnheader'] > [role='button'], " +
      "[role='rowheader'] > :button, [role='rowheader'] > [role='button']", function (e) {
    // 클릭한 버튼의 부모 요소 클래스를 lowerCase로 변환하여 가져옴
    var $parentClass = $(this).parent().attr("class") !== undefined ? $(this).parent().attr("class").toLowerCase() : "";

      if ($parentClass !== "" && $parentClass.indexOf("up") > -1) { // 부모 요소 클래스 중에 up이 포함된 경우 ascending
        $(this).parent().attr("aria-sort","ascending");
        announceForAccessibility("오름차순 정렬됨");

      } else if ($parentClass !== "" && $parentClass.indexOf("down") > -1) { //부모 요소 클래스 중에 down이 포함된 경우 descending
        $(this).parent().attr("aria-sort","descending");
        announceForAccessibility("내림차순 정렬됨");

      }
  });
});
