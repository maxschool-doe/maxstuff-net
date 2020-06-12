var hintsUsed = 0;
var usedHint = false;
var wrongAnswerTimes = 0;
puzzleOneButtonOne.onclick = wrongAnswer;
puzzleOneButtonTwo.onclick = wrongAnswer;
puzzleOneButtonThree.onclick = function () {
  hintOff();
  puzzleOneDiv.classList.add("hidden");
  puzzleTwoDiv.classList.remove("hidden");
}

puzzleTwoButtonOne.onclick = function () {
  hintOff();
  puzzleTwoDiv.classList.add("hidden");
  puzzleThreeDiv.classList.remove("hidden");
}
puzzleTwoButtonTwo.onclick = wrongAnswer;
puzzleTwoButtonThree.onclick = wrongAnswer;

puzzleThreeButtonOne.onclick = wrongAnswer;
puzzleThreeButtonTwo.onclick = function () {
  hintOff();
  puzzleThreeDiv.classList.add("hidden");
  puzzleFourDiv.classList.remove("hidden");
}
puzzleThreeButtonThree.onclick = wrongAnswer;

puzzleFourButtonOne.onclick = wrongAnswer;
puzzleFourButtonTwo.onclick = function () {
  hintOff();
  puzzleFourDiv.classList.add("hidden");
  puzzleFiveDiv.classList.remove("hidden");
}
puzzleFourButtonThree.onclick = wrongAnswer;

puzzleFiveButtonOne.onclick = wrongAnswer;
puzzleFiveButtonTwo.onclick = wrongAnswer;
puzzleFiveButtonThree.onclick = function () {
  hintOff();
  puzzleFiveDiv.classList.add("hidden");
  getHint.classList.add("hidden");
  oddOneOutTitleText.classList.add("hidden");
  congratulationsDiv.classList.remove("hidden");
  hintsUsedSpan.textContent = hintsUsed;
  wrongGuessSpan.textContent = wrongAnswerTimes;
}

function hintOff() {
  puzzleOneHint.classList.add("hidden");
  puzzleTwoHint.classList.add("hidden");
  puzzleThreeHint.classList.add("hidden");
  puzzleFourHint.classList.add("hidden");
  puzzleFiveHint.classList.add("hidden");
  usedHint = false;
}
function showHint() {
  if (usedHint == false) {
    usedHint = true;
    hintsUsed += 1;
  }
  puzzleOneHint.classList.remove("hidden");
  puzzleTwoHint.classList.remove("hidden");
  puzzleThreeHint.classList.remove("hidden");
  puzzleFourHint.classList.remove("hidden");
  puzzleFiveHint.classList.remove("hidden");
}

function wrongAnswer() {
  if (!window.event.target.classList.contains("wrong")) {
    wrongAnswerTimes += 1;
  }
  window.event.target.classList.add("wrong");
}
getHint.onclick = showHint;