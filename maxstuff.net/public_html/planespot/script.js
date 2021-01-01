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
function roundTime(a,x) {
	return new Date((Math.round((Number(new Date(a))/1000)/x)*1000)*x);
}
function toDateObject(a) {
	return new Date(a);
}
function deZone(a) {
	return addDates(a,(0-a.getTimezoneOffset())*60)
}

function setTimeDefaults() {
	currentDateTime = new Date();
	if (currentDateTime.getHours()>14) {
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

function validateTime() {
	if (toDateObject(avStartTime.value) >= toDateObject(avEndTime.value)) {
		timewarn.style.display = "";
	} else {
		timewarn.style.display = "none";
	}
}

setTimeDefaults();
validateTime();
avStartTime.onchange = validateTime();
avEndTime.onchange = validateTime();
