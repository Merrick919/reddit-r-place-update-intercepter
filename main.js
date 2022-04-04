import http from "http";
import getPixels from "get-pixels";
import fetch from "node-fetch";

http.createServer((req, res) => {
	console.log("Request url: " + req.url);

	req.on("end", () => {
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
					const url = req.url.slice(48).split("-");
					
					const body = {
						"time": url[0],
						"sector": url[1],
						"code": url[3].split(".")[0],
						"x": x,
						"y": y,
						"r": pixels.get(x, y, 0),
						"g": pixels.get(x, y, 1),
						"b": pixels.get(x, y, 2),
						"a": pixels.get(x, y, 3)
					};

					fetch("http://127.0.0.1:9009", {
						method: "post",
						body: JSON.stringify(body),
						headers: {"Content-Type": "application/json"}
					}).catch(console.error);

				}
			}
		}
	})
}).listen(9000);