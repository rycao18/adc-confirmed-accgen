var request = require('request');
var fs = require('fs');

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

var randomemail = "";

for (var a = 0; a < 2; a++) {
	randomemail += alphabet[Math.floor(Math.random() * 26)];
}

for (var b = 0; b < 2; b++) {
	randomemail += nums[Math.floor(Math.random() * 10)];
}

randomemail += "@rycao.me";

console.log(randomemail);

request({
	url: 'https://apim.scv.3stripes.net/scvRESTServices/account/emailLookUp',
	followAllRedirects: true,
	method: 'POST',
	headers: {
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36",
		"Content-Type": "application/x-www-form-urlencoded"
	}, 
	formData: {
		"clientId":"1ffec5bb4e72a74b23844f7a9cd52b3d",
		"email": randomemail,
		"source":"1960",
		"countryOfSite":"US",
		"legalEntity":"ADIUS"
	}, 
}, function(err, response, body) {
	if (err) console.log("ERROR: " + err);
	else {
		console.log(body);
	}
});

// request({
// 	url: 'https://apim.scv.3stripes.net/scvRESTServices/account/createAccount', 
// 	method: 'post',
// 	headers: {
// 		"Origin": "https://www.adidas.com",
// 		"User-Agent": userAgent,
// 		"Content-Type": "application/x-www-form-urlencoded",
// 		"Accept": "application/json",
// 		"Referer": "https://www.adidas.com/us/confirmed/",
// 		"Accept-Language": "en-US,en;q=0.9"
// 	}, 
// 	formData: {
// 		"clientId":"1ffec5bb4e72a74b23844f7a9cd52b3d",
// 		"actionType":"REGISTRATION",
// 		"email": randomemail,
// 		"password":"Cartme123",
// 		"countryOfSite":"US",
// 		"dateOfBirth":"1999-12-28",
// 		"minAgeConfirmation":"Y",
// 		"firstName":"Richard",
// 		"lastName":"Cao"
// 	}, 
// }, function(err, response, body) {
// 	if (err) console.log("ERROR: " + err);
// 	else {
// 		fs.writeFileSync("index.html", body);
// 	}
// });