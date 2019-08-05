const express = require('express')
const app = express()

/* 
	get(URL, call back function):

		URL comes from the request,
		give a response based on the request

*/
app.get('/', (request, response) => {
	response.send('Hello express!!')
}) // request from browser to server

app.listen('3000')