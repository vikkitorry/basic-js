const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given matrix where you have to find cats by ears "^^"
 *
 * @param {Array<Array>} matrix 
 * @return {Number} count of cats found
 *
 * @example
 * countCats([
 *  [0, 1, '^^'],
 *  [0, '^^', 2],
 *  ['^^', 1, 2]
 * ]) => 3`
 *
 */
function countCats(cats) {
  return cats.reduce((acc, el) => acc += el.reduce((acc, el) =>  el === '^^' ? acc += 1 : acc += 0, 0), 0);
}
module.exports = {
  countCats
};
