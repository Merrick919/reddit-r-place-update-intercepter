import http from "http";
import getPixels from "get-pixels";
import fetch from "node-fetch";

function getColourName(r, g, b, a) {
	if (r == 109 && g == 0 && b == 26) { // 6d001a
		return "burgundy";
	} else if (r == 190 && g == 0 && b == 57) { // be0039
		return "dark red";
	} else if (r == 255 && g == 69 && b == 0) { // ff4500
		return "red";
	} else if (r == 255 && g == 168 && b == 0) { // ffa800
		return "orange";
	} else if (r == 255 && g == 214 && b == 53) { // ffd635
		return "yellow";
	} else if (r == 255 && g == 248 && b == 184) { // fff8b8
		return "pale yellow";
	} else if (r == 0 && g == 163 && b == 104) { // 00a368
		return "dark green";
	} else if (r == 0 && g == 204 && b == 120) { // 00cc78
		return "green";
	} else if (r == 126 && g == 237 && b == 86) { // 7eed56
		return "light green";
	} else if (r == 0 && g == 117 && b == 111) { // 00756f
		return "dark teal";
	} else if (r == 0 && g == 158 && b == 170) { // 009eaa
		return "teal";
	} else if (r == 0 && g == 204 && b == 192) { // 00ccc0
		return "light teal";
	} else if (r == 36 && g == 80 && b == 164) { // 2450a4
		return "dark blue";
	} else if (r == 54 && g == 144 && b == 234) { // 3690ea
		return "blue";
	} else if (r == 81 && g == 233 && b == 244) { // 51e9f4
		return "light blue";
	} else if (r == 73 && g == 58 && b == 193) { // 493ac1
		return "indigo";
	} else if (r == 106 && g == 92 && b == 255) { // 6a5cff
		return "periwinkle";
	} else if (r == 148 && g == 179 && b == 255) { // 94b3ff
		return "lavender";
	} else if (r == 129 && g == 30 && b == 159) { // 811e9f
		return "dark purple";
	} else if (r == 180 && g == 74 && b == 192) { // b44ac0
		return "purple";
	} else if (r == 228 && g == 171 && b == 255) { // e4abff
		return "pale purple";
	} else if (r == 222 && g == 16 && b == 127) { // de107f
		return "magenta";
	} else if (r == 255 && g == 56 && b == 129) { // ff3881
		return "pink";
	} else if (r == 255 && g == 153 && b == 170) { // ff99aa
		return "light pink";
	} else if (r == 109 && g == 72 && b == 47) { // 6d482f
		return "dark brown";
	} else if (r == 156 && g == 105 && b == 38) { // 9c6926
		return "brown";
	} else if (r == 255 && g == 180 && b == 112) { // ffb470
		return "beige";
	} else if (r == 0 && g == 0 && b == 0) { // 000000
		return "black";
	} else if (r == 81 && g == 82 && b == 82) { // 515252
		return "dark gray";
	} else if (r == 137 && g == 141 && b == 144) { // 898d90
		return "gray";
	} else if (r == 212 && g == 215 && b == 217) { // d4d7d9
		return "light gray";
	} else if (r == 255 && g == 255 && b == 255) { // ffffff
		return "white";
	}
}

http.createServer((req, res) => {
	console.log("Request url: " + req.url);

	req.on("end", () => {
		res.writeHead(200);
		res.write("ok");
		res.end();
	})

	getPixels("http://" + req.url.slice(6), (error, pixels) => {
		if (error) {
			console.log("Bad image url");
			return;
		}
		
		for (let y = 0; y < pixels.shape[1]; y ++) {
			for (let x = 0; x < pixels.shape[0]; x ++) {
				
				let r = pixels.get(x, y, 0);
				let g = pixels.get(x, y, 1);
				let b = pixels.get(x, y, 2);
				let a = pixels.get(x, y, 3);
				
				if (r == 0 && g == 0 && b == 0 && a == 0) {
					//
				} else {
					const url = req.url.slice(48).split("-");
					
					const body = {
						"time": url[0],
						"sector": url[1],
						"code": url[3].split(".")[0],
						"x": x,
						"y": y,
						"colourName": getColourName(r, g, b, a),
						"r": r,
						"g": g,
						"b": b,
						"a": a
					};

					fetch("http://127.0.0.1:9001", {
						method: "post",
						body: JSON.stringify(body),
						headers: {"Content-Type": "application/json"}
					}).catch(console.error);

				}
			}
		}
	})
}).listen(9000);