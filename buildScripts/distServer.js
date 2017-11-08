import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

/* eslint-disable no-console */

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.get ('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../dist/index.html'));
});

//pretend this is the actual (non-testing) api call
app.get ('/users', function(req, res) {
	res.json([
		{"id": 1,"firstName":"Bob","lastName":"Smith","email":"bob@gmail.com"},
		{"id": 2,"firstName":"Larry","lastName":"Tomas","email":"tom@mgial.cpo"}
	]);
});

app.listen(port, function(err) {
	if (err) {
		console.log(err);
	} else {
		open('http://localhost:' + port);
		//console.log("Ready to go!");
	}
})
