/**
* 요소에 targetValue 에 해당하는 class 혹은 name 이 존재할 경우 해당 요소들에 id를 부여
* type 는 class 혹은 name 의 태그 속성
* ex) class="targetClass" or name="targetName" 이라면 createDocumentsId("targetClass", "class") or createDocumentsId("targetName", "name")
*/
function createDocumentsId(targetValue, type) {  
  // type 이 클래스이며 targetValue의 클래스가 존재할 경우
  if (type === "class" && document.getElementsByClassName(targetValue) > 0) {
    Array.from(document.getElementsByClassName(targetValue)).forEach(function(els, idx, arr) {
      els.setAttribute("id", targetValue + "_" + idx);
    });
  }
  
  if (type === "name" && document.getElementsByName(targetValue) > 0) {
    Array.from(document.getElementsByName(targetValue)).forEach(function(els, idx, arr) {
      els.setAttribute("id", targetValue + "_" + idx);
    });
  }
}
