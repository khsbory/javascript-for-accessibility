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
   * 토글 버튼 이벤트
   * DOM의 모든 버튼 (<Button>, <input type="button">,<a role="button"> 등) 클릭 시 발생하는 이벤트 (누름 상태 변경)
   * aria-pressed = "true" or "false"
   */
  var beforeOuterHtml; // 클릭한 버튼의 outerHtml
  var beforeInnerText; // 클릭한 버튼의 텍스트 내용(태그는 포함하지 않음)
  var beforeAriaLabel; // 클릭한 버튼의 aria-label
  var beforeAriaLabelledby; // 클릭한 버튼의 aria-labelledby
  $(document).on("focus", ":button, [type='button'], [role='button'], [data-role='button']", function (e) {
    if ($(this).attr("aria-pressed") === undefined) { return; }
    beforeOuterHtml = this.outerHTML;
    beforeInnerText = this.innerText;
    beforeAriaLabel = $(this).attr("aria-label");
    beforeAriaLabelledby = $(this).attr("aria-labelledby");
  });

  $(document).on("click", ":button, [type='button'], [role='button'], [data-role='button']", function (e) {
    if ($(this).attr("aria-pressed") === undefined) { return; } // aria-pressed 속성이 없을 경우 리턴
    if (beforeAriaLabel !== undefined && beforeAriaLabel !== $(this).attr("aria-label")) { return; }
    if (beforeAriaLabelledby !== undefined && beforeAriaLabelledby !== $(this).attr("aria-labelledby")) { return; }
    if (beforeInnerText !== this.innerText) { return; }
    if (beforeOuterHtml === this.outerHTML){ return; }
    if ($(this).attr("aria-pressed") === "true") { // aria-pressed 가 true(누름 상태)면 false 로 변경
      $(this).attr("aria-pressed", "false");
    } else { // aria-pressed 가 undefined 거나 false 면 true 로 변경
      $(this).attr("aria-pressed", "true");
    }
  });


});
