var variables = [];

function removeElement(elementId) {
    var element = document. getElementById(elementId);
    element.parentNode.removeChild(element);
}

function download(text, name, type) {
    var a = document.getElementById("saveButton");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
}

function setSaveButton() {
	filename = textInput.value.replace(/[^A-Za-z\d\-\_]/g, "_").slice(0,16);
	if (!filename.length > 0) {
		filename = "WordProblem1";
	}
	download(JSON.stringify({"text":textInput.value,"variables":variables,"answer":answerFormulaInput.value}), filename+'.wps', 'text/plain');
}

function newVariable() {
    
}

textInput.oninput = setSaveButton;
answerFormulaInput.oninput = setSaveButton;
addBlankVariable.onclick = setSaveButton;
setSaveButton();
variablesToHTML();


