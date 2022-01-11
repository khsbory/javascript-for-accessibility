/**
 * data-name이 tableMatrixMove인 테이블에서 focus 혹은 keyup 시 이벤트 발생 (data-name명 변경 가능)
 * 마우스 클릭 시 해당 위치에서 이동할 수 있도록 focus 이벤트 부여
 * 방향키로 이동 시 해당 위치로 이동할 수 있도록 keyup 이벤트 부여
 * 유의사항 : 테이블의 maxX, maxY값이 일치해야 정상적으로 동작 가능
 * */
var tableMatrixMoves = document.querySelectorAll("[data-name='tableMatrixMove']");
var tableMatrixMovesChildren = [];

tableMatrixMoves.forEach(function (item1, index1) {
    item1.querySelectorAll("tr").forEach(function (item2, index2) {
        item2.querySelectorAll(("th, td")).forEach(function (item3, index3) {
            tableMatrixMovesChildren.push(item3); //th
            var x = 0; var y = 0; var maxX = 0; var maxY = 0;

            item3.addEventListener("focus", function () {
                x = index3; y = index2;
                maxX = item2.querySelectorAll("th, td").length;
                maxY = item1.querySelectorAll("tr").length;
                tableMatrixMoveEvent(item1, x, y, maxX, maxY);
            });
            item3.addEventListener("keyup", function () {
                x = index3; y = index2;
                maxX = item2.querySelectorAll("th, td").length;
                maxY = item1.querySelectorAll("tr").length;
                tableMatrixMoveEvent(item1, x, y, maxX, maxY);
            });
        })
    });
});

/**
 * focus 혹은 keyup 이벤트를 통해 접근 가능한 함수
 * keyCode는 (`) 억음부호 , left, right, up, down 에 의해 동작
 * 사용자가 인식할 수 있도록 borderStyle dotted 부여 및 초기화
 * 요소에 focus 일 경우 tabIndex 0, focusout -1
 * table 의 경우 tab 대신 (`) 억음부호로 대체
 * */
function tableMatrixMoveEvent(table, x, y, maxX, maxY) {
    if (event.keyCode === 192 || event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
        tableMatrixMovesChildren.forEach(function (item, index) {
           item.tabIndex="-1";
           item.style.borderStyle="";
        });
    }
    switch (event.keyCode)
    {
        case 192: // 0, 0 인덱스로 이동
            x = 0; y = 0;
            tableRowCellMove(table, x, y);
            break;
        case 38: //key up
            if (y==0){y=maxY;}
            tableRowCellMove(table, x, --y);
            break;
        case 40: //key down
            if (y==(maxY-1)){y=0;} else {y++;}
            tableRowCellMove(table, x, y);
            break;
        case 37: //key left
            if (x==0){y--; x=(maxX-1);} else {x--;}
            tableRowCellMove(table, x, y);
            break;
        case 39://key right
            if (x==(maxX-1)){y++; x=0;} else {x++;}
            tableRowCellMove(table, x, y);
            break;
    }
}

/**
 * 소스 단축을 위해 테이블 이동하는 함수 사용
 * 방향키 이동 시 해당 위치에 row, cell 이 없다면 예외처리하여 메시지 로그 출력
 * */
function tableRowCellMove(table, x, y) {
    try {
            table.rows[y].cells[x].focus();
            table.rows[y].cells[x].tabIndex = '0';
            table.rows[y].cells[x].style.borderStyle = "dotted";
    } catch {
        console.log("이동할 수 없습니다.");
    }
}


/* BACKUP : 다른 방식으로 구현한 소스입니다. 주석처리 되어 있음.

function tableMatrixMoveFocus() {
    //console.log(this);
    this.setAttribute("style", "border-style : dotted");
}

function tableMatrixMoveFocusOut() {
    this.removeAttribute("style", "border-style : dotted");
}


var tableMatrixMoves = document.querySelectorAll("[data-name='tableMatrixMove']");
tableMatrixMoves.forEach(function (item1, index1) {
    item1.querySelectorAll("tr").forEach(function (item2, index2) {
        item2.querySelectorAll(("td")).forEach(function (item3, index3) {
            //index1 : table 번호, index2 : tr 번호, index3 : td 번호
            item3.setAttribute("data-table-index", index1 + "-" + index2 + "-" + index3);
            item3.addEventListener("focus", tableMatrixMoveFocus);
            item3.addEventListener("focusout", tableMatrixMoveFocusOut);
            item3.addEventListener("keyup", tableMatrixMoveKeyup);
        })
    });
});
function tableMatrixMoveKeyup() {
    var idx = this.getAttribute("data-table-index").split("-").map(Number);
    var len = document.querySelectorAll("[data-table-index^='" + idx[0] + "-" + idx[1] + "']").length;
    var preNode = this.previousSibling.previousSibling
    var nextNode = this.nextSibling.nextSibling;
    var tableIndex;
    switch (event.keyCode) {
        case 9 : tableIndex = idx[0] + "-" + 1 + "-" + 0;
            console.log(document.querySelector("[data-table-index='"+ tableIndex +"']"));
            console.log(tableIndex);
            break;
        case 37 : preNode === null ? tableIndex = idx[0] + "-" +  (idx[1]-1) + "-" + (len-1) : tableIndex = idx[0] + "-" + idx[1] + "-" + (idx[2]-1);
            break;
        case 38 : tableIndex = idx[0] + "-" +  (idx[1]-1) + "-" + idx[2];
            break;
        case 39 : nextNode === null ? tableIndex = idx[0] + "-" +  (idx[1]+1) + "-" + 0 : tableIndex = idx[0] + "-" + idx[1] + "-" + (idx[2]+1);
            break;
        case 40 : tableIndex = idx[0] + "-" +  (idx[1]+1) + "-" + idx[2];
            break;
    }
    if (document.querySelector("[data-table-index='" + tableIndex +"']") !== null) {
        //document.querySelector("[data-table-index='" + tableIndex +"']").focus();
    } else {
        return;
    }
}
*/
