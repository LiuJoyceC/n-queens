/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = [];
  for (var i = 0; i < n; i++) {
    solution[i] = [];
    for (var j = 0; j < n; j++) {
      if (i === j) {
        solution[i][j] = 1;
      } else {
        solution[i][j] = 0;
      }
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1;

  for (var i = 2; i <= n; i++) {
    solutionCount *= i;
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  var col = [];
  var major = [];
  var minor = [];
  var noConflict;
  for (var i = 0; i < n; i++) {
    solution[i] = [];
    for (var j = 0; j < n; j++) {
        solution[i][j] = 0;
    }
  }
  var solve = function(rowInd) {
    console.log(rowInd);
    if (rowInd === n) {
      return true;
    }
    for (var colInd = 0; colInd < n; colInd++) {
      var majorInd = colInd - rowInd + n - 1;
      var minorInd = rowInd + colInd;
      noConflict = !(col[colInd] || major[majorInd] || minor[minorInd]);
      if (noConflict) {
        solution[rowInd][colInd] = 1;
        col[colInd] = 1;
        major[majorInd] = 1;
        minor[minorInd] = 1;
        if (solve(rowInd + 1)) {
          return true;
        } else {
          solution[rowInd][colInd] = 0;
          col[colInd] = 0;
          major[majorInd] = 0;
          minor[minorInd] = 0;
        }
      }
    }
    return false;
  };
  if (solve(0)) {
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  } else {
    console.log("No solutions found");
  }
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
