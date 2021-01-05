function createEmoji (gender,skin,age,hairColor,/*hairShape*/) {
	ZWJ="\u200D";
	person="🧑";
	if (gender == "M") {
		if (age == "0") {
			person = "👦";
		} else if (age == "1") {
			person = "👨";
		} else if (age == "2") {
			person = "👴";
		}
	} else if (gender == "F") {
		if (age == "0") {
			person = "👧";
		} else if (age == "1") {
			person = "👩";
		} else if (age == "2") {
			person = "👵";
		}
	} else if (gender == "O") {
		if (age == "0") {
			person = "🧒";
		} else if (age == "1") {
			person = "🧑";
		} else if (age == "2") {
			person = "🧓";
		}
	}
	if (skin == "1") {
		person=person+"🏻"
	} else if (skin == "2") {
		person=person+"🏼"
	} else if (skin == "3") {
		person=person+"🏽"
	} else if (skin == "4") {
		person=person+"🏾"
	} else if (skin == "5") {
		person=person+"🏿"
	}
	if ((gender.value == "M" || gender.value == "F") && age.value == "1") {
		if (hairColor == "R") {
			person=person+ZWJ+"🦰"
		} else if (hairColor == "W") {
			person=person+ZWJ+"🦳"
		}
		else if (hairColor == "A") {
			person=person+ZWJ+"🦱"
		}
		else if (hairColor == "N") {
			person=person+ZWJ+"🦲"
		}
	}
	/*if (hairShape == "C") {
		person=person+ZWJ+"🦱"
	} else if (hairShape == "B") {
		person=person+ZWJ+"🦲"
	}*/
	return person
}

function useSpecialEffect () {
	if (!((gender.value == "M" || gender.value == "F") && age.value == "1")) {
		return true
	} else {
		return false
	}
}
function updateSpecialEffect () {
	if (useSpecialEffect()) {
		hairColor.classList.add("redBackground");
	} else {
		hairColor.classList.remove("redBackground");
	}
}

function updateDropDown () {
	//Gender Selector
		genderSelectM.textContent = createEmoji(
			"M",
			skin.value,
			age.value,
			hairColor.value,
			//hairShape.value,
		);
		genderSelectF.textContent = createEmoji(
			"F",
			skin.value,
			age.value,
			hairColor.value,
			//hairShape.value,
		);
		genderSelectO.textContent = createEmoji(
			"O",
			skin.value,
			age.value,
			hairColor.value,
			//hairShape.value,
		);
	//
	//Skin Tone
		skinSelect0.textContent = createEmoji(
			gender.value,
			"0",
			age.value,
			hairColor.value,
			//hairShape.value,
		);
		skinSelect1.textContent = createEmoji(
			gender.value,
			"1",
			age.value,
			hairColor.value,
			//hairShape.value,
		);
		skinSelect2.textContent = createEmoji(
			gender.value,
			"2",
			age.value,
			hairColor.value,
			//hairShape.value,
		);
		skinSelect3.textContent = createEmoji(
			gender.value,
			"3",
			age.value,
			hairColor.value,
			//hairShape.value,
		);
		skinSelect4.textContent = createEmoji(
			gender.value,
			"4",
			age.value,
			hairColor.value,
			//hairShape.value,
		);
		skinSelect5.textContent = createEmoji(
			gender.value,
			"5",
			age.value,
			hairColor.value,
			//hairShape.value,
		);
	//
	//Age
		ageSelect0.textContent = createEmoji(
			gender.value,
			skin.value,
			"0",
			hairColor.value,
			//hairShape.value,
		);
		ageSelect1.textContent = createEmoji(
			gender.value,
			skin.value,
			"1",
			hairColor.value,
			//hairShape.value,
		);
		ageSelect2.textContent = createEmoji(
			gender.value,
			skin.value,
			"2",
			hairColor.value,
			//hairShape.value,
		);
	//
	//Hair Color
		hairColorSelectB.textContent = createEmoji(
			gender.value,
			skin.value,
			age.value,
			"B",
			//hairShape.value,
		);
		hairColorSelectR.textContent = createEmoji(
			gender.value,
			skin.value,
			age.value,
			"R",
			//hairShape.value,
		);
		hairColorSelectW.textContent = createEmoji(
			gender.value,
			skin.value,
			age.value,
			"W",
			//hairShape.value,
		);
		hairColorSelectA.textContent = createEmoji(
			gender.value,
			skin.value,
			age.value,
			"A",
			//hairShape.value,
		);
		hairColorSelectN.textContent = createEmoji(
			gender.value,
			skin.value,
			age.value,
			"N",
			//hairShape.value,
		);
	//
}
//updateDropDown()
//updateSpecialEffect()

function updateAll () {
	updateDropDown();
	updateSpecialEffect();
}

gender.onchange = updateAll;
skin.onchange = updateAll;
age.onchange = updateAll;
hairColor.onchange = updateAll;

//Clever Max : REPLACE THE CODE BELOW YOU LAZY PERSON
//Lazy Max   : Actually this code is fine.
reveal.onclick = function () {
	output.textContent = createEmoji(
		gender.value,
		skin.value,
		age.value,
		hairColor.value,
		//hairShape.value,
	);
}

//updateAll();