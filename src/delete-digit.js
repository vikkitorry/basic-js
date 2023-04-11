const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  let str = n + '';
  let res = 0;
  for (let  i = str.length - 1; i >= 0; i--) {
    let arrWithoutDigit = str.split('');
    arrWithoutDigit.splice(i, 1)
    let counter = +(arrWithoutDigit.join(''));
      if (res < counter) {
        res = counter
      }
  }
  return res;
}

module.exports = {
  deleteDigit
};
