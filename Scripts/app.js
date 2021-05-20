let theme = "Brown";


let Board = {

}
let makingPromotion = false;
let gameOver = false;
let gameStarted = false;
function createBoard() {

    Board = {
        Squares: [],
        Side: "White",
        Turn: "White",
        CurrentSelected: undefined,
        WhiteCheck: false,
        BlackCheck: false,
        GAMEMODE: "2Player",
        WhiteKing: undefined,
        BlackKing: undefined,
        CheckMateOnBlack: false,
        CheckMateOnWhite: false,
        Stalemate: false,
        WhiteScore: 10039, //this is the combined value of all the pieces on the board. The king is 10000 since it is supposed to be priceless
        BlackScore: 10039,
    }

    Board.Squares = [];
    for (let i = 0; i < 9; i++) {
        Board.Squares.push(new Array(9));
    }

    let boardElement = document.getElementById("Board");
    boardElement.innerHTML = "";
    let boardHTML = "";
    let white = true;

    for (let i = 1; i < 9; i++) {
        if (i % 2 == 1) {
            white = true;
        } else {
            white = false;
        }
        for (let j = 1; j < 9; j++) {

            if (white) {
                boardHTML += "<div class='whiteSquare' id='" + (i + "" + j) + "'></div>"; //id will represent coordinates in array so we can access the div square element when traversing array
            } else {
                boardHTML += "<div class='blackSquare'  id='" + (i + "" + j) + "'> </div>";
            }
            white = !white;

            Board.Squares[i][j] = {
                piece: undefined,
                potentialWhiteCheck: false, //this is used to prevent your king from killing an opponent's piece only to find out you placed yourself into a check or checkmate. Every opponent piece will set a square 1 unit around themselves to a potential check square so your king can't move there
                potentialBlackCheck: false, //potentialWhiteCheck is against white from black, and vice versa for potentialBlackCheck
            }
        }
    }



    boardElement.innerHTML = boardHTML;

    makingPossibleMoves();
    addToCapturedPieces();
    setTheme(theme)
}
function setTheme(t){

    theme = t
    for(let i = 1; i < 9; i++){
        for(let j = 1; j < 9; j++){
            let s = document.getElementById(i + "" + j);
            if(s.classList.contains("blackSquare")){
                s.classList.toggle("BrownThemeBlack", false);
                s.classList.toggle("BlueThemeBlack", false);
                s.classList.toggle("GreenThemeBlack", false);
            }
            else if(s.classList.contains("whiteSquare")){
                s.classList.toggle("BrownThemeWhite", false);
                s.classList.toggle("BlueThemeWhite", false);
                s.classList.toggle("GreenThemeWhite", false);
            }
        }
    }

    for(let i = 1; i < 9; i++){
        for(let j = 1; j < 9; j++){
            let s = document.getElementById(i + "" + j);
            if(s.classList.contains("blackSquare")){
                s.classList.toggle(t + "ThemeBlack", true);
            }
            else if(s.classList.contains("whiteSquare")){
                s.classList.toggle(t + "ThemeWhite", true);
            }
        }
    }    
}
function chooseSide(side) {
    gameOver = false;
    gameStarted = true;
    movesPlayed = 0; //for computer
    createBoard();
    Board.Side = side;

    if(side == "White"){
        OpponentSide = "Black";
        
    }else if(side == "Black"){
        OpponentSide = "White";
    }

    let popUp = document.getElementById("PopUp");
    popUp.remove();

    setPieces();
    drawBoard();
    resetPotentialChecks(Board);
    if(Board.Turn == OpponentSide){
        calculateOpponentMove(); //white -> computer goes first
    }
}
function setPieces() {

    if (Board.Side == "White") {
        //White pieces
        for (let i = 1; i < Board.Squares.length; i++) {
            Board.Squares[7][i].piece = new Pawn("White", 7, i);
        }
        Board.Squares[8][1].piece = new Rook("White", 8, 1);
        Board.Squares[8][8].piece = new Rook("White", 8, 8);
        Board.Squares[8][2].piece = new Knight("White", 8, 2);
        Board.Squares[8][7].piece = new Knight("White", 8, 7);
        Board.Squares[8][3].piece = new Bishop("White", 8, 3);
        Board.Squares[8][6].piece = new Bishop("White", 8, 6);
        Board.Squares[8][4].piece = new Queen("White", 8, 4);
        Board.Squares[8][5].piece = new King("White", 8, 5);
        Board.WhiteKing = Board.Squares[8][5].piece;

        //Black pieces
        for (let i = 1; i < Board.Squares.length; i++) {
            Board.Squares[2][i].piece = new Pawn("Black", 2, i);
        }
        Board.Squares[1][1].piece = new Rook("Black", 1, 1);
        Board.Squares[1][8].piece = new Rook("Black", 1, 8);
        Board.Squares[1][2].piece = new Knight("Black", 1, 2);
        Board.Squares[1][7].piece = new Knight("Black", 1, 7);
        Board.Squares[1][3].piece = new Bishop("Black", 1, 3);
        Board.Squares[1][6].piece = new Bishop("Black", 1, 6);
        Board.Squares[1][4].piece = new Queen("Black", 1, 4);
        Board.Squares[1][5].piece = new King("Black", 1, 5);
        Board.BlackKing = Board.Squares[1][5].piece;

    }
    else if (Board.Side == "Black") {
        //Black pieces
        for (let i = 1; i < Board.Squares.length; i++) {
            Board.Squares[7][i].piece = new Pawn("Black", 7, i);
        }
        Board.Squares[8][1].piece = new Rook("Black", 8, 1);
        Board.Squares[8][8].piece = new Rook("Black", 8, 8);
        Board.Squares[8][2].piece = new Knight("Black", 8, 2);
        Board.Squares[8][7].piece = new Knight("Black", 8, 7);
        Board.Squares[8][3].piece = new Bishop("Black", 8, 3);
        Board.Squares[8][6].piece = new Bishop("Black", 8, 6);
        Board.Squares[8][5].piece = new Queen("Black", 8, 5);
        Board.Squares[8][4].piece = new King("Black", 8, 4);
        Board.BlackKing = Board.Squares[8][4].piece;


        //White pieces
        for (let i = 1; i < 9; i++) {
            Board.Squares[2][i].piece = new Pawn("White", 2, i);
        }
        
        Board.Squares[1][1].piece = new Rook("White", 1, 1);
        Board.Squares[1][8].piece = new Rook("White", 1, 8);
        Board.Squares[1][2].piece = new Knight("White", 1, 2);
        Board.Squares[1][7].piece = new Knight("White", 1, 7);
        Board.Squares[1][3].piece = new Bishop("White", 1, 3);
        Board.Squares[1][6].piece = new Bishop("White", 1, 6);
        Board.Squares[1][5].piece = new Queen("White", 1, 5);
        Board.Squares[1][4].piece = new King("White", 1, 4);
        Board.WhiteKing = Board.Squares[1][4].piece;
        



    }
}
function drawBoard() {
    for (let i = 1; i < 9; i++) {
        for (let j = 1; j < 9; j++) {
            if (Board.Squares[i][j].piece != undefined) {
                let img = "<img src='Images/Pieces/" + Board.Squares[i][j].piece.color + Board.Squares[i][j].piece.name + ".png' width='100%' style='pointer-events:none; user-select: none;'>"
                let square = document.getElementById((i + "" + j));
                square.innerHTML = img;
                square.classList.toggle("squareHover", true);
            }
            else {
                let img = "<img src='Images/Pieces/Blank.png' width='100%' style='pointer-events:none; user-select: none;'>"
                let square = document.getElementById((i + "" + j));
                square.innerHTML = img;
                square.classList.toggle("squareHover", false);
            }

        }
    }
    

    if(Board.Side == "White"){
        for(let i = 1; i < 9; i++){
            let letter = String.fromCharCode(96 + i);
            document.getElementById(8+""+i).innerHTML += "<p class='fileLetter'>"+letter+"</p>";
        }
        for(let i = 8; i >=1; i--){
            document.getElementById(i+""+1).innerHTML += "<p class='rankNumber'>"+(8-i+1)+"</p>";
        }
    }
    if(Board.Side == "Black"){
        for(let i = 1; i < 9; i++){
            let letter = String.fromCharCode(96 + 9-i);
            document.getElementById(8+""+i).innerHTML += "<p class='fileLetter'>"+letter+"</p>";
        }
        for(let i = 8; i >=1; i--){
            document.getElementById(i+""+1).innerHTML += "<p class='rankNumber'>"+i+"</p>";
        }
    }

}
function highlightPossibilities(coordinates) {

    for (let i = 1; i < 9; i++) {
        for (let j = 1; j < 9; j++) {
            let id = i + "" + j;
            document.getElementById(id).classList.toggle("tint", false);
            if(Board.Squares[i][j].piece == undefined){
                document.getElementById(id).classList.toggle("squareHover", false);
            }
        }
    }
    if (coordinates != undefined) {
        for (let i = 0; i < coordinates.length; i++) {
            if(coordinates[i].legalMove){
                let id = coordinates[i].i + "" + coordinates[i].j;
                document.getElementById(id).classList.toggle("tint", true);
                document.getElementById(id).classList.toggle("moveIndicator", false);
                document.getElementById(id).classList.toggle("squareHover", true);
            }

        }
    }

}
function idToSquare(id) {
    let i = id.substring(0, 1);
    let j = id.substring(1);
    return Board.Squares[parseInt(i)][parseInt(j)];
}
function makingPossibleMoves() {
    let whiteSquares = document.getElementsByClassName("whiteSquare");
    let blackSquares = document.getElementsByClassName("blackSquare");

    //making possible moves
    for (let i = 0; i < whiteSquares.length; i++) {
        whiteSquares[i].addEventListener("click", function (e) {
            let square = idToSquare(e.target.id);
            if (square.piece != undefined && square.piece.color == Board.Side && square.piece.color == Board.Turn && !gameOver) {
                let possible = square.piece.getMoves(Board);
     
                highlightPossibilities(possible);
                Board.CurrentSelected = square.piece;
            }
            else if (e.target.classList.contains("tint") && !gameOver) { //we are making a move with the current selected piece
                let oldI = Board.CurrentSelected.i;
                let oldJ = Board.CurrentSelected.j;
                let newI = parseInt(e.target.id.substring(0, 1));
                let newJ = parseInt(e.target.id.substring(1));
                makeMove(oldI, oldJ, newI, newJ);

                highlightPossibilities();
                Board.CurrentSelected = undefined;

            }
            else { //you clicked outside and deselected your piece
                highlightPossibilities();
                Board.CurrentSelected = undefined;
            }



        })
        blackSquares[i].addEventListener("click", function (e) {
            let square = idToSquare(e.target.id);
            if (square.piece != undefined && square.piece.color == Board.Side && square.piece.color == Board.Turn  && !gameOver) {
                let possible = square.piece.getMoves(Board);

                highlightPossibilities(possible);
                Board.CurrentSelected = square.piece;
            }
            else if (e.target.classList.contains("tint")) { //we are making a move with the current selected piece
                let oldI = Board.CurrentSelected.i;
                let oldJ = Board.CurrentSelected.j;
                let newI = parseInt(e.target.id.substring(0, 1));
                let newJ = parseInt(e.target.id.substring(1));
                makeMove(oldI, oldJ, newI, newJ);

                highlightPossibilities();
                Board.CurrentSelected = undefined;
            }
            else { //not a possible position. a tint represents a possible position for a selected piece to move to
                highlightPossibilities();
                Board.CurrentSelected = undefined;
            }
        })
    }

}
function makeMove(oldI, oldJ, newI, newJ) {
    //check if this new move does not fix an existing check if there is one

    let safeToMove = true;

    { //testing to see what happens if we move this piece. will it place the king in a check? make a deep copy of the board

        let cloneBoard = copyBoard(Board);
        cloneBoard.Squares[newI][newJ].piece = cloneBoard.Squares[oldI][oldJ].piece;
        cloneBoard.Squares[oldI][oldJ].piece = undefined;

        cloneBoard.Squares[newI][newJ].piece.i = newI; //setting new coordinates of piece we just moved
        cloneBoard.Squares[newI][newJ].piece.j = newJ; //setting new coordinates of piece we just moved
        cloneBoard.Squares[newI][newJ].piece.moved = true;

        resetPotentialChecks(cloneBoard); //we moved the piece and now we want to see if the king is in check


        if (cloneBoard.Side == "White" && cloneBoard.Squares[newI][newJ].piece.color == "White") { //making sure we are the ones making the move and not the opponent
            //are we in check?
            for (let i = 1; i < cloneBoard.Squares.length; i++) {
                for (let j = 1; j < cloneBoard.Squares[i].length; j++) {
                    if (cloneBoard.Squares[i][j].piece != undefined) {
                        if (cloneBoard.Squares[i][j].piece.name == "King") {
                            if (cloneBoard.Squares[i][j].piece.color == "White" && cloneBoard.Squares[i][j].potentialWhiteCheck) {
                                safeToMove = false;
                            }
                        }
                    }

                }
            }

        }
        else if (cloneBoard.Side == "Black" && cloneBoard.Squares[newI][newJ].piece.color == "Black") {
            // are we in check
            for (let i = 1; i < cloneBoard.Squares.length; i++) {
                for (let j = 1; j < cloneBoard.Squares[i].length; j++) {
                    if (cloneBoard.Squares[i][j].piece != undefined) {
                        if (cloneBoard.Squares[i][j].piece.name == "King") {
                            if (cloneBoard.Squares[i][j].piece.color == "Black" && cloneBoard.Squares[i][j].potentialBlackCheck) {
                                safeToMove = false;
                            }
                        }
                    }

                }
            }

        }

        cloneBoard = undefined;

    }

    if (safeToMove) {

        sound();
        calculateScore(Board,"White");
        calculateScore(Board,"Black");

        if(Board.Squares[oldI][oldJ].piece.name == "King"){
            Board.Squares[oldI][oldJ].piece.oldJ = oldJ; //keep track of where the king was last
        }
        if(Board.Squares[newI][newJ].piece != undefined){ //capturing a piece
            addToCapturedPieces(Board.Squares[newI][newJ].piece.name, Board.Squares[newI][newJ].piece.color);
        }
        Board.Squares[newI][newJ].piece = Board.Squares[oldI][oldJ].piece;
        Board.Squares[oldI][oldJ].piece = undefined;

        Board.Squares[newI][newJ].piece.i = newI; //setting new coordinates of piece we just moved
        Board.Squares[newI][newJ].piece.j = newJ; //setting new coordinates of piece we just moved
        Board.Squares[newI][newJ].piece.moved = true;


        for(let i = 1; i < 9; i++){
            for(let j = 1; j < 9; j++){
                document.getElementById(i + "" + j).classList.toggle("moveIndicator", false);
            }
        }
        document.getElementById(oldI + "" + oldJ).classList.toggle("moveIndicator", true);
        document.getElementById(newI + "" + newJ).classList.toggle("moveIndicator", true);


        if(Board.Squares[newI][newJ].piece.name == "King"){ 
            if(Board.Squares[newI][newJ].piece.oldJ - newJ == -2){//moved to the right since oldJ is smaller than newJ (castling)
                Board.Squares[newI][newJ-1].piece = Board.Squares[newI][8].piece; //since king moved to right, rook has to cross king and go 1 left of the king
                Board.Squares[newI][8].piece = undefined;

                Board.Squares[newI][newJ-1].piece.i = newI; //setting new coordinates of rook we just moved
                Board.Squares[newI][newJ-1].piece.j = newJ-1; //setting new coordinates of rook we just moved
                Board.Squares[newI][newJ-1].piece.moved = true;
            }
            if(Board.Squares[newI][newJ].piece.oldJ - newJ == 2){//moved to the left since oldJ is bigger than newJ (castling)
                Board.Squares[newI][newJ+1].piece = Board.Squares[newI][1].piece; //since king moved to left, rook has to cross king and go 1 right of the king
                Board.Squares[newI][1].piece = undefined;

                Board.Squares[newI][newJ+1].piece.i = newI; //setting new coordinates of rook we just moved
                Board.Squares[newI][newJ+1].piece.j = newJ+1; //setting new coordinates of rook we just moved
                Board.Squares[newI][newJ+1].piece.moved = true;
            }
        }

        //check if you moved a pawn to the other side 
        if(Board.Squares[newI][newJ].piece.name == "Pawn" && (Board.Squares[newI][newJ].piece.i == 8 || Board.Squares[newI][newJ].piece.i == 1)){ //1 is top row and 8 is bottom row. Your pawn will never be able to move backwards, so that means a certain pawn can reach only edge 8 or edge 1 for promotion depending on its color and side of the board
            //promotion
            if(Board.Squares[newI][newJ].piece.color == Board.Side){
                makePromotion(Board.Side, newI, newJ);
            }
            else{
                makePromotion(OpponentSide, newI, newJ);
            }
        }

        if(!makingPromotion)
            resetTurnsAndAnalyzeCheckmates();



    }
    else {

        let kingI;
        let kingJ;
        for (let i = 1; i < 9; i++) {
            for (let j = 1; j < 9; j++) {
                if (Board.Squares[i][j].piece != undefined && Board.Squares[i][j].piece.name == "King" && Board.Squares[i][j].piece.color == Board.Side) {
                    kingI = i;
                    kingJ = j;

                }
            }
        }

        //red flash
        document.getElementById(kingI + "" + kingJ).classList.toggle("kingInCheck", true)
        setTimeout(function () {
            document.getElementById(kingI + "" + kingJ).classList.toggle("kingInCheck", false);
            setTimeout(function () {
                document.getElementById(kingI + "" + kingJ).classList.toggle("kingInCheck", true);
                setTimeout(function () {
                    document.getElementById(kingI + "" + kingJ).classList.toggle("kingInCheck", false)
                }, 250);
            }, 250);
        }, 250);
    }
}
function addToCapturedPieces(piece, color){

    if(piece == undefined && color == undefined){
        element = document.getElementsByClassName("WhitePiecesCaptured")[0];
        element.innerHTML = "";
        element = document.getElementsByClassName("BlackPiecesCaptured")[0];
        element.innerHTML = "";
    }
    else{
        let image = "Images/Pieces/" + color + piece + ".png";

        let element;
        if(color == "White"){
            element = document.getElementsByClassName("WhitePiecesCaptured")[0];
        }else{
            element = document.getElementsByClassName("BlackPiecesCaptured")[0];
        }
    
        let innerHTML = "<img src='"+ image +"' width='20%'>"
    
        element.innerHTML+= innerHTML;
    }


}
function resetPotentialChecks(board) {
    board.CheckMateOnBlack = false;
    board.CheckMateOnWhite = false;
    board.WhiteCheck = false;
    board.BlackCheck = false;
    for (let i = 1; i < board.Squares.length; i++) {
        for (let j = 1; j < board.Squares[i].length; j++) {
            board.Squares[i][j].potentialBlackCheck = false;
            board.Squares[i][j].potentialWhiteCheck = false;
        }
    }
    for (let i = 1; i < board.Squares.length; i++) {
        for (let j = 1; j < board.Squares[i].length; j++) {
            if (board.Squares[i][j].piece != undefined) {
                board.Squares[i][j].piece.setPotentialCheck(board);
            }
        }
    }
    //is any king in check?
    for (let i = 1; i < board.Squares.length; i++) {
        for (let j = 1; j < board.Squares[i].length; j++) {
            if (board.Squares[i][j].piece != undefined) {
                if (board.Squares[i][j].piece.name == "King") {
                    if (board.Squares[i][j].piece.color == "White" && board.Squares[i][j].potentialWhiteCheck) {
                        board.WhiteCheck = true;
                    }
                    if (board.Squares[i][j].piece.color == "Black" && board.Squares[i][j].potentialBlackCheck) {
                        board.BlackCheck = true;
                    }
                }
            }

        }
    }
}

function resetTurnsAndAnalyzeCheckmates(){
    drawBoard();
    resetPotentialChecks(Board);



    //reset turn
    if (Board.Turn == "White") {
        Board.Turn = "Black";

        //analyze checkmate
        if (Board.BlackCheck) {
            if (Board.BlackKing.getMoves(Board).length == 0  || !areMovesLegal(Board.BlackKing.getMoves(Board))) {
                let isCheckMate = true;
                for (let i = 1; i < 9; i++) {
                    for (let j = 1; j < 9; j++) {
                        if (Board.Squares[i][j].piece != undefined && Board.Squares[i][j].piece.color == "Black") {
                            let moves = Board.Squares[i][j].piece.getMoves(Board);
                            for (let k = 0; k < moves.length; k++) {
                                let newI = moves[k].i;
                                let newJ = moves[k].j;
                                let oldI = Board.Squares[i][j].piece.i;
                                let oldJ = Board.Squares[i][j].piece.j;

                                let cloneBoard = copyBoard(Board);
                                cloneBoard.Squares[newI][newJ].piece = cloneBoard.Squares[oldI][oldJ].piece;
                                cloneBoard.Squares[oldI][oldJ].piece = undefined;

                                cloneBoard.Squares[newI][newJ].piece.i = newI; //setting new coordinates of piece we just moved
                                cloneBoard.Squares[newI][newJ].piece.j = newJ; //setting new coordinates of piece we just moved
                                cloneBoard.Squares[newI][newJ].piece.moved = true;
                                resetPotentialChecks(cloneBoard); //we moved the piece and now we want to see if the king is in check

                                //are we in check?
                                for (let a = 1; a < cloneBoard.Squares.length; a++) {
                                    for (let b = 1; b < cloneBoard.Squares[i].length; b++) {
                                        if (cloneBoard.Squares[a][b].piece != undefined) {
                                            if (cloneBoard.Squares[a][b].piece.name == "King") {
                                                if (cloneBoard.Squares[a][b].piece.color == "Black" && !cloneBoard.Squares[a][b].potentialBlackCheck) {
                                                    isCheckMate = false;
                                                }
                                            }
                                        }

                                    }
                                }
                            }
                        }
                    }
                }
                if(isCheckMate){Board.CheckMateOnBlack = true;}
            }                
        }
        else{//stalemate because of black
            if(getAllMovesExceptKing(Board, "Black").length == 0){  //no other piece has legal move
                if(Board.BlackKing.getMoves(Board).length == 0 || !areMovesLegal(Board.BlackKing.getMoves(Board))){ //the king also does not have any moves
                    Board.Stalemate = true;
                    makePopUp("Draw - Stalemate");
                    gameOver = true;
                    gameStarted = false
                }
            }
        }
    } else if (Board.Turn == "Black") {
        Board.Turn = "White";

        //analyze checkmate
        if (Board.WhiteCheck) {
            if (Board.WhiteKing.getMoves(Board).length == 0 || !areMovesLegal(Board.WhiteKing.getMoves(Board))) {
                let isCheckMate = true;
                for (let i = 1; i < 9; i++) {
                    for (let j = 1; j < 9; j++) {
                        if (Board.Squares[i][j].piece != undefined && Board.Squares[i][j].piece.color == "White") {
                            let moves = Board.Squares[i][j].piece.getMoves(Board);

                            for (let k = 0; k < moves.length; k++) {
                                let newI = moves[k].i;
                                let newJ = moves[k].j;
                                let oldI = Board.Squares[i][j].piece.i;
                                let oldJ = Board.Squares[i][j].piece.j;

                                let cloneBoard = copyBoard(Board);
                                cloneBoard.Squares[newI][newJ].piece = cloneBoard.Squares[oldI][oldJ].piece;
                                cloneBoard.Squares[oldI][oldJ].piece = undefined;

                                cloneBoard.Squares[newI][newJ].piece.i = newI; //setting new coordinates of piece we just moved
                                cloneBoard.Squares[newI][newJ].piece.j = newJ; //setting new coordinates of piece we just moved
                                cloneBoard.Squares[newI][newJ].piece.moved = true;
                                resetPotentialChecks(cloneBoard); //we moved the piece and now we want to see if the king is in check

                                //are we in check?
                                for (let a = 1; a < 9; a++) {
                                    for (let b = 1; b < 9; b++) {
                                        if (cloneBoard.Squares[a][b].piece != undefined) {
                                            if (cloneBoard.Squares[a][b].piece.name == "King") {
                                                if (cloneBoard.Squares[a][b].piece.color == "White" && !cloneBoard.Squares[a][b].potentialWhiteCheck) {
                                                    isCheckMate = false;
                                                }
                                            }
                                        }

                                    }
                                }
                            }
                        }
                    }
                }
                if(isCheckMate){Board.CheckMateOnWhite = true;}
            }   
        }
        else{//stalemate because of white
            if(getAllMovesExceptKing(Board, "White").length == 0){  //no other piece has legal move
                if(Board.WhiteKing.getMoves(Board).length == 0   || !areMovesLegal(Board.WhiteKing.getMoves(Board))){ //the king also does not have any moves
                    Board.Stalemate = true;
                    makePopUp("Draw - Stalemate");
                    gameOver = true;
                    gameStarted = false;
                }
            }
        }
    }

    if(Board.CheckMateOnBlack){
        if(Board.Side == "White"){
           makePopUp("Checkmate - You Win!");
        }else{
            makePopUp("Checkmate - You Lose!");
        }
        gameOver = true;
        gameStarted = false;

    }
    if(Board.CheckMateOnWhite){
        if(Board.Side == "Black"){
            makePopUp("Checkmate - You Win!");
        }else{
            makePopUp("Checkmate - You Lose!");
        }
        gameOver = true;
        gameStarted = false;
    }

    calculateScore(Board, "White");
    calculateScore(Board, "Black");
    if(Board.WhiteScore == 10000 && Board.BlackScore == 10000){
        makePopUp("Draw - Insufficient Material");
        gameOver = true;
        gameStarted = false;
    }
    if(Board.Turn == OpponentSide && !gameOver){
        setTimeout(function () {
            calculateOpponentMove();
        }, 50);
    }
}
function resign(){
    if(!gameOver && gameStarted){
        gameOver = true;
        gameStarted = false;
        makePopUp("Resigned - You Lose");
    }
}
function drawGame(){
    if(!gameOver && gameStarted){
        calculateScore(Board, "White");
        calculateScore(Board, "Black");

        if(OpponentSide == "White"){
            if(Board.WhiteScore - Board.BlackScore < 10){ //if the computer is not winning by a whole lot, it will be nice and accept the draw
                gameOver = true;
                gameStarted = false;
                makePopUp("Draw - By Agreement");
            }else{ //if the computer is clearlt winning, it will decline the draw
                alert("The computer declined your draw offer!");
            }
        }else{
            if(Board.BlackScore - Board.WhiteScore < 10){ //if the computer is not winning by a whole lot, it will be nice and accept the draw
                gameOver = true;
                gameStarted = false;
                makePopUp("Draw - By Agreement");
            }else{ //if the computer is clearlt winning, it will decline the draw
                alert("The computer declined your draw offer!");
            }
        }

    }
}

function restart(){
    movesPlayed = 0; //for computer
    //we want to choose side first and then set up board later on
    createBoard();
    setPieces();
    drawBoard();
    resetPotentialChecks(Board);
    makePopUp("Chess");
    gameOver = false;
}
function chooseDifficulty(d){
    depth = d;
}
function copyBoard(B) {

    let p = undefined; //currentSelecyed piece
    if (B.CurrentSelected != undefined) {
        //make new currentSelected piece
        if (B.CurrentSelected.name == "Pawn") {
            p = new Pawn(B.CurrentSelected.color, B.CurrentSelected.i, B.CurrentSelected.j);
        }
        if (B.CurrentSelected.name == "King") {
            p = new King(B.CurrentSelected.color, B.CurrentSelected.i, B.CurrentSelected.j);
        }
        if (B.CurrentSelected.name == "Knight") {
            p = new Knight(B.CurrentSelected.color, B.CurrentSelected.i, B.CurrentSelected.j);
        }
        if (B.CurrentSelected.name == "Bishop") {
            p = new Bishop(B.CurrentSelected.color, B.CurrentSelected.i, B.CurrentSelected.j);
        }
        if (B.CurrentSelected.name == "Rook") {
            p = new Rook(B.CurrentSelected.color, B.CurrentSelected.i, B.CurrentSelected.j);
        }
        if (B.CurrentSelected.name == "Queen") {
            p = new Queen(B.CurrentSelected.color, B.CurrentSelected.i, B.CurrentSelected.j);
        }
        p.moved = B.CurrentSelected.moved;
    }
    let cloneBoard = {
        Squares: [],
        Side: B.Side,
        Turn: B.Turn,
        CurrentSelected: p,
        WhiteCheck: B.WhiteCheck,
        BlackCheck: B.BlackCheck,
        GAMEMODE: B.GAMEMODE,
        WhiteScore: B.WhiteScore,
        BlackScore: B.BlackScore,
        CheckMateOnBlack: B.CheckMateOnBlack,
        CheckMateOnWhite: B.CheckMateOnWhite,
    }

    //initilialize Squares
    {
        cloneBoard.Squares = [];
        for (let i = 0; i < 9; i++) {
            cloneBoard.Squares.push(new Array(9));
        }
        for (let i = 1; i < 9; i++) {
            for (let j = 1; j < 9; j++) {
                let pce = undefined;
                if (B.Squares[i][j].piece != undefined) {//initialize square piece
                    if (B.Squares[i][j].piece.name == "Pawn") {
                        pce = new Pawn(B.Squares[i][j].piece.color, B.Squares[i][j].piece.i, B.Squares[i][j].piece.j);
                    }
                    if (B.Squares[i][j].piece.name == "King") {
                        pce = new King(B.Squares[i][j].piece.color, B.Squares[i][j].piece.i, B.Squares[i][j].piece.j);
                    }
                    if (B.Squares[i][j].piece.name == "Queen") {
                        pce = new Queen(B.Squares[i][j].piece.color, B.Squares[i][j].piece.i, B.Squares[i][j].piece.j);
                    }
                    if (B.Squares[i][j].piece.name == "Knight") {
                        pce = new Knight(B.Squares[i][j].piece.color, B.Squares[i][j].piece.i, B.Squares[i][j].piece.j);
                    }
                    if (B.Squares[i][j].piece.name == "Bishop") {
                        pce = new Bishop(B.Squares[i][j].piece.color, B.Squares[i][j].piece.i, B.Squares[i][j].piece.j);
                    }
                    if (B.Squares[i][j].piece.name == "Rook") {
                        pce = new Rook(B.Squares[i][j].piece.color, B.Squares[i][j].piece.i, B.Squares[i][j].piece.j);
                    }
                    pce.moved = B.Squares[i][j].piece.moved;
                }
                //troublesome////////////////////////////////////////
                cloneBoard.Squares[i][j] = {
                    piece: pce,
                    potentialWhiteCheck: B.Squares[i][j].potentialWhiteCheck,
                    potentialBlackCheck: B.Squares[i][j].potentialBlackCheck,
                }
            }
        }
    }
    return cloneBoard;

}
function makePopUp(event){
    let body = document.getElementsByClassName('Container')[0];
    
    let popUpHeader = "<div class='PopUpHeader'> <h1 class='PopUpText'>"+ event +"</h1>    </div>";
    let popUpBodyText = "<h1 class='PopUpBodyText'>Choose Side:</h1>";
    let whiteButton = "<button onclick=chooseSide('White') class='ChooseSideButton'><img src='Images/Pieces/WhiteKing.png' height='50vw'></button>";
    let blackButton = "<button onclick=chooseSide('Black') class='ChooseSideButton'><img src='Images/Pieces/BlackKing.png' height='50vw'></button>";
    let difficultyText = "<h2 class='PopUpBodyText' style='margin-top: 8px;'>Choose Difficulty:</h2>"

    let normal = "<button onclick=chooseDifficulty(2) class='ChooseSideButton DifficultyButton'> Easy </button>";
    let tough = "<button onclick=chooseDifficulty(3) class='ChooseSideButton DifficultyButton' autofocus> Medium </button>";
    let hard = "<button onclick=chooseDifficulty(4) class='ChooseSideButton DifficultyButton'> Hard (Slow) </button>";

    let themeText = "<h2 class='PopUpBodyText' style='margin-top: 8px;'>Choose Theme:</h2>";

    let brownTheme = "<button onclick=setTheme('Brown') class='brownButton'></button>";
    let blueTheme = "<button onclick=setTheme('Blue') class='blueButton'></button>";
    let greenTheme = "<button onclick=setTheme('Green') class='greenButton'></button>";
    let br = "<br>";
    let viewBoard = "<button onclick=viewBoard() class='viewBoardButton' > View Board </button>";


    let popUpBody = "<div class='PopUpBody'>" + popUpBodyText + whiteButton + blackButton + difficultyText + normal + tough + hard + themeText + brownTheme + blueTheme + greenTheme +br + br + viewBoard+  "</div>";


    let popUp = "<div id='PopUp'>"+ popUpHeader + popUpBody +"</div>";
    body.innerHTML += popUp;

}
function makePromotion(color, i, j){
    let node = document.createElement("div");
    makingPromotion = true;    

    if(color != OpponentSide){
        let QueenPromote = "<div class='PromotionOptions' id='QueenPromote'><img src='Images/Pieces/"+color+"Queen.png' width='90%' height='90%'></div>";
        let KnightPromote = "<div class='PromotionOptions' id='KnightPromote'><img src='Images/Pieces/"+color+"Knight.png' width='90%' height='90%'></div>";
        let RookPromote = "<div class='PromotionOptions' id='RookPromote'><img src='Images/Pieces/"+color+"Rook.png' width='90%' height='90%'></div>";
        let BishopPromote = "<div class='PromotionOptions' id='BishopPromote'><img src='Images/Pieces/"+color+"Bishop.png' width='90%' height='90%'></div>";
    
        node.innerHTML = "<div id='Promotion'>" + QueenPromote + KnightPromote + RookPromote + BishopPromote + "</div>";
    
        document.getElementsByTagName("body")[0].appendChild(node);
    
        document.getElementById("QueenPromote").addEventListener("click", function(){
            if(color == "White"){
                Board.Squares[i][j].piece = new Queen("White", i, j);
            }else{ //Black
                Board.Squares[i][j].piece = new Queen("Black", i, j);
            }
            calculateScore(Board,"White");
            calculateScore(Board,"Black");
            document.getElementById("Promotion").remove();
            drawBoard();
            resetPotentialChecks(Board);
            checkFlag();
            makingPromotion = false;
            resetTurnsAndAnalyzeCheckmates();
        });
        document.getElementById("KnightPromote").addEventListener("click", function(){
            if(color == "White"){
                Board.Squares[i][j].piece = new Knight("White", i, j);
            }else{ //Black
                Board.Squares[i][j].piece = new Knight("Black", i, j);
            }
            calculateScore(Board,"White");
            calculateScore(Board,"Black");
            document.getElementById("Promotion").remove();
            drawBoard();
            resetPotentialChecks(Board);
            checkFlag();
            makingPromotion = false;
            resetTurnsAndAnalyzeCheckmates();
        });
        document.getElementById("RookPromote").addEventListener("click", function(){
            if(color == "White"){
                Board.Squares[i][j].piece = new Rook("White", i, j);
            }else{ //Black
                Board.Squares[i][j].piece = new Rook("Black", i, j);
            }
            calculateScore(Board,"White");
            calculateScore(Board,"Black");
            document.getElementById("Promotion").remove();
            drawBoard();
            resetPotentialChecks(Board);
            checkFlag();
            makingPromotion = false;
            resetTurnsAndAnalyzeCheckmates();
        });
        document.getElementById("BishopPromote").addEventListener("click", function(){
            if(color == "White"){
                Board.Squares[i][j].piece = new Bishop("White", i, j);
            }else{ //Black
                Board.Squares[i][j].piece = new Bishop("Black", i, j);
            }
            calculateScore(Board,"White");
            calculateScore(Board,"Black");
            document.getElementById("Promotion").remove();
            drawBoard();
            resetPotentialChecks(Board);
            checkFlag();
            makingPromotion = false;
            resetTurnsAndAnalyzeCheckmates();
        });
    }
    else{
        //minimax will choose queen anyway since it has highest value
        if(color == "White"){
            Board.Squares[i][j].piece = new Queen("White", i, j);
        }else{ //Black
            Board.Squares[i][j].piece = new Queen("Black", i, j);
        }
        resetPotentialChecks(Board);
        calculateScore(Board,"White");
        calculateScore(Board,"Black");
        drawBoard();
        makingPromotion = false;
    }
    

    
}
function checkFlag() {
    if(makingPromotion == true) {
       window.setTimeout(checkFlag, 100); /* this checks the flag every 100 milliseconds*/
    } else {
      /* do something*/
    }
}
//make a function for calculating score
function calculateScore(B,s){
    let score = 0;
    for(let i = 1; i < 9; i++){
        for(let j = 1; j < 9; j++){
            if(B.Squares[i][j].piece != undefined && B.Squares[i][j].piece.color == s){
                score += B.Squares[i][j].piece.value;
            }
        }
    }
    if(s == "White"){
        B.WhiteScore = score;
    }else{
        B.BlackScore = score;
    }
}
function areMovesLegal(moves){
    for(let i = 0; i < moves.length; i++){
        if(moves[i].legalMove){
            return true;
        }
    }
    return false;
}
restart();
function getAllMovesExceptKing(B, s){
    let moves = [];
        for(let i = 1; i < 9; i++){
            for(let j = 1; j < 9; j++){
                if(B.Squares[i][j].piece != undefined && B.Squares[i][j].piece.color == s && B.Squares[i][j].piece.name != "King"){ //not king
                   
                    let m = B.Squares[i][j].piece.getMoves(B);
                    for(let k = 0; k < m.length; k++){
                        let oi = i;
                        let oj = j;
                        let ni = m[k].i;
                        let nj = m[k].j;
                        move = new Move(oi,oj,ni,nj);
                        moves.push(move);
                    }
                }
            }
        }
    return moves;
}

function sound(){
    var snd = new Audio("Sound/ChessMoveSound.mp3");
    snd.volume = 0.5;
    snd.play();
    snd.currentTime=0;
}

function viewBoard(){
    let popUp = document.getElementById("PopUp");
    popUp.remove();
}
