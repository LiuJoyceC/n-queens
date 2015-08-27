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
window.findNQueensSolution = function(n, all) {
  var solution = [];
  var finalSolution = [];
  var count = 0;
  var col = 0;
  var major = 0;
  var minor = 0;
  var noConflict;
  for (var i = 0; i < n; i++) {
    solution[i] = 0;
    finalSolution[i] = [];
    for (var j = 0; j < n; j++) {
      finalSolution[i][j] = 0;
    }
  }
  var solve = function(rowInd) {
    if (rowInd === n) {
      if(!all) {
        return true;
      }
      count++;
      return false;
    }
    for (var rowRep = 1; rowRep < (1<<n); rowRep = rowRep<<1) {
      var majorInd = (rowRep<<rowInd);
      var minorInd = ((rowRep<<(n-1))>>rowInd);
      hasConflict = rowRep&col || majorInd&major || minorInd&minor;
      if (!hasConflict) {
        solution[rowInd] = rowRep;
        col = col | rowRep;
        major = major | majorInd;
        minor = minor | minorInd;
        if (solve(rowInd + 1)) {
          return true;
        } else {
          solution[rowInd] = 0;
          col = col^rowRep;
          major = major^majorInd;
          minor = minor^minorInd;
        }
      }
    }
    return false;
  };
  var solved = solve(0);
  for (var h = 0; h < n; h++) {
    finalSolution[h][n - 1 - Math.log2(solution[h])] = 1;
  }
  if (!all) {
    if (solved) {
      console.log('Single solution for ' + n + ' queens:', JSON.stringify(finalSolution));
    } else {
      console.log("No solutions found");
    }
    return finalSolution;
  }
  return count;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = findNQueensSolution(n, true);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
