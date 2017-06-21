//event handler when visit facebook.com
//minimize chrome
//close chrome
//open a new tab
//visit facebook.cm
//exit facebook.com

var img;
var name;
var start_person;
var end_person;
var total_time = 0;
var start_time;
var previousid = [];

chrome.browserAction.onClicked.addListener(function() {
	console.log("clicked");
	chrome.tabs.create({url: chrome.extension.getURL('popup.html')});
});

chrome.runtime.onMessage.addListener(
  function(request) {
  	console.log(request);
    img = request.img;
    name = request.names;
    let d = new Date();
   	start_person = d.getTime();
   	start_time = d.getTime();
    end_person = null;
    previousid.push(start_person.toString());

    console.log("started person " + d.toString() + " " + name);
    let string = previousid[previousid.length-1];
    chrome.storage.sync.set({string:[name, img, start_person]});

  });

chrome.windows.getCurrent(function(window) {
	if (window.WindowState == "minimized") {
			//end a person
		//means last tab was a person
		let d = new Date();

		console.log("windows" + name );
		chrome.tabs.reload();


		if (start_time != null) {
			total_time = total_time + d.getTime() - start_time;
			chrome.storage.sync.set({"total_time":total_time});
		}
		start_time = null;

		if (start_person != null && end_person == null) {
			end_person = d.getTime();
			let entry = {};
			let string = previousid.shift();
			entry[string] = [name, img, end_person - parseInt(string)];
			chrome.storage.sync.set(entry);
  			total_time = total_time + end_person - start_person;
			chrome.storage.sync.set({"total_time":total_time});
			start_time = null;
			img = null;
			name = null;
			start_person = null;
			end_person = null;

			console.log("ended " + string);
		} 
	}
}); //window removal unimportant

chrome.tabs.onCreated.addListener(function(tabs){
	//end a person
	//means last tab was a person
	let d = new Date();
	console.log("created" + name );
	chrome.tabs.reload();


	if (start_person != null && end_person == null) {
		end_person = d.getTime();

		let entry = {};
		let string = previousid.shift();
		entry[string] = [name, img, end_person - parseInt(string)];
		chrome.storage.sync.set(entry);

		total_time = total_time + end_person - start_person;
		chrome.storage.sync.set({"total_time":total_time});
		start_time = null;
		img = null;
		name = null;
		start_person = null;
		end_person = null;

		console.log("ended " + string);
	} 
	//if it is a general facebook then need to add to total time
	if (tabs.url == "https://facebook.com/*" || tabs.url == "http://facebook.com/*") {
		if (start_time == null) { //then need to start it
			start_time = d.getTime();
		}
	
	} else {
		//if normal tab then log the fb time if it exists
		if (start_time != null) {
			total_time = total_time + d.getTime() - start_time;
			chrome.storage.sync.set({"total_time":total_time});
		}
		start_time = null;
	}
	

	//person would already be started with onmessage 	
});


chrome.tabs.onUpdated.addListener(function(tabs){
	if (tabs.active) {
		 let d = new Date();
		 console.log("updated" + name );
		 chrome.tabs.reload();


		//end a person
		//means last tab was a person
		let same = chrome.storage.get(previousid[0], function(item){return item[0];});
		if (start_person != null && end_person == null && same != name) {
			end_person = d.getTime();
			let entry = {};
			let string = previousid.shift();
			entry[string] = [name, img, end_person - parseInt(string)];
			chrome.storage.sync.set(entry);	
			total_time = total_time + end_person - start_person;
			chrome.storage.sync.set({"total_time":total_time});
			start_time = null;
			img = null;
			name = null;
			start_person = null;
			end_person = null;

			console.log("ended " + string);
		} 
		//if it is a general facebook then need to add to total time
		if (tabs.url == "https://facebook.com/*" || tabs.url == "http://facebook.com/*") {
			if (start_time == null) { //then need to start it
				start_time = d.getTime();
			}

		} else {
			//if normal tab then log the fb time if it exists
			if (start_time != null) {
				total_time = total_time + d.getTime() - start_time;
				chrome.storage.sync.set({"total_time":total_time});
			}
			start_time = null;
		}
	}
});

chrome.tabs.onActivated.addListener(function(tabs){
	//end a person
	//means last tab was a person
	let d = new Date();
	console.log("activated" + name );
	chrome.tabs.reload();

	if (start_person != null && end_person == null) {
		end_person = d.getTime();
		console.log(previousid);

		let entry = {};
		let string = previousid.shift();
		entry[string] = [name, img, end_person - parseInt(string)];
		chrome.storage.sync.set(entry);
		total_time = total_time + end_person - start_person;
		chrome.storage.sync.set({"total_time":total_time});
		start_time = null;
		img = null;
		name = null;
		start_person = null;
		end_person = null;

		console.log("ended " + string);
	} 
	//if it is a general facebook then need to add to total time
	if (tabs.url == "https://facebook.com/*" || tabs.url == "http://facebook.com/*") {
		if (start_time == null) { //then need to start it
			start_time = d.getTime();
		}
	
	} else {
		//if normal tab then log the fb time if it exists
		if (start_time != null) {
			total_time = total_time + d.getTime() - start_time;
			chrome.storage.sync.set({"total_time":total_time});
		}
		start_time = null;
	}
});
