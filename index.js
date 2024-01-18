// index.js
// where your node app starts

// init project
import express from "express";
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
import cors from "cors";
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
	res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/api/:date?", function (req, res) {
	let date = req.params.date;
	if (date) {
		date = isNaN(date) ? date : parseInt(date);
		const dateObj = new Date(date);
		if (dateObj.toString() === "Invalid Date") {
			res.json({ error: "Invalid Date" });
		} else {
			const unix = dateObj.getTime();
			const utc = dateObj.toUTCString();
			res.json({ unix, utc });
		}
	} else {
		const currentDate = new Date();
		const unix = currentDate.getTime();
		const utc = currentDate.toUTCString();
		console.log(utc);
		res.json({ unix, utc });
	}
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
	console.log("Your app is listening on port " + listener.address().port);
});
