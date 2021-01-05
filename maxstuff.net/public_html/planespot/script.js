var airportapiURL = "https://airportapimaxstuffnet.wl.r.appspot.com/";
if (localStorage.getItem("airportapiURL")) {
	var airportapiURL = localStorage.getItem("airportapiURL");
}

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
		airportapiURL, //There, you happy now f**king mixed content errors!
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
	flightDataCache = [];
	resultTable.style.display="none";
	$.get(
		airportapiURL+"?airport="+airportSelect.value,
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
	spottingTimes = [];
	startTime = new Date(avStartTime.value).getTime()/1000;
	endTime = new Date(avEndTime.value).getTime()/1000;
	for (i = 0; i < flightDataCache.length; i++) {
		flightCount = 0;
		arrivalCount = 0;
		departureCount = 0;
		earliestTime = Infinity;
		latestTime = -Infinity;
		aircraftTypes = [];
		for (j = 0; j < flightDataCache.length-i; j++) {
			if (flightDataCache[j]["cancelled"] == false) {
				if (flightDataCache[j]["est_time"] < flightDataCache[i]["est_time"]+timeAvalible && flightDataCache[j]["est_time"] > flightDataCache[i]["est_time"] && startTime <= flightDataCache[j]["est_time"] && endTime >= flightDataCache[j]["est_time"]/* && !(flightDataCache[j]["aircraft"]=="143")*/) {//Javscript if statments suck!
					flightCount+=1;
					if (flightDataCache[j]["arrival_departure"] == "a") {
						arrivalCount += 1;
					} else if (flightDataCache[j]["arrival_departure"] == "d") {
						departureCount += 1;
					}
					if (!aircraftTypes.includes(flightDataCache[j]["aircraft"])) {
						aircraftTypes.push(flightDataCache[j]["aircraft"]);
					}
					if (flightDataCache[j]["est_time"] < earliestTime) {
						earliestTime=flightDataCache[j]["est_time"];
					}
					if (flightDataCache[j]["est_time"] > latestTime) {
						latestTime=flightDataCache[j]["est_time"];
					}
				}
			}
		}
		spottingTimeScore = Number(arrivalWeight.value)*arrivalCount+Number(departureWeight.value)*departureCount;
		spottingTimes.push([flightCount,arrivalCount,departureCount,aircraftTypes.length,spottingTimeScore,earliestTime,latestTime]);
	}
	places = [];
	tableBody.innerHTML = "";
	spottingTimesSorted = spottingTimes.sort((a, b) => (a[4] < b[4]) ? 1 : (a[4] === b[4]) ? ((a[6]-a[5] > b[6]-b[5]) ? 1 : -1) : -1);
	//appendedAtLeastOne = false;
	for (i = 0; i < spottingTimesSorted.length; i++) {
		places.push(toPlace(i+1)+" "+spottingTimesSorted[i][1]+" "+spottingTimesSorted[i][2]+" "+spottingTimesSorted[i][3])
		currentTableRowElement = document.createElement("tr");
		colOne = document.createElement("td");
		colTwo = document.createElement("td");
		colThree = document.createElement("td");
		colFour = document.createElement("td");
		colFive = document.createElement("td");
		colOne.textContent=spottingTimesSorted[i][1];
		colTwo.textContent=spottingTimesSorted[i][2];
		colThree.textContent=spottingTimesSorted[i][3];
		if (spottingTimesSorted[i][5] < startTime) {
			colFour.textContent=(new Date(startTime*1000).toString().slice(0,21));
		} else {
			colFour.textContent=(new Date(spottingTimesSorted[i][5]*1000).toString().slice(0,21));
		}
		if (spottingTimesSorted[i][6] > endTime) {
			colFive.textContent=(new Date(endTime*1000).toString().slice(0,21));
		} else {
			colFive.textContent=(new Date(spottingTimesSorted[i][6]*1000).toString().slice(0,21));
		}
		currentTableRowElement.appendChild(colOne);
		currentTableRowElement.appendChild(colTwo);
		currentTableRowElement.appendChild(colThree);
		currentTableRowElement.appendChild(colFour);
		currentTableRowElement.appendChild(colFive);
		if (spottingTimesSorted[i][0] > 0) {
			tableBody.appendChild(currentTableRowElement);
		}
	}
	//console.log(flightDataCache);
	if (flightDataCache.length == 0) {
		setTimeout(findTimes,500);
		console.log("Trying again");
		waitElement = document.createElement("p");
		waitElement.textContent="We are prepearing the cache system please wait 15 seconds.";
		tableBody.appendChild(waitElement);
	}
	nextColor = 0;
	for (i = 0; i < tableBody.children.length; i++) {
		if (nextColor == 0) {
			tableBody.children[i].style.backgroundColor="#d1d1d1";
			nextColor=1;
		} else if (nextColor == 1) {
			tableBody.children[i].style.backgroundColor="#ededed";
			nextColor=0;
		}
	}
	resultSpan.style.display = "none";
	resultSpan.innerHTML = "";
	resultTable.style.display="";
//	return spottingTimes;
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
		WAITTIME = 1500;
		resultSpan.style.display = "";
		tableBody.innerHTML="";
		resultTable.style.display="none";
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
		//setTimeout(function () {resultSpan.textContent = "This is embarrasing! Our fake load time is shorter then our actual load time. Just wait for 10 seconds about.";},(WAITTIME/10)*12);
		setTimeout(findTimes,(WAITTIME/10)*11);
	}
}

airportSelect.onchange = loadFlightData;
//airportSelect.onchange = function () {console.log("onchange")};



