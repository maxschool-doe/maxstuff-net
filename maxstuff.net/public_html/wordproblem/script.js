var variables = {};
var nextVariableNumber = 0;

function removeElement(elementId) {
    var element = document.getElementById(elementId);
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
    newTR = document.createElement("tr");
    nameCell = document.createElement("td");
    typeCell = document.createElement("td");
    minCell = document.createElement("td");
    maxCell = document.createElement("td");
    formulaCell = document.createElement("td");
    //Code Here
    newTR.id = "row"+nextVariableNumber;
    nameCell.id = "nameCell"+nextVariableNumber;
    typeCell.id = "typeCell"+nextVariableNumber;
    minCell.id = "minCell"+nextVariableNumber;
    maxCell.id = "maxCell"+nextVariableNumber;
    formulaCell.id = "formulaCell"+nextVariableNumber;
    variables[nextVariableNumber] = {"type":"number","min":0,"max":50,"formula":""};
    nameCell.textContent = variables[nextVariableNumber]["type"]+nextVariableNumber;
    typeInput = document.createElement("select");
    numberOption = document.createElement("option");
    numberOption.textContent="Random Number";
    typeInput.appendChild(numberOption);
    nameOption = document.createElement("option");
    nameOption.textContent="Random Name";
    typeInput.appendChild(nameOption);
    typeCell.appendChild(typeInput);
    ///////////
    newTR.appendChild(nameCell);
    newTR.appendChild(typeCell);
    newTR.appendChild(minCell);
    newTR.appendChild(maxCell);
    newTR.appendChild(formulaCell);
    variableTableBody.appendChild(newTR);
    nextVariableNumber+=1;
    setSaveButton();
}

textInput.oninput = setSaveButton;
answerFormulaInput.oninput = setSaveButton;
addBlankVariable.onclick = newVariable;
setSaveButton();


