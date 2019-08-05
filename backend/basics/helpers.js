console.log('Process: ' , process) // print out process object
/***  process object contains a list of exported module  ***/


// function sum(a,b) {
// 	return a + b
// }

// arrow function
const sum = (a, b) => {
	return a + b
} // sum

/*** an arrow function with single body statement can be shorten ***/
const sum2 = (a, b) => a + b;

// insert functions into exported module list inside process object
module.exports = {
	sum, sum2
}

/*** same as 
exports.sum = (a, b) => a + b;
exports.sum2 = (a, b) => a + b;
 ***/

console.log('Process: ' , process)

