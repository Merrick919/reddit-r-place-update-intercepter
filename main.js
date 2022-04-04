const http = require("http");
const getPixels = require("get-pixels");

http.createServer((req, res) => {
	console.log('request url: ' + req.url);

	req.on('end', () => {
		res.writeHead(200);
		res.write("ok");
		res.end();
	})

	getPixels("http://" + req.url.slice(6), function(error, pixels) {
		if (error) {
			console.log("Bad image url");
			return;
		}
		
		for (let y = 0; y < pixels.shape[1]; y ++) {
			for (let x = 0; x < pixels.shape[0]; x ++) {
				if (pixels.get(x, y, 0) == 0 && pixels.get(x, y, 1) == 0 && pixels.get(x, y, 2) == 0 && pixels.get(x, y, 3) == 0) {
					//
				} else {
					console.log(req.url.slice(6) + `${x}, ${y}: rgba(${pixels.get(x, y, 0)}, ${pixels.get(x, y, 1)}, ${pixels.get(x, y, 2)}, ${pixels.get(x, y, 3)})`);
				}
			}
		}
	})
}).listen(9000);