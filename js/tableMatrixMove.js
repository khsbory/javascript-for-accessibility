/**
 * data-name이 tableMatrixMove인 테이블 th, td태그에 data-table-index를 부여
 * data-table-index는 n-n-n 으로 인덱스 부여 (table 인덱스, tr(행) 인덱스, td(열) 인덱스)
 * */
// 테이블 행열 포커스 및 이동 이벤트를 갖는 테이블의 data-name
var tbMatrixMoveObj = document.querySelectorAll("[data-name='tableMatrixMove']");
tbMatrixMoveObj.forEach(function (item1, index1) {
    item1.addEventListener("keyup", tableMatrixMoveKeyup);
    item1.querySelectorAll("tr").forEach(function (item2, index2) {
        item2.querySelectorAll(("td")).forEach(function (item3, index3) {
            // index1 : table 번호, index2 : tr 번호, index3 : td 번호
            item3.setAttribute("data-table-index", index1 + "-" + index2 + "-" + index3);
            item3.addEventListener("focus", tableMatrixMoveFocus);
            item3.addEventListener("focusout", tableMatrixMoveFocusOut);
            item3.addEventListener("keyup", tableMatrixMoveKeyup);
        })
    });
});

/**
 * 방향키에 따라 행/열 이동
 * TAB키를 누를 시 다음 테이블의 첫 번째 인덱스로 이동
 * SHIFT + TAB 은 현재 테이블의 첫 번째 인덱스로 이동
 * */

var x=1; //begin in colum number 1 empezar en columna 1
var y=1; //begin in row 1 empezar en fila 1
var xmax = 6; //total columns of table n?ero total de columnas
var ymax = 6; //total rows of table n?ero total de filas
function tableMatrixMoveKeyup() {
    switch (event.keyCode)
    {
        case 40: //tecla abajo key down
            document.querySelector("[data-name='tableMatrixMove1']").rows[y].cells[x].bgColor='#FFFFFF';
            if (y==5){y=0;} else {y++;}
            document.querySelector("[data-name='tableMatrixMove1']").rows[y].cells[x].bgColor='#CC66FF';
            break
        case 38: //tecla arriba key up
            document.querySelector("[data-name='tableMatrixMove1']").rows[y].cells[x].bgColor='#FFFFFF';
            if (y==0){y=5;} else {y--;}
            document.querySelector("[data-name='tableMatrixMove1']").rows[y].cells[x].bgColor='#CC66FF';
            break
        case 37: //tecla izquierda key left
            document.querySelector("[data-name='tableMatrixMove1']").rows[y].cells[x].bgColor='#FFFFFF';
            if (x==0){y--; x=5;} else {x--;}
            document.querySelector("[data-name='tableMatrixMove1']").rows[y].cells[x].bgColor='#CC66FF';
            break
        case 39://tecla derecha key rigth
            document.querySelector("[data-name='tableMatrixMove1']").rows[y].cells[x].bgColor='#FFFFFF';
            if (x==5){y++; x=0;} else {x++;}
            document.querySelector("[data-name='tableMatrixMove1']").rows[y].cells[x].bgColor='#CC66FF';
            break
    }
}
function cambiarFondo() {
    document.querySelector("[data-name='tableMatrixMove1']").rows[y].cells[x].bgColor='#CC66FF';
}
//
// function tableMatrixMoveKeyup() {
//     var idx = this.getAttribute("data-table-index").split("-").map(Number);
//     var len = document.querySelectorAll("[data-table-index^='" + idx[0] + "-" + idx[1] + "']").length;
//     var preNode = this.previousSibling.previousSibling
//     var nextNode = this.nextSibling.nextSibling;
//     var tableIndex;
//     switch (event.keyCode) {
//         case 9 : tableIndex = idx[0] + "-" + 1 + "-" + 0;
//             console.log(document.querySelector("[data-table-index='"+ tableIndex +"']"));
//             console.log(tableIndex);
//             break;
//         case 37 : preNode === null ? tableIndex = idx[0] + "-" +  (idx[1]-1) + "-" + (len-1) : tableIndex = idx[0] + "-" + idx[1] + "-" + (idx[2]-1);
//             break;
//         case 38 : tableIndex = idx[0] + "-" +  (idx[1]-1) + "-" + idx[2];
//             break;
//         case 39 : nextNode === null ? tableIndex = idx[0] + "-" +  (idx[1]+1) + "-" + 0 : tableIndex = idx[0] + "-" + idx[1] + "-" + (idx[2]+1);
//             break;
//         case 40 : tableIndex = idx[0] + "-" +  (idx[1]+1) + "-" + idx[2];
//             break;
//     }
//     if (document.querySelector("[data-table-index='" + tableIndex +"']") !== null) {
//         //document.querySelector("[data-table-index='" + tableIndex +"']").focus();
//     } else {
//         return;
//     }
// }
function tableMatrixMoveFocus() {
    this.setAttribute("style", "border-style : dotted");
}

function tableMatrixMoveFocusOut() {
    this.removeAttribute("style", "border-style : dotted");
}