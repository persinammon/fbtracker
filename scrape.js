// chrome.runtime.onMessage.addListener(
// 	function(deets) {

//   	if (deets.sender == "back") {
//   		console.log("scrape.js ran b/c update");
//   		if (document.getElementsByClassName("profilePic img") != null) {
// 			chrome.runtime.sendMessage({sender:"scrape",img: document.getElementsByClassName("profilePic img")[0].src,
// 			names:document.getElementById("fb-timeline-cover-name").innerHTML});
// 		}
//   	}
// });

console.log("scrape.js ran");
if (document.getElementsByClassName("profilePic img")[0] != null) {
	chrome.runtime.sendMessage({img: document.getElementsByClassName("profilePic img")[0].src,
	names:document.getElementById("fb-timeline-cover-name").innerHTML});
}