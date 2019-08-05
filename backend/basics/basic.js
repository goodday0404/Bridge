

const helpers = require('./helpers') // require import module

/*** use object destructor ***/
const { sum, sum2 } = require('./helpers');

const eval = helpers.sum(10,10);
const eval2 = sum2(20, 20);

console.log(eval)
console.log('sum2: ', eval2)