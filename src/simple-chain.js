const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 * 
 */
const chainMaker = {
  getLength() {
    let result = this.resultArr.length;
    this.resultArr.length = 0;
    return result;
  },
  addLink(value) {
    if (typeof value === 'undefined') this.resultArr.push(`( )~~`);
    else if (value === null) this.resultArr.push(`( ${value} )~~`);
    else {
      this.resultArr.push(`( ${value.toString()} )~~`);
    }
    return this;
  },
  removeLink(position) {
    try {
      if (!Number.isInteger(position) || position <= 0 || position > this.resultArr.length - 1) SomeError
        this.resultArr.splice(position - 1, 1);
        return this;
    }
    catch {
      this.resultArr.length = 0;
      throw new Error ('You can\'t remove incorrect link!');
    }
  },
  reverseChain() {
    this.resultArr.reverse()
    return this;
  },
  finishChain() {
    let lastItem = this.resultArr[this.resultArr.length - 1];
    lastItem = lastItem.slice(0, lastItem.length - 2);
    let result = this.resultArr.slice();
    result[result.length - 1] = lastItem;
    this.resultArr.length = 0;
    return result.join('');
  },
  resultArr : resultArr = [],
};

module.exports = {
  chainMaker
};
