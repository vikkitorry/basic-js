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
    this.direction = direction === undefined || Boolean(direction);
  }
  checkArg(message, key) {
    if (!message || !key || message === null || key === null || 
      message === '' || key === '' || typeof message !== 'string' || typeof key !== 'string') {
      throw new Error ('Incorrect arguments!');
    }
  }
  encrypt(message, key) {
    this.checkArg(message, key);
    let msgToEncrypt = message.toUpperCase();
    let msgEnc = '';
    let newKey = '';
    const lettersCounterEnc = msgToEncrypt.match(/[A-Z]/g).length;
    if (this.direction === false) {
      msgToEncrypt = msgToEncrypt.split('').reverse().join('');
    };
    for (let i = 0; i < lettersCounterEnc; i++) {
      newKey += key[i % key.length];
    };
    newKey = newKey.toUpperCase();
    if (this.direction === false) {
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
  decrypt(message, key) {
    this.checkArg(message, key);
    let msgToDec = message.toUpperCase();
    let newKeyDec = '';
    let msgDec = '';
    const lettersCounterDec = msgToDec.match(/[A-Z]/g).length;
    for (let i = 0; i < lettersCounterDec; i++) {
      newKeyDec += key[i % key.length];
    };
    newKeyDec = newKeyDec.toUpperCase();
    if (this.direction === false) {
      msgToDec = msgToDec.split('').reverse().join('');
    };
    if (this.direction === false) {
      newKeyDec = newKeyDec.split().reverse().join('');
    };

    let msgLttrInd = 0;
    let passLttrInd = 0;
    let passLttrCounter = 0;
    let indCheck;
    for (let i = 0; i < msgToDec.length; i++) {
      msgLttrInd = this.validLetters.indexOf(msgToDec[i]);
      passLttrInd = this.validLetters.indexOf(newKeyDec[passLttrCounter]);
      if (msgLttrInd >= 0) {
        indCheck = msgLttrInd - passLttrInd;
        indCheck = indCheck > 0 ? indCheck : indCheck + this.validLetters.length;
        msgDec += this.validLetters[indCheck % this.validLetters.length];
        passLttrCounter = (passLttrCounter + 1) % newKeyDec.length;
      } else {
        msgDec += msgToDec[i];
      }
    }
    return msgDec;
  }

}

module.exports = {
  VigenereCipheringMachine
};
