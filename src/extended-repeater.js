const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  if (options.repeatTimes === 1 && !options.addition) { return str}
  let newStr = String(str)
  let defaultValues = {
    repeatTimes: options.repeatTimes || 1,
    separator: options.separator || '+'
  }
  if (options.addition || typeof options.addition === 'boolean' || options.addition === null) {
    defaultValues.addition = String(options.addition);
    defaultValues.additionRepeatTimes = options.additionRepeatTimes || 1;
    if (defaultValues.additionRepeatTimes > 1) {
      defaultValues.additionSeparator = options.additionSeparator || '|';
    };
  };
    let strAddition = '';
    if (defaultValues.addition) {
      for (let j = 0; j < defaultValues.additionRepeatTimes; j++) {
        if (defaultValues.additionSeparator) {
          strAddition += `${defaultValues.addition}${defaultValues.additionSeparator}`
        } else {
          strAddition += `${defaultValues.addition}`
        }
      }
    }
  let fullStr = '';
  defaultValues.additionSeparator ? strAddition = strAddition.slice(0, strAddition.length - defaultValues.additionSeparator.length) : strAddition;
  const strWithAddition = newStr + `${strAddition}`
  if (defaultValues.repeatTimes === 1) {
    fullStr += strWithAddition;
  } else {
    fullStr += `${strWithAddition}${defaultValues.separator}`
  }
  const res = fullStr.repeat(defaultValues.repeatTimes)
  return defaultValues.repeatTimes === 1 ? res : res.slice(0, res.length - defaultValues.separator.length)
}

module.exports = {
  repeater
};
