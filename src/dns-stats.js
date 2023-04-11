const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  let result = {};
  const domainsArr = domains.map((el) => el.split('.').reverse());
  domainsArr.forEach((item) => {
    let counter = '';
    for (let i = 0; i < item.length; i++) {
      counter += `.${item[i]}`;
      if (result[counter]) {
        result[counter] = result[counter] + 1
      } else {
        result[counter] = 1
      }
    };
  });
  return result;
}

module.exports = {
  getDNSStats
};
