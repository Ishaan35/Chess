let OpponentSide="";
let movesPlayed = 0;

let depth = 3;

function setSide(s){
    OpponentSide = s;
}
function calculateOpponentMove(){
        let m;
        if(OpponentSide == "White"){
            if(movesPlayed == 0){
                moves = [];
                moves.push(new Move(2,4,4,4));
                moves.push(new Move(2,4,4,4)); //greater chance of pawn e4
                moves.push(new Move(1,2,3,3));
                moves.push(new Move(1,7,3,6));
    
                let rand = Math.floor(Math.random() *  moves.length);
                m = new optimalMoveObj(undefined, moves[rand]);
            }
            else{
                m = MAXIMIZE(Board, depth, -999999, 999999);
            }
            movesPlayed++;
        }
        if(OpponentSide == "Black"){
            if(movesPlayed == 0){
                moves = [];
                moves.push(new Move(1,2,3,3));
                moves.push(new Move(1,7,3,6));
    
                let rand = Math.floor(Math.random() *  moves.length);
                m = new optimalMoveObj(undefined, moves[rand]);
            }
            else{
                m = MINIMIZE(Board, depth, -999999, 999999);
            }
            movesPlayed++;
        }
    
        let oldI = m.move.oldI;
        let oldJ = m.move.oldJ;
        let newI = m.move.newI;
        let newJ = m.move.newJ;
    
        makeMove(oldI, oldJ, newI, newJ);
    
}   

function MAXIMIZE(B, depth, alpha, beta){
    if(depth == 0){
        return new optimalMoveObj(calculateUtility(B), undefined);
    }

    let maximizeUtility = -999999;
    let bestMoves = [];

    let possibilities = getAllMoves(B, "White");

    for(let i = 0; i < possibilities.length; i++){
        let cloneBoard = copyBoard(B);
        let newI = possibilities[i].newI;
        let newJ = possibilities[i].newJ;
        let oldI = possibilities[i].oldI;
        let oldJ = possibilities[i].oldJ;

        cloneBoard.Squares[newI][newJ].piece = cloneBoard.Squares[oldI][oldJ].piece;
        cloneBoard.Squares[oldI][oldJ].piece = undefined;

        cloneBoard.Squares[newI][newJ].piece.i = newI; //setting new coordinates of piece we just moved
        cloneBoard.Squares[newI][newJ].piece.j = newJ; //setting new coordinates of piece we just moved
        cloneBoard.Squares[newI][newJ].piece.moved = true;

        let result = MINIMIZE(cloneBoard, depth-1);
        if(result.utility >= maximizeUtility){
            
            possibilities[i].utility = result.utility;
            bestMoves.push(possibilities[i]);
            maximizeUtility = result.utility;
        }
        if(alpha > result.utility){
            alpha = result.utility;
        }
        if(beta < alpha){
            break;
        }

    }
    
    let max = -999999;
    for(let i = 0; i < bestMoves.length; i++){
        if(bestMoves[i].utility > max){
            max = bestMoves[i].utility;
        }
    }
    //remove all moves worth less than max
    let i = 0;
    while(i < bestMoves.length){
        if(bestMoves[i].utility < max){
            bestMoves.splice(i, 1);
        }
        else{i++;}
    }
    //choosing a random move from a list of moves that yield the same value
    let rand = bestMoves[Math.floor(Math.random() *  bestMoves.length)];
    return new optimalMoveObj(maximizeUtility, rand);
}

function MINIMIZE(B, depth, alpha, beta){
    if(depth == 0){
        return new optimalMoveObj(calculateUtility(B), undefined);
    }

    let minimizeUtility = 999999;
    let bestMoves = [];

    let possibilities = getAllMoves(B, "Black");

    for(let i = 0; i < possibilities.length; i++){
        let cloneBoard = copyBoard(B);
        let newI = possibilities[i].newI;
        let newJ = possibilities[i].newJ;
        let oldI = possibilities[i].oldI;
        let oldJ = possibilities[i].oldJ;
        

        cloneBoard.Squares[newI][newJ].piece = cloneBoard.Squares[oldI][oldJ].piece;
        cloneBoard.Squares[oldI][oldJ].piece = undefined;
        cloneBoard.Squares[newI][newJ].piece.i = newI; //setting new coordinates of piece we just moved
        cloneBoard.Squares[newI][newJ].piece.j = newJ; //setting new coordinates of piece we just moved
        cloneBoard.Squares[newI][newJ].piece.moved = true;

        let result = MAXIMIZE(cloneBoard, depth-1);

        if(result.utility <= minimizeUtility){

            possibilities[i].utility = result.utility;
            bestMoves.push(possibilities[i]);
            minimizeUtility = result.utility;
        }
        if(beta < result.utility){
            beta = result.utility;
        }
        if(beta < alpha){
            break;
        }
    }
    let min = 999999;
    for(let i = 0; i < bestMoves.length; i++){
        if(bestMoves[i].utility < min){
            min = bestMoves[i].utility;
        }
    }
    //remove all moves worth less than max
    let i = 0;
    while(i < bestMoves.length){
        if(bestMoves[i].utility > min){
            bestMoves.splice(i, 1);
        }
        else{i++;}
    }
    let rand = bestMoves[Math.floor(Math.random() *  bestMoves.length)];
    return new optimalMoveObj(minimizeUtility, rand);
}


function calculateUtility(B){
    calculateScore(B, "White");
    calculateScore(B, "Black");

    return B.WhiteScore - B.BlackScore;
}

class optimalMoveObj{

    constructor(u, m){
        this.utility = u;
        this.move = m;
    }
}

class Move{
    constructor(oi, oj, ni, nj){
        this.oldI = oi;
        this.oldJ = oj;
        this.newI = ni;
        this.newJ = nj;
        this.utility = undefined;
    }
}

function getAllMoves(B,s){

    let moves = [];
        for(let i = 1; i < 9; i++){
            for(let j = 1; j < 9; j++){
                if(B.Squares[i][j].piece != undefined && B.Squares[i][j].piece.color == s){
                   
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




