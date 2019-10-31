// DOWN, UP, LEFT, RIGHT

let ORTH_SHIFTS_X = [0, 0, -1, 1];
let ORTH_SHIFTS_Y = [-1, 1, 0, 0];

let DIAG_SHIFTS_X = [1, 1, -1, -1];
let DIAG_SHIFTS_Y = [-1, 1, -1, 1];

let ORTH_SHIFTS_X_2 = [0, 0, -2, 2];
let ORTH_SHIFTS_Y_2 = [-2, 2, 0, 0];

let DIAG_SHIFTS_X_2 = [2, 2, -2, -2];
let DIAG_SHIFTS_Y_2 = [-2, 2, -2, 2];

let KNIGHT_SHIFTS_X_2 = [1, 1, -1, -1, 2, 2, -2, -2];
let KNIGHT_SHIFTS_Y_2 = [-2, 2, -2, 2, -1, 1, -1, 1];

let KNIGHT_SHIFTS_X_3 = [1, 1, -1, -1, 3, 3, -3, -3];
let KNIGHT_SHIFTS_Y_3 = [-3, 3, -3, 3, -1, 1, -1, 1];

let DKNIGHT_SHIFTS_X_3 = [2, 2, -2, -2, 3, 3, -3, -3];
let DKNIGHT_SHIFTS_Y_3 = [-3, 3, -3, 3, -2, 2, -2, 2];

let SHIFT_INDEX = [];

for (let i = 0; i < 10; i++) {
    SHIFT_INDEX.push([]);
    for (let j = 0; j < 10; j++) {
        SHIFT_INDEX[i].push({});
    }
}

SHIFT_INDEX[0][1].x = ORTH_SHIFTS_X;
SHIFT_INDEX[0][1].y = ORTH_SHIFTS_Y;
SHIFT_INDEX[0][2].x = ORTH_SHIFTS_X_2;
SHIFT_INDEX[0][2].y = ORTH_SHIFTS_Y_2;

SHIFT_INDEX[1][1].x = DIAG_SHIFTS_X;
SHIFT_INDEX[1][1].y = DIAG_SHIFTS_Y;
SHIFT_INDEX[1][2].x = KNIGHT_SHIFTS_X_2;
SHIFT_INDEX[1][2].y = KNIGHT_SHIFTS_Y_2;
SHIFT_INDEX[1][3].x = KNIGHT_SHIFTS_X_3;
SHIFT_INDEX[1][3].y = KNIGHT_SHIFTS_Y_3;
SHIFT_INDEX[1][4].x = [1, 1, -1, -1, 4, 4, -4, -4];
SHIFT_INDEX[1][4].y = [-4, 4, -4, 4, -1, 1, -1, 1];
SHIFT_INDEX[1][5].x = [1, 1, -1, -1, 5, 5, -5, -5];
SHIFT_INDEX[1][5].y = [-5, 5, -5, 5, -1, 1, -1, 1];
SHIFT_INDEX[1][6].x = [1, 1, -1, -1, 6, 6, -6, -6];
SHIFT_INDEX[1][6].y = [-6, 6, -6, 6, -1, 1, -1, 1];

SHIFT_INDEX[2][2].x = DIAG_SHIFTS_X_2;
SHIFT_INDEX[2][2].y = DIAG_SHIFTS_Y_2;
SHIFT_INDEX[2][3].x = DKNIGHT_SHIFTS_X_3;
SHIFT_INDEX[2][3].y = DKNIGHT_SHIFTS_Y_3;
SHIFT_INDEX[2][4].x = [2, 2, -2, -2, 4, 4, -4, -4];
SHIFT_INDEX[2][4].y = [-4, 4, -4, 4, -2, 2, -2, 2];
SHIFT_INDEX[2][5].x = [2, 2, -2, -2, 5, 5, -5, -5];
SHIFT_INDEX[2][5].y = [-5, 5, -5, 5, -2, 2, -2, 2];
SHIFT_INDEX[2][6].x = [2, 2, -2, -2, 6, 6, -6, -6];
SHIFT_INDEX[2][6].y = [-6, 6, -6, 6, -2, 2, -2, 2];

SHIFT_INDEX[3][4].x = [3, 3, -3, -3, 4, 4, -4, -4];
SHIFT_INDEX[3][4].y = [-4, 4, -4, 4, -3, 3, -3, 3];
SHIFT_INDEX[3][5].x = [3, 3, -3, -3, 5, 5, -5, -5];
SHIFT_INDEX[3][5].y = [-5, 5, -5, 5, -3, 3, -3, 3];
SHIFT_INDEX[3][6].x = [3, 3, -3, -3, 6, 6, -6, -6];
SHIFT_INDEX[3][6].y = [-6, 6, -6, 6, -3, 3, -3, 3];

SHIFT_INDEX[4][5].x = [4, 4, -4, -4, 5, 5, -5, -5];
SHIFT_INDEX[4][5].y = [-5, 5, -5, 5, -4, 4, -4, 4];
SHIFT_INDEX[4][6].x = [4, 4, -4, -4, 6, 6, -6, -6];
SHIFT_INDEX[4][6].y = [-6, 6, -6, 6, -4, 4, -4, 4];

SHIFT_INDEX[5][6].x = [5, 5, -5, -5, 6, 6, -6, -6];
SHIFT_INDEX[5][6].y = [-6, 6, -6, 6, -5, 5, -5, 5];

for (let i = 3; i <= 8; i++) {
    SHIFT_INDEX[0][i].x = ORTH_SHIFTS_X.map(function(entry) { return entry * i; });
    SHIFT_INDEX[0][i].y = ORTH_SHIFTS_Y.map(function(entry) { return entry * i; });

    SHIFT_INDEX[i][i].x = DIAG_SHIFTS_X.map(function(entry) { return entry * i; });
    SHIFT_INDEX[i][i].y = DIAG_SHIFTS_Y.map(function(entry) { return entry * i; });
}


function pursueDirection(i, j) {
    if (i === 0) {
        return [0, 1, 2, 3];
    } else if (i === j) {
        return [0, 3, 2, 1];
    } else {
        return [0, 1, 0, 1, 3, 3, 2, 2];
    }
}

function runDirection(i, j) {
    if (i === 0 || i === j) {
        return [1, 0, 3, 2];
    } else if (i === j) {
        return [1, 2, 3, 0];
    } else {
        return [1, 0, 1, 0, 2, 2, 3, 3]
    }
}