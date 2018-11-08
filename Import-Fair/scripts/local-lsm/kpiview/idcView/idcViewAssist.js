var idcViewAssist = idcViewAssist || {};



function exportAjax(URL, exportParam) {

    var myForm = document.createElement("form");
    myForm.method = "post";
    myForm.target = "_blank";
    myForm.acceptCharset = "utf-8";
    myForm.action = URL;
    document.body.appendChild(myForm);
    var newElement = document.createElement("input");
    newElement.setAttribute("name", "params");
    newElement.setAttribute("type", "hidden");
    newElement.setAttribute("value", exportParam);
    myForm.appendChild(newElement);
    myForm.submit();
    document.body.removeChild(myForm);

};