function createElementsId(targetValue1, targetValue2, ariaProperty) {  
    var elements1 = document.querySelectorAll("." + targetValue1 + ", [name=" + targetValue1 + "]");
    var elements2 = document.querySelectorAll("." + targetValue2 + ", [name=" + targetValue2 + "]");
  
    if (elements1 != null && elements2 != null) {
  
      Array.from(elements1).forEach(function(els, idx) {
        var id = targetValue1 + "_" + idx;
        els.setAttribute("id", id);
        document.querySelectorAll("." + targetValue2 + ", [name=" + targetValue2 + "]")[idx].setAttribute(ariaProperty, id);
      });
    }
  
  }
  
var checkbox = document.getElementsByClassName("chk agree");
var allCheck = document.getElementsByClassName("chk_all big agree");
allCheck[0].setAttribute("aria-hidden", "true");
allCheck[0].setAttribute("tabindex", "-1");
for (i = 0; i < checkbox.length; i++) {
    checkbox[i].setAttribute("aria-hidden", "true");
    checkbox[i].setAttribute("tabindex", "-1");
};

var customCheckbox = document.getElementsByClassName("icon_bg text_label agree");
for (i = 0; i < customCheckbox.length; i++) {
    customCheckbox[i].setAttribute("role", "checkbox");
    customCheckbox[i].setAttribute("tabindex", "0");
    customCheckbox[i].setAttribute("aria-checked", "false");
    };

Array.from(customCheckbox).forEach(function(els, idx) {
    var element = "idBox"
    var id = element + "_" + idx;
    els.setAttribute("id", id);
});
document.getElementById("idBox_0").setAttribute("aria-controls", "idBox_1 idBox_2 idBox_3 idBox_4 idBox_5 idBox_6 idBox_7");
var joinContent = document.getElementById("complet2");
var agreeText = joinContent.querySelectorAll("label");
for (i = 1; i < agreeText.length; i++) {
    agreeText[i].setAttribute("name", "target1");
        agreeText[6].removeAttribute("name");
};

var detailView = document.querySelectorAll(".btn_agreeview")
for (i = 0; i < detailView.length; i++) {
    detailView[i].setAttribute("name", "target2");
};

createElementsId("target1", "target2", "aria-describedby");


