const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("\'arr\' parameter must be an instance of the Array!");
  };
  const discardNext = '--discard-next';
  const discardPrev = '--discard-prev';
  const doubleNext = '--double-next';
  const doublePrev = '--double-prev';
  let res = [];
  for (let i =0; i< arr.length; i++) {
    switch (arr[i]) {
      case discardNext:
        res.push('plug');
        i++;
        break;
      case discardPrev:
        res[res.length - 1] !== 'plug' && res.pop();
        res.push('plug');
      break;
      case doubleNext:
        i !== arr.length - 1 && res.push(arr[i + 1]);
        res.push('plug');
      break;
      case doublePrev:
        i > 0 && res[res.length - 1] !== 'plug' && res.push(arr[i - 1])
        res.push('plug');
      break;
      default: res.push(arr[i]);
    }
  }
const filterArr = res.filter(el => el !== 'plug');
  return filterArr;
}

module.exports = {
  transform
};
