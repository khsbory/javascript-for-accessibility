//wai-aria checkbox

// role=checkbox 인 요소를 checkBoxes 배열 변수에 적재
var checkBoxes = document.querySelectorAll('[role="checkbox"]');
var ariaCntrlChkBoxIdx; 
checkBoxes.forEach(function (checkBox, index) {
    checkBox.tabIndex = 0;
	
	if (checkBox.hasAttribute("aria-controls")) {
		ariaCntrlChkBoxIdx = index;
	}
	
    checkBox.addEventListener("mousedown", function () {
        checkBoxMousedown();
    });

    // 마우스 클릭 or 스페이스바를 누를 시 이벤트 발생
    checkBox.addEventListener("click", function () {
        checkBoxEvent(checkBox);
    });

    checkBox.addEventListener("keydown", function (e) {
        if (e.keyCode === 32) {
            // space, enter
            checkBox.click();
            e.preventDefault();
        }
    });
});

var beforeCheckBoxOuterHTML;
function checkBoxMousedown() {
	beforeCheckBoxOuterHTML = checkBoxes[ariaCntrlChkBoxIdx].outerHTML;
}
function checkBoxEvent(target) {
    // 클릭한 체크박스 요소에 aria-controls 속성이 있을 경우, 예) 체크박스 전체에 영향을 끼치는 부모 체크박스
    // aria-controls="chk_0 chk_1 chk_2 chk_4 ..."
    if (target.hasAttribute("aria-controls")) {
        // aria-controls 에 저장된 id를 split 하여 배열변수에 적재
        var restBoxes = target.getAttribute("aria-controls").split(" ");
        var checkedBoxes = 0;
        // 부모 체크박스가 true일 경우 자기자신, 자식 체크박스의 체크여부를 false로 변경 (전체 미동의)
        if (target.getAttribute("aria-checked") === 'true') {
            for (var _i = 0; _i < restBoxes.length; _i++) {
                var _singleBox = document.getElementById(restBoxes[_i]);
                _singleBox.setAttribute("aria-checked", false);
            }
            target.setAttribute("aria-checked", false);
        } else { // 부모 체크박스가 false일 경우 자기자신, 자식 체크박스의 체크여부를 true로 변경 (전체 동의)
            for (var _i2 = 0; _i2 < restBoxes.length; _i2++) {
                var _singleBox2 = document.getElementById(restBoxes[_i2]);
                _singleBox2.setAttribute("aria-checked", true);
            }
            target.setAttribute("aria-checked", true);
        }
		return false;
    } else { // 해당 요소의 체크박스의 상태만 변경
        if (target.getAttribute("aria-checked") === 'true') {
            target.setAttribute("aria-checked", false);
        } else {
            target.setAttribute("aria-checked", true);
        }
    }
	
	// 부모 체크박스의 요소를 이전과 비교하여 true or false 처리
	var afterCheckBox = checkBoxes[ariaCntrlChkBoxIdx];
	if (beforeCheckBoxOuterHTML !== afterCheckBox.outerHTML) {
		if (afterCheckBox.getAttribute("aria-checked") === 'true') {
			afterCheckBox.setAttribute("aria-checked", false);
		} else {
			afterCheckBox.setAttribute("aria-checked", true);
		}
	}
}
