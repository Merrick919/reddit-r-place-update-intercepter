const http = require("http");

http.createServer((req, res) => {
	let data = "";
	
	req.on("data", chunk => {
		data += chunk;
	})
	
	req.on("end", () => {
		res.writeHead(200);
		res.write("ok");
		res.end();
		
		let parsed = JSON.parse(data);
		console.log(`sector: ${parsed.sector}; x: ${parsed.x}; y: ${parsed.y}; colourName: ${parsed.colourName}; rgba: ${parsed.r}, ${parsed.g}, ${parsed.b}, ${parsed.a}`);
	})
}).listen(9092);