function addDates(a,b) {
	if (a.constructor == Date) {
		apoch = Number(new Date(a))/1000;
	} else {
		apoch = Number(new Date(a));
	}
	if (b.constructor == Date) {
		bpoch = Number(new Date(b))/1000;
	} else {
		bpoch = Number(new Date(b));
	}
	return new Date(Math.round(apoch+bpoch)*1000);
}
function roundTime(a,x) {//Rounds time to the nearest x seconds.
	return new Date((Math.round((Number(new Date(a))/1000)/x)*1000)*x);
}
function toDateObject(a) {//Converts number to date object
	return new Date(a);
}
function deZone(a) {//Removes the timezone offset.
	return addDates(a,(0-a.getTimezoneOffset())*60);
}

function setTimeDefaults() { //Sets times for the fields when page is first loaded.
	currentDateTime = new Date();
	if (currentDateTime.getHours()>14) {//When it is too late in the day it will presume the next day is the desired day to go planespotting.
		startDateTime=addDates(currentDateTime,24*60*60);
		startDateTime.setHours(10);
		startDateTime.setMinutes(0);
		startDateTime.setSeconds(0);
		
		endDateTime=addDates(currentDateTime,24*60*60);
		endDateTime.setHours(16);
		endDateTime.setMinutes(0);
		endDateTime.setSeconds(0);
	} else {
		console.log("dsfsdafs");
		startDateTime=addDates(currentDateTime,1*60*60);
		startDateTime.setSeconds(0);
		
		endDateTime=roundTime(currentDateTime,900);
		endDateTime.setHours(16);
		endDateTime.setMinutes(0);
		endDateTime.setSeconds(0);
	}
	console.log(deZone(startDateTime).toISOString().slice(0,16));
	console.log(deZone(endDateTime).toISOString().slice(0,16));
	avStartTime.value=deZone(startDateTime).toISOString().slice(0,16);
	avEndTime.value=deZone(endDateTime).toISOString().slice(0,16);
}

function validateTime() { //Checks that the start time is before the end time and vice versa
	console.log(Number(toDateObject(avStartTime.value)));
	console.log(Number(toDateObject(avEndTime.value)));
	if (Number(toDateObject(avStartTime.value)) >= Number(toDateObject(avEndTime.value))) {
		timewarn.style.display = "";
	} else {
		timewarn.style.display = "none";
	}
}

function loadAirportsAvalible() {
	$.get(
		"https://airportapimaxstuffnet.wl.r.appspot.com/", //There, you happy now f**king mixed content errors!
		function(data) {
			parsedData=JSON.parse(data);
			for (i = 0; i<parsedData.length; i++) {
				newElement = document.createElement("option");
				newElement.textContent = parsedData[i][0]+" - "+parsedData[i][1];
				newElement.value = parsedData[i][0];
				airportSelect.appendChild(newElement);
			}
			loadFlightData();
		},
	).fail(function (data) {
			console.log(data);
		}
	)
}

var flightDataCache = [];

function loadFlightData() {
	$.get(
		"https://airportapimaxstuffnet.wl.r.appspot.com/?airport="+airportSelect.value,
		function(data) {
			flightDataCache = JSON.parse(data);
		},
	).fail(function (data) {
			console.log(data);
		}
	)
}

function validateDuration() {
	if (Number(timeSpentM.value)<0) {
		timeSpentM.value = 59;
		timeSpentH.value = Number(timeSpentH.value)- 1;
	}
	if (Number(timeSpentM.value)>59) {
		timeSpentM.value = 0
		timeSpentH.value = Number(timeSpentH.value)+1;
	}
	if (Number(timeSpentH.value)>=1) {
		timeSpentM.min = -1;
	} else {
		timeSpentM.min = 0;
	}
}

function toPlace(x) {
	if (x == 1) {
		return String(x)+"st";
	} else if (x == 2) {
		return String(x)+"nd";
	} else if (x == 3) {
		return String(x)+"rd";
	} else {
		return String(x)+"th";
	}
}

function findTimes() {
	timeAvalible = ((Number(timeSpentH.value)*60)+Number(timeSpentM.value))*60;
	for (i = 0; i < flightDataCache.length; i++) {
		flightCount = 0;
		arrivalCount = 0;
		departureCount = 0;
		aircraftTypes = [];
		for (j = 0; j < flightDataCache.length-i; j++) {
			if (flightDataCache[i]["
		}
	}
	places = ["a"];
	resultSpan.innerHTML = places.join("<br>");
}

timeSpentH.oninput = validateDuration;
timeSpentM.oninput = validateDuration;

validateDuration();
setTimeDefaults();
validateTime();
loadAirportsAvalible();

getTimes.onclick = function () {
	//Hardcore dev? run `localStorage.setItem("skipLoad",true)`
	//https://www.youtube.com/watch?v=O6ZQ9r8a3iw
	//Why Some Apps Are Intentionally Slow - Cheddar Explains
	if (localStorage.getItem("skipLoad") == "true") {
		findTimes();
	} else {
		WAITTIME = 2000;
		resultSpan.textContent = "Loading 0% [----------]";
		setTimeout(function () {resultSpan.textContent = "Loading 10% [#---------]";},(WAITTIME/10)*1);
		setTimeout(function () {resultSpan.textContent = "Loading 20% [##--------]";},(WAITTIME/10)*2);
		setTimeout(function () {resultSpan.textContent = "Loading 30% [###-------]";},(WAITTIME/10)*3);
		setTimeout(function () {resultSpan.textContent = "Loading 40% [####------]";},(WAITTIME/10)*4);
		setTimeout(function () {resultSpan.textContent = "Loading 50% [#####-----]";},(WAITTIME/10)*5);
		setTimeout(function () {resultSpan.textContent = "Loading 60% [######----]";},(WAITTIME/10)*6);
		setTimeout(function () {resultSpan.textContent = "Loading 70% [#######---]";},(WAITTIME/10)*7);
		setTimeout(function () {resultSpan.textContent = "Loading 80% [########--]";},(WAITTIME/10)*8);
		setTimeout(function () {resultSpan.textContent = "Loading 90% [#########-]";},(WAITTIME/10)*9);
		setTimeout(function () {resultSpan.textContent = "Loading 100% [##########]";},(WAITTIME/10)*10);
		setTimeout(findTimes,(WAITTIME/10)*11);
	}
}

airportSelect.onchange = loadFlightData;
//airportSelect.onchange = function () {console.log("onchange")};



