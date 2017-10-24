'use strict'

const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send("Hello world");
});

app.listen(8080, (err) => {
	if(err) {console.log(err);}
	console.log("App running on port 8080");
});
