/**
 * Jquery 라이브러리 최신 버전 호출
 * 이미 최신 버전이 존재할 경우 호출하지 않음
 */
var headScript = document.getElementsByTagName("head")[0].getElementsByTagName("script");
for (var i = 0, check = false; i < headScript.length; i++){
  if ("https://code.jquery.com/jquery-latest.min.js" === headScript[i].src){
    check = true;
    break;
  }
}
if (!check){
  var oScript = document.createElement("script");
  oScript.type = "text/javascript";
  oScript.charset = "utf-8";
  oScript.src = "https://code.jquery.com/jquery-latest.min.js";
  document.getElementsByTagName("head")[0].appendChild(oScript);
}

// DOM 을 미리 로드시켜 라이브러리를 정상적으로 작동시키기 위함
window.addEventListener('load', function() {

  /**
   * 토글 버튼 이벤트
   * DOM의 모든 버튼 (<Button>, <input type="button">,<a role="button"> 등) 클릭 시 발생하는 이벤트 (누름 상태 변경)
   * aria-pressed = "true" or "false"
   */
  var beforeOuterHtml; // 클릭한 버튼의 outerHtml
  var beforeInnerText; // 클릭한 버튼의 텍스트 내용(태그는 포함하지 않음)
  var beforeAriaLabel; // 클릭한 버튼의 aria-label
  var beforeAriaLabelledby; // 클릭한 버튼의 aria-labelledby
  $(document).on("focus", ":button, [type='button'], [role='button'], [data-role='button']", function (e) {
    beforeOuterHtml = this.outerHTML;
    beforeInnerText = this.innerText;
    beforeAriaLabel = $(this).attr("aria-label");
    beforeAriaLabelledby = $(this).attr("aria-labelledby");
  });

  $(document).on("click", ":button, [type='button'], [role='button'], [data-role='button']", function (e) {
    if ((beforeAriaLabel === undefined || beforeAriaLabel === $(this).attr("aria-label")) &&
        (beforeAriaLabelledby === undefined || beforeAriaLabelledby === $(this).attr("aria-labelledby")) &&
        (beforeInnerText === this.innerText)){
      if (beforeOuterHtml !== this.outerHTML){
        if ($(this).attr("aria-pressed") === "true") { // aria-pressed 가 true(누름 상태)면 false 로 변경
          $(this).attr("aria-pressed", "false");
        } else { // aria-pressed 가 undefined 거나 false 면 true 로 변경
          $(this).attr("aria-pressed", "true");
        }
      }
    }
  });


});
