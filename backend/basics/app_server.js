http = require('http')
server = http.createServer((req, res) => {
	res.end('Hello world')
})

server.listen(3000)