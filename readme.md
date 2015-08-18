# A Tic Tac Toe game

This game can be played against another human opponent of against the computer. When playing against the computer you can play in 'dumb' or 'unbeatable' mode.

## Playing against another human opponent.
When playing against another human opponent each player takes turn clicking on a blank square until either a win or a draw is reached.

## Playing against 'dumb' computer.
In 'dumb' computer mode the computer uses a simmple recursive algorythm to look ahead from each move possibility. 

## Playing against 'unbeatable' computer.
In dumb computer mode the computer follows these steps as seen on [https://en.wikipedia.org/wiki/Tic-tac-toe]. 
A algorythm plays a perfect tic-tac-toe game by choosing the move with the highest priority in the following table.

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