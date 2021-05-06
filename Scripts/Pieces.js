class Coordinate {

    constructor(i, j) {
        this.i = i;
        this.j = j; 
        this.castle = undefined;
        this.legalMove = true;
    }

}
class Pawn {
    name = "Pawn";
    value = 1;
    moved = false;

    constructor(color, i, j) {
        this.color = color; //which color black or white
        this.i = i;
        this.j = j; //coordinates
    }

    getMoves(Board) {
        let coordinates = []; //returns a list of coordinates of squares which we can move to
        if (Board.Side == this.color) { //our piece
            //moving forwards
            if (this.i > 1) {
                if (Board.Squares[this.i - 1][this.j].piece == undefined) {
                    coordinates.push(new Coordinate(this.i - 1, this.j));
                    if (!this.moved && Board.Squares[this.i - 2][this.j].piece == undefined) {
                        coordinates.push(new Coordinate(this.i - 2, this.j));
                    }
                }
                //killing left or right
                if (this.j > 1) {
                    if (Board.Squares[this.i - 1][this.j - 1].piece != undefined && Board.Squares[this.i - 1][this.j - 1].piece.color != this.color) {
                        coordinates.push(new Coordinate(this.i - 1, this.j - 1));
                    }
                }
                if (this.j < 8) {
                    if (Board.Squares[this.i - 1][this.j + 1].piece != undefined && Board.Squares[this.i - 1][this.j + 1].piece.color != this.color) {
                        coordinates.push(new Coordinate(this.i - 1, this.j + 1));
                    }
                }
            }

        }
        else { //computer pawn// the main difference between our pawn and computer's is that the computer's moves down the board while ours moves up
            if (this.i < 8) {
                if (Board.Squares[this.i + 1][this.j].piece == undefined) {
                    coordinates.push(new Coordinate(this.i + 1, this.j));
                    if (!this.moved && Board.Squares[this.i + 2][this.j].piece == undefined) {
                        coordinates.push(new Coordinate(this.i + 2, this.j));
                    }
                }
                //killing left or right
                if (this.j > 1) {
                    if (Board.Squares[this.i + 1][this.j - 1].piece != undefined && Board.Squares[this.i + 1][this.j - 1].piece.color != this.color) {
                        coordinates.push(new Coordinate(this.i + 1, this.j - 1));
                    }
                }
                if (this.j < 8) {
                    if (Board.Squares[this.i + 1][this.j + 1].piece != undefined && Board.Squares[this.i + 1][this.j + 1].piece.color != this.color) {
                        coordinates.push(new Coordinate(this.i + 1, this.j + 1));
                    }
                }
            }
        }
        return coordinates;
    }

    setPotentialCheck(Board) {
        if (Board.Side != this.color) { //not our piece, meaning it is moving down the board
            if (this.i < 8) {
                if (this.j > 1) {
                    if (this.color == "White") {
                        Board.Squares[this.i + 1][this.j - 1].potentialBlackCheck = true;
                    }
                    else {
                        Board.Squares[this.i + 1][this.j - 1].potentialWhiteCheck = true;
                    }
                }
                if (this.j < 8) {
                    if (this.color == "White") {
                        Board.Squares[this.i + 1][this.j + 1].potentialBlackCheck = true;
                    }
                    else {
                        Board.Squares[this.i + 1][this.j + 1].potentialWhiteCheck = true;
                    }
                }
            }
        }
        else if (Board.Side == this.color) {
            if (this.i > 1) {
                if (this.j > 1) {
                    if (this.color == "White") {
                        Board.Squares[this.i - 1][this.j - 1].potentialBlackCheck = true;
                    }
                    else {
                        Board.Squares[this.i - 1][this.j - 1].potentialWhiteCheck = true;
                    }
                }
                if (this.j < 8) {
                    if (this.color == "White") {
                        Board.Squares[this.i - 1][this.j + 1].potentialBlackCheck = true;
                    }
                    else {
                        Board.Squares[this.i - 1][this.j + 1].potentialWhiteCheck = true;
                    }
                }
            }
        }
    }

}
class Knight {
    name = "Knight";
    value = 3;
    moved = false;
    constructor(color, i, j) {
        this.color = color; //which color black or white
        this.i = i;
        this.j = j; //coordinates
    }

    getMoves(Board) {
        let coordinates = []; //returns a list of coordinates of squares which we can move to
        {
            if (this.i > 2 && this.j > 1) { //up up left
                if (Board.Squares[this.i - 2][this.j - 1].piece == undefined || Board.Squares[this.i - 2][this.j - 1].piece.color != this.color) {
                    coordinates.push(new Coordinate(this.i - 2, this.j - 1));
                }
            }
            if (this.i > 2 && this.j < 8) { //up up right
                if (Board.Squares[this.i - 2][this.j + 1].piece == undefined || Board.Squares[this.i - 2][this.j + 1].piece.color != this.color) {
                    coordinates.push(new Coordinate(this.i - 2, this.j + 1));
                }
            }
            if (this.i > 1 && this.j > 2) { //up left left
                if (Board.Squares[this.i - 1][this.j - 2].piece == undefined || Board.Squares[this.i - 1][this.j - 2].piece.color != this.color) {
                    coordinates.push(new Coordinate(this.i - 1, this.j - 2));
                }
            }
            if (this.i > 1 && this.j < 7) { //up right right
                if (Board.Squares[this.i - 1][this.j + 2].piece == undefined || Board.Squares[this.i - 1][this.j + 2].piece.color != this.color) {
                    coordinates.push(new Coordinate(this.i - 1, this.j + 2));
                }
            }


            if (this.i < 7 && this.j > 1) { //down down left
                if (Board.Squares[this.i + 2][this.j - 1].piece == undefined || Board.Squares[this.i + 2][this.j - 1].piece.color != this.color) {
                    coordinates.push(new Coordinate(this.i + 2, this.j - 1));
                }
            }
            if (this.i < 7 && this.j < 8) { //down down right
                if (Board.Squares[this.i + 2][this.j + 1].piece == undefined || Board.Squares[this.i + 2][this.j + 1].piece.color != this.color) {
                    coordinates.push(new Coordinate(this.i + 2, this.j + 1));
                }
            }
            if (this.i < 8 && this.j > 2) { //down left left
                if (Board.Squares[this.i + 1][this.j - 2].piece == undefined || Board.Squares[this.i + 1][this.j - 2].piece.color != this.color) {
                    coordinates.push(new Coordinate(this.i + 1, this.j - 2));
                }
            }
            if (this.i < 8 && this.j < 7) { //down right right
                if (Board.Squares[this.i + 1][this.j + 2].piece == undefined || Board.Squares[this.i + 1][this.j + 2].piece.color != this.color) {
                    coordinates.push(new Coordinate(this.i + 1, this.j + 2));
                }
            }

            return coordinates;
        }
        //else computer
    }
    setPotentialCheck(Board) {
        if (this.i > 2 && this.j > 1) { //up up left
            if (this.color == "White") {
                Board.Squares[this.i - 2][this.j - 1].potentialBlackCheck = true;
            } else {
                Board.Squares[this.i - 2][this.j - 1].potentialWhiteCheck = true;
            }
        }
        if (this.i > 2 && this.j < 8) { //up up right
            if (this.color == "White") {
                Board.Squares[this.i - 2][this.j + 1].potentialBlackCheck = true;
            } else {
                Board.Squares[this.i - 2][this.j + 1].potentialWhiteCheck = true;
            }
        }
        if (this.i > 1 && this.j > 2) { //up left left
            if (this.color == "White") {
                Board.Squares[this.i - 1][this.j - 2].potentialBlackCheck = true;
            } else {
                Board.Squares[this.i - 1][this.j - 2].potentialWhiteCheck = true;
            }
        }
        if (this.i > 1 && this.j < 7) { //up right right
            if (this.color == "White") {
                Board.Squares[this.i - 1][this.j + 2].potentialBlackCheck = true;
            } else {
                Board.Squares[this.i - 1][this.j + 2].potentialWhiteCheck = true;
            }
        }


        if (this.i < 7 && this.j > 1) { //down down left
            if (this.color == "White") {
                Board.Squares[this.i + 2][this.j - 1].potentialBlackCheck = true;
            } else {
                Board.Squares[this.i + 2][this.j - 1].potentialWhiteCheck = true;
            }
        }
        if (this.i < 7 && this.j < 8) { //down down right
            if (this.color == "White") {
                Board.Squares[this.i + 2][this.j + 1].potentialBlackCheck = true;
            } else {
                Board.Squares[this.i + 2][this.j + 1].potentialWhiteCheck = true;
            }
        }
        if (this.i < 8 && this.j > 2) { //down left left
            if (this.color == "White") {
                Board.Squares[this.i + 1][this.j - 2].potentialBlackCheck = true;
            } else {
                Board.Squares[this.i + 1][this.j - 2].potentialWhiteCheck = true;
            }
        }
        if (this.i < 8 && this.j < 7) { //down right right
            if (this.color == "White") {
                Board.Squares[this.i + 1][this.j + 2].potentialBlackCheck = true;
            } else {
                Board.Squares[this.i + 1][this.j + 2].potentialWhiteCheck = true;
            }
        }
    }

}
class Bishop {
    name = "Bishop";
    value = 3;
    moved = false;
    constructor(color, i, j) {
        this.color = color; //which color black or white
        this.i = i;
        this.j = j; //coordinates
    }
    getMoves(Board) {
        let coordinates = [];
        let tempI = this.i;
        let tempJ = this.j;
        let keepGoing = true;
        while (keepGoing) { //up left
            tempI--;
            tempJ--;
            if ((tempI < 1 || tempJ < 1) || (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color == this.color)) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color != this.color) { //opponent piece
                coordinates.push(new Coordinate(tempI, tempJ));
                keepGoing = false;
            }
            else {
                coordinates.push(new Coordinate(tempI, tempJ));
            }
        }
        keepGoing = true;
        tempI = this.i;
        tempJ = this.j;
        while (keepGoing) { //up right
            tempI--;
            tempJ++;
            if ((tempI < 1 || tempJ > 8) || (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color == this.color)) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color != this.color) { //opponent piece
                coordinates.push(new Coordinate(tempI, tempJ));
                keepGoing = false;
            }
            else {
                coordinates.push(new Coordinate(tempI, tempJ));
            }
        }
        keepGoing = true;
        tempI = this.i;
        tempJ = this.j;
        while (keepGoing) { //down left
            tempI++;
            tempJ--;
            if ((tempI > 8 || tempJ < 1) || (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color == this.color)) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color != this.color) { //opponent piece
                coordinates.push(new Coordinate(tempI, tempJ));
                keepGoing = false;
            }
            else {
                coordinates.push(new Coordinate(tempI, tempJ));
            }
        }
        keepGoing = true;
        tempI = this.i;
        tempJ = this.j;
        while (keepGoing) { //down right
            tempI++;
            tempJ++;
            if ((tempI > 8 || tempJ > 8) || (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color == this.color)) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color != this.color) { //opponent piece
                coordinates.push(new Coordinate(tempI, tempJ));
                keepGoing = false;
            }
            else {
                coordinates.push(new Coordinate(tempI, tempJ));
            }
        }
        return coordinates;
    }

    setPotentialCheck(Board) {
        let tempI = this.i;
        let tempJ = this.j;
        let keepGoing = true;

        while (keepGoing) { //up left
            tempI--;
            tempJ--;
            if ((tempI < 1 || tempJ < 1)) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined) { //place a check on the square of the piece you encountered so the opponent's king cannot move there anyway
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
                if (Board.Squares[tempI][tempJ].piece.name == "King" && Board.Squares[tempI][tempJ].piece.color != this.color) { keepGoing = true; } else { keepGoing = false; }
            }
            else {
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
            }
        }
        keepGoing = true;
        tempI = this.i;
        tempJ = this.j;
        while (keepGoing) { //up right
            tempI--;
            tempJ++;
            if ((tempI < 1 || tempJ > 8)) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined) { //place a check on the square of the piece you encountered so the opponent's king cannot move there anyway
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
                if (Board.Squares[tempI][tempJ].piece.name == "King" && Board.Squares[tempI][tempJ].piece.color != this.color) { keepGoing = true; } else { keepGoing = false; }
            }
            else {
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
            }
        }
        keepGoing = true;
        tempI = this.i;
        tempJ = this.j;
        while (keepGoing) { //down left
            tempI++;
            tempJ--;
            if ((tempI > 8 || tempJ < 1)) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined) { //place a check on the square of the piece you encountered so the opponent's king cannot move there anyway
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
                if (Board.Squares[tempI][tempJ].piece.name == "King" && Board.Squares[tempI][tempJ].piece.color != this.color) { keepGoing = true; } else { keepGoing = false; }
            }
            else {
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
            }
        }
        keepGoing = true;
        tempI = this.i;
        tempJ = this.j;
        while (keepGoing) { //down right
            tempI++;
            tempJ++;
            if ((tempI > 8 || tempJ > 8)) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined) { //place a check on the square of the piece you encountered so the opponent's king cannot move there anyway
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
                if (Board.Squares[tempI][tempJ].piece.name == "King" && Board.Squares[tempI][tempJ].piece.color != this.color) { keepGoing = true; } else { keepGoing = false; }
            }
            else {
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
            }
        }
    }
}
class Rook {
    name = "Rook";
    value = 5;
    moved = false;
    constructor(color, i, j) {
        this.color = color; //which color black or white
        this.i = i;
        this.j = j; //coordinates
    }
    getMoves(Board) {
        let coordinates = [];

        let tempI = this.i;
        let tempJ = this.j;
        let keepGoing = true;
        while (keepGoing) { //up
            tempI--;
            if ((tempI < 1) || (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color == this.color)) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color != this.color) { //opponent piece
                coordinates.push(new Coordinate(tempI, tempJ));
                keepGoing = false;
            }
            else {
                coordinates.push(new Coordinate(tempI, tempJ));
            }
        }
        tempI = this.i;
        tempJ = this.j;
        keepGoing = true;
        while (keepGoing) { //down
            tempI++;
            if ((tempI > 8) || (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color == this.color)) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color != this.color) { //opponent piece
                coordinates.push(new Coordinate(tempI, tempJ));
                keepGoing = false;
            }
            else {
                coordinates.push(new Coordinate(tempI, tempJ));
            }
        }
        tempI = this.i;
        tempJ = this.j;
        keepGoing = true;
        while (keepGoing) { //left
            tempJ--;
            if ((tempJ < 1) || (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color == this.color)) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color != this.color) { //opponent piece
                coordinates.push(new Coordinate(tempI, tempJ));
                keepGoing = false;
            }
            else {
                coordinates.push(new Coordinate(tempI, tempJ));
            }
        }
        tempI = this.i;
        tempJ = this.j;
        keepGoing = true;
        while (keepGoing) { //right
            tempJ++;
            if ((tempJ > 8) || (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color == this.color)) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color != this.color) { //opponent piece
                coordinates.push(new Coordinate(tempI, tempJ));
                keepGoing = false;
            }
            else {
                coordinates.push(new Coordinate(tempI, tempJ));
            }
        }


        return coordinates;

    }

    setPotentialCheck(Board) {
        let tempI = this.i;
        let tempJ = this.j;
        let keepGoing = true;
        while (keepGoing) { //up
            tempI--;
            if (tempI < 1) {
                keepGoing = false;
            }
            else if ((Board.Squares[tempI][tempJ].piece != undefined)) { //if it encounters a piece on the board 
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
                if (Board.Squares[tempI][tempJ].piece.name == "King" && Board.Squares[tempI][tempJ].piece.color != this.color) { keepGoing = true; } else { keepGoing = false; }
            }
            else {
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
            }
        }
        tempI = this.i;
        tempJ = this.j;
        keepGoing = true;
        while (keepGoing) { //down
            tempI++;
            if (tempI > 8) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined) {
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
                if (Board.Squares[tempI][tempJ].piece.name == "King" && Board.Squares[tempI][tempJ].piece.color != this.color) { keepGoing = true; } else { keepGoing = false; }
            }
            else {
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
            }
        }
        tempI = this.i;
        tempJ = this.j;
        keepGoing = true;
        while (keepGoing) { //left
            tempJ--;
            if (tempJ < 1) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined) {
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
                if (Board.Squares[tempI][tempJ].piece.name == "King" && Board.Squares[tempI][tempJ].piece.color != this.color) { keepGoing = true; } else { keepGoing = false; }
            }
            else {
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
            }
        }
        tempI = this.i;
        tempJ = this.j;
        keepGoing = true;
        while (keepGoing) { //up
            tempJ++;
            if (tempJ > 8) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined) {
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
                if (Board.Squares[tempI][tempJ].piece.name == "King" && Board.Squares[tempI][tempJ].piece.color != this.color) { keepGoing = true; } else { keepGoing = false; }
            }
            else {
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
            }
        }

    }


}
class Queen {
    name = "Queen";
    value = 9;
    moved = false;
    constructor(color, i, j) {
        this.color = color; //which color black or white
        this.i = i;
        this.j = j; //coordinates



    }
    getMoves(Board) {
        let coordinates = [];
        let tempI = this.i;
        let tempJ = this.j;
        let keepGoing = true;
        while (keepGoing) { //up left
            tempI--;
            tempJ--;
            if ((tempI < 1 || tempJ < 1) || (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color == this.color)) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color != this.color) { //opponent piece
                coordinates.push(new Coordinate(tempI, tempJ));
                keepGoing = false;
            }
            else {
                coordinates.push(new Coordinate(tempI, tempJ));
            }
        }
        keepGoing = true;
        tempI = this.i;
        tempJ = this.j;
        while (keepGoing) { //up right
            tempI--;
            tempJ++;
            if ((tempI < 1 || tempJ > 8) || (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color == this.color)) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color != this.color) { //opponent piece
                coordinates.push(new Coordinate(tempI, tempJ));
                keepGoing = false;
            }
            else {
                coordinates.push(new Coordinate(tempI, tempJ));
            }
        }
        keepGoing = true;
        tempI = this.i;
        tempJ = this.j;
        while (keepGoing) { //down left
            tempI++;
            tempJ--;
            if ((tempI > 8 || tempJ < 1) || (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color == this.color)) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color != this.color) { //opponent piece
                coordinates.push(new Coordinate(tempI, tempJ));
                keepGoing = false;
            }
            else {
                coordinates.push(new Coordinate(tempI, tempJ));
            }
        }
        keepGoing = true;
        tempI = this.i;
        tempJ = this.j;
        while (keepGoing) { //down right
            tempI++;
            tempJ++;
            if ((tempI > 8 || tempJ > 8) || (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color == this.color)) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color != this.color) { //opponent piece
                coordinates.push(new Coordinate(tempI, tempJ));
                keepGoing = false;
            }
            else {
                coordinates.push(new Coordinate(tempI, tempJ));
            }
        }
        tempI = this.i;
        tempJ = this.j;
        keepGoing = true;
        while (keepGoing) { //up
            tempI--;
            if ((tempI < 1) || (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color == this.color)) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color != this.color) { //opponent piece
                coordinates.push(new Coordinate(tempI, tempJ));
                keepGoing = false;
            }
            else {
                coordinates.push(new Coordinate(tempI, tempJ));
            }
        }
        tempI = this.i;
        tempJ = this.j;
        keepGoing = true;
        while (keepGoing) { //down
            tempI++;
            if ((tempI > 8) || (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color == this.color)) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color != this.color) { //opponent piece
                coordinates.push(new Coordinate(tempI, tempJ));
                keepGoing = false;
            }
            else {
                coordinates.push(new Coordinate(tempI, tempJ));
            }
        }
        tempI = this.i;
        tempJ = this.j;
        keepGoing = true;
        while (keepGoing) { //left
            tempJ--;
            if ((tempJ < 1) || (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color == this.color)) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color != this.color) { //opponent piece
                coordinates.push(new Coordinate(tempI, tempJ));
                keepGoing = false;
            }
            else {
                coordinates.push(new Coordinate(tempI, tempJ));
            }
        }
        tempI = this.i;
        tempJ = this.j;
        keepGoing = true;
        while (keepGoing) { //right
            tempJ++;
            if ((tempJ > 8) || (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color == this.color)) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined && Board.Squares[tempI][tempJ].piece.color != this.color) { //opponent piece
                coordinates.push(new Coordinate(tempI, tempJ));
                keepGoing = false;
            }
            else {
                coordinates.push(new Coordinate(tempI, tempJ));
            }
        }
        return coordinates;
    }

    setPotentialCheck(Board) {
        let tempI = this.i;
        let tempJ = this.j;
        let keepGoing = true;

        while (keepGoing) { //up left
            tempI--;
            tempJ--;
            if ((tempI < 1 || tempJ < 1)) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined) { //place a check on the square of the piece you encountered so the opponent's king cannot move there anyway
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
                if (Board.Squares[tempI][tempJ].piece.name == "King" && Board.Squares[tempI][tempJ].piece.color != this.color) { keepGoing = true; } else { keepGoing = false; }
            }
            else {
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
            }
        }
        keepGoing = true;
        tempI = this.i;
        tempJ = this.j;
        while (keepGoing) { //up right
            tempI--;
            tempJ++;
            if ((tempI < 1 || tempJ > 8)) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined) { //place a check on the square of the piece you encountered so the opponent's king cannot move there anyway
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
                if (Board.Squares[tempI][tempJ].piece.name == "King" && Board.Squares[tempI][tempJ].piece.color != this.color) { keepGoing = true; } else { keepGoing = false; }
            }
            else {
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
            }
        }
        keepGoing = true;
        tempI = this.i;
        tempJ = this.j;
        while (keepGoing) { //down left
            tempI++;
            tempJ--;
            if ((tempI > 8 || tempJ < 1)) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined) { //place a check on the square of the piece you encountered so the opponent's king cannot move there anyway
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
                if (Board.Squares[tempI][tempJ].piece.name == "King" && Board.Squares[tempI][tempJ].piece.color != this.color) { keepGoing = true; } else { keepGoing = false; }
            }
            else {
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
            }
        }
        keepGoing = true;
        tempI = this.i;
        tempJ = this.j;
        while (keepGoing) { //down right
            tempI++;
            tempJ++;
            if ((tempI > 8 || tempJ > 8)) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined) { //place a check on the square of the piece you encountered so the opponent's king cannot move there anyway
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
                if (Board.Squares[tempI][tempJ].piece.name == "King" && Board.Squares[tempI][tempJ].piece.color != this.color) { keepGoing = true; } else { keepGoing = false; }
            }
            else {
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
            }
        }
        keepGoing = true;
        tempI = this.i;
        tempJ = this.j;
        while (keepGoing) { //up
            tempI--;
            if (tempI < 1) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined) {
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
                if (Board.Squares[tempI][tempJ].piece.name == "King" && Board.Squares[tempI][tempJ].piece.color != this.color) { keepGoing = true; } else { keepGoing = false; }
            }
            else {
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
            }
        }
        tempI = this.i;
        tempJ = this.j;
        keepGoing = true;
        while (keepGoing) { //down
            tempI++;
            if (tempI > 8) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined) {
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
                if (Board.Squares[tempI][tempJ].piece.name == "King" && Board.Squares[tempI][tempJ].piece.color != this.color) { keepGoing = true; } else { keepGoing = false; }
            }
            else {
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
            }
        }
        tempI = this.i;
        tempJ = this.j;
        keepGoing = true;
        while (keepGoing) { //left
            tempJ--;
            if (tempJ < 1) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined) {
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
                if (Board.Squares[tempI][tempJ].piece.name == "King" && Board.Squares[tempI][tempJ].piece.color != this.color) { keepGoing = true; } else { keepGoing = false; }
            }
            else {
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
            }
        }
        tempI = this.i;
        tempJ = this.j;
        keepGoing = true;
        while (keepGoing) { //right
            tempJ++;
            if (tempJ > 8) {
                keepGoing = false;
            }
            else if (Board.Squares[tempI][tempJ].piece != undefined) {
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
                if (Board.Squares[tempI][tempJ].piece.name == "King" && Board.Squares[tempI][tempJ].piece.color != this.color) { keepGoing = true; } else { keepGoing = false; }
            }
            else {
                if (this.color == "White") {
                    Board.Squares[tempI][tempJ].potentialBlackCheck = true;
                } else {
                    Board.Squares[tempI][tempJ].potentialWhiteCheck = true;
                }
            }
        }
    }
}
class King {
    name = "King";
    value = 10000;
    moved = false;
    constructor(color, i, j) {
        this.color = color; //which color black or white
        this.i = i;
        this.j = j; //coordinates
        this.oldJ = j; //used for castling and seeing if the king moved 2 squares to the left or right. If the king moved 2 squares, it means it was a castle
    }

    getMoves(B) {
        let coordinates = [];
        if (this.i > 1) { //up
            if (B.Squares[this.i - 1][this.j].piece == undefined || (B.Squares[this.i - 1][this.j].piece != undefined && B.Squares[this.i - 1][this.j].piece.color != this.color)) {
                coordinates.push(new Coordinate(this.i - 1, this.j));
            }
        }
        if (this.i < 8) { //down
            if (B.Squares[this.i + 1][this.j].piece == undefined || (B.Squares[this.i + 1][this.j].piece != undefined && B.Squares[this.i + 1][this.j].piece.color != this.color)) {
                coordinates.push(new Coordinate(this.i + 1, this.j));
            }
        }
        if (this.j > 1) { //left
            if (B.Squares[this.i][this.j - 1].piece == undefined || (B.Squares[this.i][this.j - 1].piece != undefined && B.Squares[this.i][this.j - 1].piece.color != this.color)) {
                coordinates.push(new Coordinate(this.i, this.j - 1));
            }
        }
        if (this.j < 8) { //right
            if (B.Squares[this.i][this.j + 1].piece == undefined || (B.Squares[this.i][this.j + 1].piece != undefined && B.Squares[this.i][this.j + 1].piece.color != this.color)) {
                coordinates.push(new Coordinate(this.i, this.j + 1))
            }
        }
        if (this.j > 1 && this.i > 1) { //up left
            if (B.Squares[this.i - 1][this.j - 1].piece == undefined || (B.Squares[this.i - 1][this.j - 1].piece != undefined && B.Squares[this.i - 1][this.j - 1].piece.color != this.color)) {
                coordinates.push(new Coordinate(this.i - 1, this.j - 1))
            }
        }
        if (this.j < 8 && this.i > 1) { //up right
            if (B.Squares[this.i - 1][this.j + 1].piece == undefined || (B.Squares[this.i - 1][this.j + 1].piece != undefined && B.Squares[this.i - 1][this.j + 1].piece.color != this.color)) {
                coordinates.push(new Coordinate(this.i - 1, this.j + 1))
            }
        }
        if (this.j > 1 && this.i < 8) { //down left
            if (B.Squares[this.i + 1][this.j - 1].piece == undefined || (B.Squares[this.i + 1][this.j - 1].piece != undefined && B.Squares[this.i + 1][this.j - 1].piece.color != this.color)) {
                coordinates.push(new Coordinate(this.i + 1, this.j - 1))
            }
        }
        if (this.j < 8 && this.i < 8) { //down right
            if (B.Squares[this.i + 1][this.j + 1].piece == undefined || (B.Squares[this.i + 1][this.j + 1].piece != undefined && B.Squares[this.i + 1][this.j + 1].piece.color != this.color)) {
                coordinates.push(new Coordinate(this.i + 1, this.j + 1))
            }
        }

        if(!this.moved){
            if(B.Squares[this.i][8].piece != undefined && !B.Squares[this.i][8].piece.moved){ //right
                let noChecksInBetween = true;
                for(let k = this.j; k < 8; k++){ //checking if a check comes in between 
                    if(this.color == "White"){
                        if(B.Squares[this.i][k].potentialWhiteCheck){noChecksInBetween = false;}
                    }else{
                        if(B.Squares[this.i][k].potentialBlackCheck){noChecksInBetween = false;}
                    }        
                }
                for(let k = this.j+1; k < 8; k++){ //checking if any piece comes in the way
                    if(this.color == "White"){
                        if(B.Squares[this.i][k].piece != undefined){noChecksInBetween = false;}
                    }else{
                        if(B.Squares[this.i][k].piece != undefined){noChecksInBetween = false;}
                    } 
                }
                if(noChecksInBetween){
                    let c = new Coordinate(this.i, this.j + 2);
                    c.castle = true;
                    coordinates.push(c);
                }
            }
            if(B.Squares[this.i][1].piece != undefined && !B.Squares[this.i][1].piece.moved){ //left
                let noChecksInBetween = true;
                for(let k = this.j; k >1; k--){ //checking if a check comes in between or any piece is in the way
                    if(this.color == "White"){
                        if(B.Squares[this.i][k].potentialWhiteCheck){noChecksInBetween = false;}
                    }else{
                        if(B.Squares[this.i][k].potentialBlackCheck){noChecksInBetween = false;}
                    }
                }
                for(let k = this.j-1; k >1; k--){ //checking if any piece comes in the way
                    if(this.color == "White"){
                        if(B.Squares[this.i][k].piece != undefined){noChecksInBetween = false;}
                    }else{
                        if(B.Squares[this.i][k].piece != undefined){noChecksInBetween = false;}
                    } 
                }
                if(noChecksInBetween){
                    let c = new Coordinate(this.i, this.j - 2);
                    c.castle = true;
                    coordinates.push(c);
                }
            }
        }

        //cant move the king into a check
        let k = 0;
        while (k < coordinates.length) {
            if (this.color == "Black") {
                if (B.Squares[coordinates[k].i][coordinates[k].j].potentialBlackCheck) {
                    coordinates[k].legalMove = false;
                }
                k++;
            }
            else if (this.color == "White") {
                if (B.Squares[coordinates[k].i][coordinates[k].j].potentialWhiteCheck) {
                    coordinates[k].legalMove = false;
                }
                k++;
            }
        }

        return coordinates;
    }

    setPotentialCheck(Board) {
        if (this.i > 1) { //up
            if (this.color == "White") {
                Board.Squares[this.i - 1][this.j].potentialBlackCheck = true;
            } else {
                Board.Squares[this.i - 1][this.j].potentialWhiteCheck = true;
            }
        }
        if (this.i < 8) { //down
            if (this.color == "White") {
                Board.Squares[this.i + 1][this.j].potentialBlackCheck = true;
            } else {
                Board.Squares[this.i + 1][this.j].potentialWhiteCheck = true;
            }
        }
        if (this.j > 1) { //left
            if (this.color == "White") {
                Board.Squares[this.i][this.j - 1].potentialBlackCheck = true;
            } else {
                Board.Squares[this.i][this.j - 1].potentialWhiteCheck = true;
            }
        }
        if (this.j < 8) { //right
            if (this.color == "White") {
                Board.Squares[this.i][this.j + 1].potentialBlackCheck = true;
            } else {
                Board.Squares[this.i][this.j + 1].potentialWhiteCheck = true;
            }
        }
        if (this.j > 1 && this.i > 1) { //up left
            if (this.color == "White") {
                Board.Squares[this.i - 1][this.j - 1].potentialBlackCheck = true;
            } else {
                Board.Squares[this.i - 1][this.j - 1].potentialWhiteCheck = true;
            }
        }
        if (this.j < 8 && this.i > 1) { //up right
            if (this.color == "White") {
                Board.Squares[this.i - 1][this.j + 1].potentialBlackCheck = true;
            } else {
                Board.Squares[this.i - 1][this.j + 1].potentialWhiteCheck = true;
            }
        }
        if (this.j > 1 && this.i < 8) { //down left
            if (this.color == "White") {
                Board.Squares[this.i + 1][this.j - 1].potentialBlackCheck = true;
            } else {
                Board.Squares[this.i + 1][this.j - 1].potentialWhiteCheck = true;
            }
        }
        if (this.j < 8 && this.i < 8) { //down right
            if (this.color == "White") {
                Board.Squares[this.i + 1][this.j + 1].potentialBlackCheck = true;
            } else {
                Board.Squares[this.i + 1][this.j + 1].potentialWhiteCheck = true;
            }
        }
    }

}