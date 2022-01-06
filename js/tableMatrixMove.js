// 테이블 행열 포커스 및 이동 이벤트를 갖는 테이블의 data-name
var tbMatrixMoveObj = document.querySelectorAll("[data-name='tbMove']");
tbMatrixMoveObj.forEach(function (item1, index1) {
    item1.querySelectorAll("tr").forEach(function (item2, index2) {
        item2.querySelectorAll(("th, td")).forEach(function (item3, index3) {
            // index1 : table 번호, index2 : tr 번호, index3 : th or td 번호
            var dataTableIndex = index1 + "-" + index2 + "-" + index3;
            item3.setAttribute("data-table-index", dataTableIndex);
        })
    });
});



//
// document.querySelector("[data-name='tbMove']").addEventListener("click", function () {
//     console.log("TEST");
//     this.setAttribute("style", "border-style : dotted");
// })