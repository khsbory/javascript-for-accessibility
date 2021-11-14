/**
 * 제이쿼리 호출
 * head src에 제이쿼리 경로를 추가하여 사용할 수 있도록 함
 */
var oScript = document.createElement("script");
oScript.type = "text/javascript";
oScript.charset = "utf-8";
oScript.src = "http://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName("head")[0].appendChild(oScript);

/**
 * div 안 p 태그에 메시지 삽입 후 body 끝에 추가하며 2초 후 삭제하는 함수
 * div 의 name 은 announceForAccessibility 를 사용함 (해당 태그를 삭제하기 위함)
 */
function announceForAccessibility(message) {
  var html = '' +
    '<div aria-live="polite" name="announceForAccessibility" style="border: 0; padding: 0; margin: 0; ' +
    'position: absolute !important;' + 'height: 1px; width: 1px; overflow: hidden; clip: rect(1px 1px 1px 1px); ' +
    'clip: rect(1px, 1px, 1px, 1px);' + 'clip-path: inset(50%); white-space: nowrap;"><p>'+ message +'</p></div>';

  $("body").append(html);
  setTimeout(removeAnnounceForAccessibility,2000);
}

/**
 * div 의 name 이 announceForAccessibility 인 태그를 하위까지 삭제
 */
function removeAnnounceForAccessibility() {
  $("[name='announceForAccessibility']").remove();
}
