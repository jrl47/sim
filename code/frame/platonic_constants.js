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

let ORTH_SHIFTS_X_3 = [0, 0, -3, 3];
let ORTH_SHIFTS_Y_3 = [-3, 3, 0, 0];

let DIAG_SHIFTS_X_3 = [3, 3, -3, -3];
let DIAG_SHIFTS_Y_3 = [-3, 3, -3, 3];

let KNIGHT_SHIFTS_X_3 = [1, 1, -1, -1, 3, 3, -3, -3];
let KNIGHT_SHIFTS_Y_3 = [-3, 3, -3, 3, -1, 1, -1, 1];

let DKNIGHT_SHIFTS_X_3 = [2, 2, -2, -2, 3, 3, -3, -3];
let DKNIGHT_SHIFTS_Y_3 = [-3, 3, -3, 3, -2, 2, -2, 2];

let SHIFT_INDEX_X = [];
SHIFT_INDEX_X.push([]);
SHIFT_INDEX_X[0][1] = ORTH_SHIFTS_X;
SHIFT_INDEX_X[0][2] = ORTH_SHIFTS_X_2;
SHIFT_INDEX_X[0][3] = ORTH_SHIFTS_X_3;
SHIFT_INDEX_X.push([]);
SHIFT_INDEX_X[1][1] = DIAG_SHIFTS_X;
SHIFT_INDEX_X[1][2] = KNIGHT_SHIFTS_X_2;
SHIFT_INDEX_X[1][3] = KNIGHT_SHIFTS_X_3;
SHIFT_INDEX_X.push([]);
SHIFT_INDEX_X[2][2] = DIAG_SHIFTS_X_2;
SHIFT_INDEX_X[2][3] = DKNIGHT_SHIFTS_X_3;

let SHIFT_INDEX_Y = [];
SHIFT_INDEX_Y.push([]);
SHIFT_INDEX_Y[0][1] = ORTH_SHIFTS_Y;
SHIFT_INDEX_Y[0][2] = ORTH_SHIFTS_Y_2;
SHIFT_INDEX_Y[0][3] = ORTH_SHIFTS_Y_3;
SHIFT_INDEX_Y.push([]);
SHIFT_INDEX_Y[1][1] = DIAG_SHIFTS_Y;
SHIFT_INDEX_Y[1][2] = KNIGHT_SHIFTS_Y_2;
SHIFT_INDEX_Y[1][3] = KNIGHT_SHIFTS_Y_3;
SHIFT_INDEX_Y.push([]);
SHIFT_INDEX_Y[2][2] = DIAG_SHIFTS_Y_2;
SHIFT_INDEX_Y[2][3] = DKNIGHT_SHIFTS_Y_3;