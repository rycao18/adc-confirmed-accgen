const j = require('request').jar();
const request = require('request').defaults({
  timeout: 10000,
  jar: j,
});
var fs = require('fs');
var https = require('https');

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

var randomemail = "";

for (var a = 0; a < 2; a++) {
	randomemail += alphabet[Math.floor(Math.random() * 26)];
}

for (var b = 0; b < 2; b++) {
	randomemail += nums[Math.floor(Math.random() * 10)];
}

randomemail += "@rycao.me";

console.log(randomemail);

function doSecond() {
	var jsonObject = JSON.stringify({
		"clientId":"1ffec5bb4e72a74b23844f7a9cd52b3d",
		"username":"US|"+randomemail,
		"password":"Cartme123",
		"validator_id":"confirmed4oauthUS",
		"grant_type":"password",
		"scope": "pii mobile2web",
		"access_token_manager_id":"jwt"
	});
	 
	var postheaders = {
	    'Content-Type' : 'application/json',
	    'Content-Length' : Buffer.byteLength(jsonObject, 'utf8')
	};
	 
	// the post options
	var optionspost = {
	    host : 'cp.adidas.com',
	    port : 443,
	    path : '/as/token.oauth2',
	    method : 'POST',
	    headers : postheaders
	};
	 
	console.info('Do the POST call');
	 
	// do the POST call
	var reqPost = https.request(optionspost, function(res) {
	    console.log("statusCode: ", res.statusCode);
	    res.on('data', function(d) {
	        console.info('POST result:\n');
	        process.stdout.write(d);
	        console.info('\n\nPOST completed');
	    });
	});

	reqPost.write(jsonObject);
	reqPost.end();
	reqPost.on('error', function(e) {
	    console.error(e);
	});
}

request({
	uri: 'https://apim.scv.3stripes.net/scvRESTServices/account/createAccount', 
	method: 'post',
	headers: {
		"Origin": "https://www.adidas.com",
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36",
		"Content-Type": "application/json",
		"Accept": "application/json",
		"Referer": "https://www.adidas.com/us/confirmed/",
		"Accept-Language": "en-US,en;q=0.9"
	}, 
	json: {
		"clientId":"1ffec5bb4e72a74b23844f7a9cd52b3d",
		"actionType":"REGISTRATION",
		"email": randomemail,
		"password":"Cartme123",
		"countryOfSite":"US",
		"dateOfBirth":"1999-12-28",
		"minAgeConfirmation":"Y",
		"firstName":"Richard",
		"lastName":"Cao"
	}, 
}, function(err, response, body) {
	if (err) console.log("ERROR: " + err);
	else {
		console.log(body);
	}
});

// It's possible that ADC has blocked C9 as get requests don't work either

var access_token;

request({
	url: 'https://cp.adidas.com/as/token.oauth2', 
	method: 'post',
	headers: {
		"Origin": "https://www.adidas.com",
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36",
		"Content-Type": "application/x-www-form-urlencoded",
		"Accept": "application/json",
		"Referer": "https://www.adidas.com/us/confirmed/",
		"Accept-Language": "en-US,en;q=0.9"
	}, 
	form: {
		"client_id":"1ffec5bb4e72a74b23844f7a9cd52b3d",
		"username":"US|" + randomemail,
		"password":"Cartme123",
		"validator_id":"confirmed4oauthUS",
		"grant_type":"password",
		"scope":"pii mobile2web",
		"access_token_manager_id":"jwt"
	}, 
}, function(err, response, body) {
	if (err) console.log("ERROR: " + err);
	else {
		console.log(body);
		var res = JSON.parse(body);
		access_token = res["access_token"];
		console.log(access_token);
	}
});
