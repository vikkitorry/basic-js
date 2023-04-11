const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {

  constructor (direction) {
    this.validLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.direction = Boolean(direction === undefined) || Boolean(direction);
  }

  checkArg(message, key) {
    if (!message || !key || message === null || key === null || 
      message === '' || key === '' || typeof message !== 'string' || typeof key !== 'string') {
      throw new Error ('Incorrect arguments!');
    }
  }

  encrypt(message, key) {
    this.checkArg(message, key)
    let msgEnc = '';
    let newKey = '';
    let msgToEncrypt = message.toUpperCase();
    const lettersCounterEnc = msgToEncrypt.match(/[A-Z]/g).length;
    if (this.direction  === false) {
      msgToEncrypt = msgToEncrypt.split('').reverse().join('');
    };
    for (let i = 0; i < lettersCounterEnc; i++) {
      newKey += key[i % key.length];
    };
    newKey = newKey.toUpperCase();
    if (this.direction  === false) {
      newKey = newKey.split().reverse().join('');
    };
    let msgLttrInd = 0;
    let passLttrInd = 0;
    let passLttrCounter = 0;
    for (let i = 0; i < msgToEncrypt.length; i++) {
      msgLttrInd = this.validLetters.indexOf(msgToEncrypt[i]);
      passLttrInd = this.validLetters.indexOf(newKey[passLttrCounter]);
      if (msgLttrInd >= 0) {
        msgEnc += this.validLetters[(msgLttrInd + passLttrInd) % this.validLetters.length];
        passLttrCounter = (passLttrCounter + 1) % newKey.length
      } else {
        msgEnc += msgToEncrypt[i]
      };
    };
    return msgEnc;
  };
}

module.exports = {
  VigenereCipheringMachine
};
