

var turn = -1;  // Human always goes first with an X
var theBoard;

var makeBoard = function (){
    var b = document.board;
    theBoard = [b.b0,b.b1,b.b2,b.b3,b.b4,b.b5,b.b6,b.b7,b.b8];
    newGame();
}

var move = function (square){
    if (square.value == ""){
    	if (turn === -1) {
    		square.value = "X";
    	} else {
    		square.value = "O";	
    	}
    	if (gameOver(square.accessKey)) return; 
    	if (document.board.opponent.value === "Human") {
    		turn *= -1;
    	} else {
    		var computerMove = lookAhead(anyOldBoard(), 1, 0);   	//	1=Computers Turn   0=Current Search Depth
    		theBoard[computerMove].value = "O"
    		if ( gameOver ( computerMove ) ) return;
    	}	
    }
}    

var gameOver = function (lastMove) {
    if (isWinningMove(anyOldBoard(), lastMove)) {
    	alert( theBoard[lastMove].value + "Wins!")
    	newGame();	
    	return true
    } else if (isADraw(anyOldBoard())) {
    	alert( " DRAW! ");
    	newGame();
	 	return true;	
    }
    return false;
}

var newGame = function () {
	for ( var i=0; i < 9; i++) {
		theBoard[i].value = ""
	}
	console.log("Playing against: " + document.board.opponent.value );
}

var anyOldBoard = function () {
	b = [];
	for (var i=0; i < 9; i++) {
		b.push(theBoard[i].value);
	}
	return b;
}

var winLines = [
    [[1, 2], [4, 8], [3, 6]],
    [[0, 2], [4, 7]],
    [[0, 1], [4, 6], [5, 8]],
    [[4, 5], [0, 6]],
    [[3, 5], [0, 8], [2, 6], [1, 7]],
    [[3, 4], [2, 8]],
    [[7, 8], [2, 4], [0, 3]],
    [[6, 8], [1, 4]],
    [[6, 7], [0, 4], [2, 5]]
];

var isWinningMove = function (board, lastMove) {
    var player = board[lastMove];
    for (var i = 0; i < winLines[lastMove].length; i++) {
        var line = winLines[lastMove][i];
        if (player === board[line[0]] && player === board[line[1]]) {
            return true;
        }
    }
    return false;
}

var isADraw = function (board) {
	// Should only be called after checking for a winning move
	for (var i=0; i < 9; i++) {
		if (board[i] === "") {
			return false
		}
	}
	return true;
}

var score;

var lookAhead = function (board, turn, depth) {

	depth += 1;
    moves = getMoves(board);
    if (depth === 1) {
    	var bestScore = -99999999999;
    	var bestMove = null;
    	console.log("Setting bestmove to null");
    }
 
    for (var i=0; i<moves.length; i++) {
		if (depth === 1) {
		 	score = 0;
		}
        if (turn === 1) {   
        	board[moves[i]] = "O";			// Make a move for the computer
        	if (isWinningMove( board, moves[i] ) ) {
        		score += 10;				// This is a good move for computer so add 10 to score
        	}  else {
        		lookAhead(board, -1, depth);
        	}
        } else {
        	board[moves[i]] = "X";			// Make a move for the player
        	if (isWinningMove( board, moves[i] ) ) {
        		score -= 10;				// This is a bad move for computer so subtract 10 from score
        	} else {
        		lookAhead(board, 1, depth);
        	}		
        }
        if (depth === 1 && score  > bestScore) {
        	bestScore = score;
        	bestMove = moves[i];
        	console.log("Setting best move to: " + bestMove + "  score = " + score + " bestscore = " + bestScore);
        }

        board[moves[i]]="";
    }


    if (depth === 1) {
    	console.log("The best move is: " + bestMove);
	    return bestMove;
	}    
}

var getMoves = function (board) {
	var moves = [];
	for (var i=0; i < 9; i++ ) {
		if (board[i]==="") {
			moves.push(i);
		}
	}
	console.log("moves " + moves);
	return moves;
}




