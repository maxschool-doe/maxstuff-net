var metaCount = 0;
var metaButtonPower = 1;
var farmOneCountNumber = 0;
var farmOnePriceValue = 20;

createMetaButton.onclick = function () {
  metaCount += 1
  update();
}

farmOne.onclick = function () {
  if (metaCount >= farmOnePriceValue) {
    farmOneCountNumber += 1;
    metaCount -= 20;
  }
  update()
}

function update() {
  metaCountDisplay.textContent = metaCount;
  farmOneCount.textContent = farmOneCountNumber;
  farmOnePrice.textContent = farmOnePriceValue;
  if (metaCount > 20) {
    farmTwo.classList.remove("hidden");
  }
}
function tick() {
  metaCount += (farmOneCountNumber*1);
  update();
}
update();
window.setInterval(tick, 1000);
