/**
 * 제이쿼리 호출
 * head src에 제이쿼리 경로를 추가하여 사용할 수 있도록 함
 */
var oScript = document.createElement("script");
oScript.type = "text/javascript";
oScript.charset = "utf-8";
oScript.src = "https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName("head")[0].appendChild(oScript);

/**
 * 토글 버튼 이벤트
 * DOM의 모든 버튼 (<Button>, <input type="button">,<a role="button"> 등) 클릭 시 발생하는 이벤트 (누름 상태 변경)
 * aria-pressed = "true" or "false"
 */
$(document).on("click", ":button, [type='button', role='button', data-role='button']", function () {
  if ($(this).attr("aria-pressed") === "true") { // aria-pressed 가 true(누름 상태)면 false 로 변경
    $(this).attr("aria-pressed", "false");
  } else { // aria-pressed 가 undefined 거나 false 면 true 로 변경
    $(this).attr("aria-pressed", "true");
  }
})
