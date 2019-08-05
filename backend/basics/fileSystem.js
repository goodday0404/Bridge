const fs = require('fs')
const file = 'basic.js'

/*
	watch( file name, callback ):

		callback is executed everytime the given file content is changed
*/
fs.watch(file, () => console.log("file content is changed"))

/*
	readFile( file name, callback)

	IMPORTANT: this is a asychrous call
*/
const errorHandler = err => console.log( err )
const dataHandler = data => console.log( data.toString() )

fs.readFile('basic.js', (err, data) => {
	if (err) errorHandler( err )
	dataHandler( data )
}) // readFile

console.log('testing asychrous call')

/*
	readFileSych( fileName ): sychrous call ( blocking call )
*/
const data = fs.readFileSych('basic.js') // block until the read operation complete
console.log(data.toString())

