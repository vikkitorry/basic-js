const { NotImplementedError } = require('../extensions/index.js');

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
  let newMatrix = JSON.parse(JSON.stringify(matrix));
  const rowLength = matrix[0].length;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < rowLength; j++) {
      let minCounter = 0;
      //r - along Row, c - along Column
      for (let r = i - 1; r <= i + 1; r++) {
        for (let c = j - 1; c <= j + 1; c++) {
          r >= 0 && c >= 0 && r < matrix.length && c < rowLength && matrix[r][c] === true && minCounter++;
        }
      }
      matrix[i][j] === true && minCounter--
      newMatrix[i][j] = minCounter;
    }
  }
  return newMatrix;
}

module.exports = {
  minesweeper
};
