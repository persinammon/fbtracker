console.log("popup.js ran");

chrome.storage.sync.get(null, function(p) {
	for (prop in p) {
	    if (!p.hasOwnProperty(prop)) {
	        //The current property is not a direct property of p
	        continue;
	    }
	    //Do your logic with the property here
	    if (prop == "total_time") {
	    	let alltime = document.getElementById("time");
	    	alltime.innerHTML = p[prop]/60000; //convert from millis
	    } else {
	    	let timey = p[prop][2]/60000;
	    	let people = document.getElementById("people");
	    	people.outerHTML = people.outerHTML + "<li>" + 
	    		timey + " minutes admiring " + p[prop][0] + " <img src=" +
	    		 p[prop][1] +" height=200></li>";
	    }
	}
});
