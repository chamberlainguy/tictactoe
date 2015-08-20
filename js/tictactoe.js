 /*  
___________.__         ___________               ___________            
\__    ___/|__| ____   \__    ___/____    ____   \__    ___/___   ____  
  |    |   |  |/ ___\    |    |  \__  \ _/ ___\    |    | /  _ \_/ __ \ 
  |    |   |  \  \___    |    |   / __ \\  \___    |    |(  <_> )  ___/ 
  |____|   |__|\___  >   |____|  (____  /\___  >   |____| \____/ \___  >
                   \/                 \/     \/                      \/ 

Throughout this code a board is represented as a single dimention array of length 9.
Like so:

    0 | 1 | 2
    ---------
    3 | 4 | 5
    ---------
    6 | 7 | 8

*/

var turn = -1;                                                          // Human always goes first with an X
var theBoard;

var makeBoard = function (){
    var b = document.board;
    theBoard = [b.b0,b.b1,b.b2,b.b3,b.b4,b.b5,b.b6,b.b7,b.b8];          // The board is an array of buttons
    newGame();
}

var move = function (square){
    if (square.value == ""){
    	if (turn === -1) {
    		square.value = "X";
    	} else {
    		square.value = "O";	
    	}
    	if (gameOver(square.accessKey)) {
            return;
        } 
    	if (document.board.opponent.value === "human") {
    		turn *= -1;
    	} else {
            if (document.board.opponent.value === "dumbAI") {
    		    var computerMove = lookAhead(anyOldBoard(), 1, 0);   	//	1=Computers Turn   0=Current Search Depth
            } else {
                var computerMove = perfectMove(anyOldBoard());
            }  
    		theBoard[computerMove].value = "O"
    		if ( gameOver ( computerMove ) ) return;
    	}
    }
}    

var gameOver = function (lastMove) {
    if (isWinningMove(anyOldBoard(), lastMove)) {
    	alert( theBoard[lastMove].value + " Wins!")
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
    turn = -1;                                                          // Human always goes first
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

var getMoves = function (board) {
    var moves = [];
    for (var i=0; i < 9; i++ ) {
        if (board[i]==="") {
            moves.push(i);
        }
    }
    return moves; 
}

/*_________                       ________               ___.        _____  .___ 
 /   _____/ ____   _____   ____   \______ \  __ __  _____\_ |__     /  _  \ |   |
 \_____  \ /  _ \ /     \_/ __ \   |    |  \|  |  \/     \| __ \   /  /_\  \|   |
 /        (  <_> )  Y Y  \  ___/   |    `   \  |  /  Y Y  \ \_\ \ /    |    \   |
/_______  /\____/|__|_|  /\___  > /_______  /____/|__|_|  /___  / \____|__  /___|
        \/             \/     \/          \/            \/    \/          \/     
*/

var score, outcomeCount;

var lookAhead = function (board, turn, depth) {
	depth += 1;
    var moves = getMoves(board);
    if (depth === 1) {
    	var bestScore = -99999999999.999;
    	var bestMove = null;
    }
    for (var i=0; i<moves.length; i++) { 

		if (depth === 1) { 
		 	score = 0.000;
            outcomeCount = 0;
		}
        if (turn === 1) {   
        	board[moves[i]] = "O";			                  // Make a move for the computer
        	if ( isWinningMove( board, moves[i]) ) {
        		score += 10 - depth;          	              // This is a good move for computer
                outcomeCount++; 
            } else { 
                lookAhead(board, -1, depth);
            }   
        } else {
        	board[moves[i]] = "X";			                  // Make a move for the player
        	if ( isWinningMove( board, moves[i]) ) {
        		score -= 10 - depth;          	         	  // This is a bad move for computer     
                outcomeCount++;    
            } else {	
                lookAhead(board, 1, depth);
            }    
        }
        if (depth === 1 && (score / outcomeCount) > bestScore) {
        	bestScore = score / outcomeCount;         
            bestMove = moves[i];
        }
        board[moves[i]]="";
    }
    if (depth === 1) {
	    return bestMove;
	}    
}

/*
 ____ ___     ___.                  __        ___.   .__          
|    |   \____\_ |__   ____ _____ _/  |______ \_ |__ |  |   ____  
|    |   /    \| __ \_/ __ \\__  \\   __\__  \ | __ \|  | _/ __ \ 
|    |  /   |  \ \_\ \  ___/ / __ \|  |  / __ \| \_\ \  |_\  ___/ 
|______/|___|  /___  /\___  >____  /__| (____  /___  /____/\___  >
             \/    \/     \/     \/          \/    \/          \/ 
_________                               __                
\_   ___ \  ____   _____ ______  __ ___/  |_  ___________ 
/    \  \/ /  _ \ /     \\____ \|  |  \   __\/ __ \_  __ \
\     \___(  <_> )  Y Y  \  |_> >  |  /|  | \  ___/|  | \/
 \______  /\____/|__|_|  /   __/|____/ |__|  \___  >__|   
        \/             \/|__|                    \/       

A player can play perfect tic-tac-toe if they choose the move with the highest priority in the following table.

1) Win: If you have two in a row, play the third to get three in a row.

2) Block: If the opponent has two in a row, play the third to block them.

3) Fork: Create an opportunity where you can win in two ways.

4) Block Opponent's Fork:

    Option 1: Create two in a row to force the opponent into defending, as long as it doesn't result in them creating a fork or winning. For example, if "X" has a corner, "O" has the center, and "X" has the opposite corner as well, "O" must not play a corner in order to win. (Playing a corner in this scenario creates a fork for "X" to win.)

    Option 2: If there is a configuration where the opponent can fork, block that fork.

5) Center: Play the center.

6) Opposite Corner: If the opponent is in the corner, play the opposite corner.

7) Empty Corner: Play an empty corner.

8) Empty Side: Play an empty side.
*/


var perfectMove = function(board) {

    var moves = getMoves(board);

    // 1. Check for an immediate win
    for (var i=0; i<moves.length; i++) { 
        board[moves[i]] = "O";
        if ( isWinningMove(board, moves[i]) ) {    
            return moves[i];       
        }
        board[moves[i]] = "";
    }

    // 2. Check for a block by placing opponents piece then checking for a win
    for (var i=0; i<moves.length; i++) { 
        board[moves[i]] = "X";
        if ( isWinningMove(board, moves[i]) ) {    
            return moves[i];       
        }
        board[moves[i]] = "";
    }

    // 3. Create a fork
    for (var i=0; i<moves.length; i++) { 
        board[moves[i]] = "O";
        if ( isForked(board, moves[i]) ) {    
            return moves[i];       
        }
        board[moves[i]] = "";
    }

    // 4. Option1. Special case. 
    // circumvent double fork by forcing opponent into defending
    if (moves.length === 6) {
        if (board[0] === "X" && board[8] === "X" && board[4] === "O") {
            return 1;
        }
        if (board[2] === "X" && board[6] === "X" && board[4] === "O") {
            return 7;
        }
    }

    // 4. option2. Block a fork by playing opponents piece then checking for a fork
    for (var i=0; i<moves.length; i++) { 
        board[moves[i]] = "X";
        if ( isForked(board, moves[i]) ) {    
            return moves[i];       
        }
        board[moves[i]] = "";
    }

    // 5. Play the center if it's available
    if (board[4] === "") {
        return 4;
    }

    // 6. Play an opposite corner
    if (board[0] === "" && board[8] === "X") {
        return 0;
    } else if (board[0] === "X" && board[8] === "") {
        return 8;
    } else if (board[2] === "" && board[6] === "X") {
        return 2;
    } else if (board[2] === "X" && board[6] === "") {
        return 6;
    }

    // 7. Play an empty corner
    if (board[0] === "") {
        return 0;
    } else if (board[2] === "") {
        return 2;
    } else if (board[6] === "") {
        return 6;
    } else if (board[8] === "") {
        return 8;
    }

    // 8. Play an empty side
    if (board[1] === "") {
        return 1;
    } else if (board[3] === "") {
        return 3;
    } else if (board[5] === "") {
        return 5;
    } else if (board[7] === "") {
        return 7;
    }

    // The above logic should always calculate a move so we should not get to here.
    alert("Could not calculate next move");

}

var isForked = function (board, lastMove) {
    // If there are two of more ways the player can immediately win then there is a fork 
    var player = board[lastMove];
    var moves = getMoves(board);
    var winMoves = 0;
    for (var i = 0; i < moves.length; i++) {
        board[moves[i]] = player;
        if (isWinningMove(board,moves[i])) {
            winMoves += 1;
        }
        board[moves[i]] = "";
    }
    if (winMoves > 1) {
        return true;
    } else {
        return false;
    }
}

