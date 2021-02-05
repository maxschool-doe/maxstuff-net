function download(text, name, type) {
  var a = document.getElementById("saveButton");
  var file = new Blob([text], {type: type});
  a.href = URL.createObjectURL(file);
  a.download = name;
}

textInput.oninput = function () {
	download('file text', textInput.value.replace(/[^A-Za-z\d\-\_]/g, "_").slice(0,16)+'.wps', 'text/plain');
}