const http = require("http");
const getPixels = require("get-pixels");

http.createServer((req, res) => {
	console.log('request url: ' + req.url);

	req.on('end', () => {
		res.writeHead(200);
		res.write("ok");
		res.end();
	})

	getPixels(req.url.slice(5), function(error, pixels) {
		if (error) {
			console.log("Bad image path");
			return;
		}
	console.log("Got pixels", pixels.shape.slice());
	})
}).listen(9000);