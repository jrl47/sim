class GooLogic {
  constructor(size) {
      if (!GooLogic.instance) {
        GooLogic.instance = this;
      }
      return GooLogic.instance;
  }

  doGooLogic(grid, neighborTotals, i, j) {
      let redPenalty = 0;
      let greenPenalty = 0;
      let bluePenalty = 0;

      let redMinusGreen = grid.rows[i][j].state.red - grid.rows[i][j].state.green;
      if (redMinusGreen > 0) {
        greenPenalty += redMinusGreen
      } else {
        redPenalty -= redMinusGreen;
      }
      let redMinusBlue = grid.rows[i][j].state.red - grid.rows[i][j].state.blue;
      if (redMinusBlue > 0) {
        bluePenalty += redMinusBlue;
      } else {
        redPenalty -= redMinusBlue;
      }
      let greenMinusBlue = grid.rows[i][j].state.green - grid.rows[i][j].state.blue;
      if (greenMinusBlue > 0) {
        bluePenalty += greenMinusBlue;
      } else {
        greenPenalty -= greenMinusBlue
      }

      grid.rows[i][j].state.red = Math.floor(grid.rows[i][j].state.red * Math.pow(.05, redPenalty));
      grid.rows[i][j].state.green = Math.floor(grid.rows[i][j].state.green * Math.pow(.99, greenPenalty));
      grid.rows[i][j].state.blue = Math.floor(grid.rows[i][j].state.blue * Math.pow(.3, bluePenalty));

      let chg = 0;

      let greenNeighborTotal = neighborTotals[i][j].green;
      switch (Math.floor(greenNeighborTotal / 250)) {
        // case 0: chg = 0; break;
        case 0: chg = 9; break;
        case 1: chg = 8; break;
        case 2: chg = 4; break;
        case 3: chg = 3; break;
        case 4: chg = 2; break;
        case 5: chg = 1; break;
        case 6: chg = 0; break;
        case 7: chg = -1; break;
        default: chg = -2;
      }
      grid.rows[i][j].state.green += chg;
      if (grid.rows[i][j].state.green < 0) {
        grid.rows[i][j].state.green = 0;
      }

      let blueNeighborTotal = neighborTotals[i][j].blue;
      switch (Math.floor(blueNeighborTotal / 250)) {
        case 0: chg = 10; break;
        case 1: chg = 3; break;
        case 2: chg = 8; break;
        case 3: chg = 14; break;
        case 4: chg = 4; break;
        case 5: chg = 2; break;
        case 6: chg = -19; break;
        case 7: chg = -3; break;
        default: chg = -5;
      }
      grid.rows[i][j].state.blue += chg;
      if (grid.rows[i][j].state.blue < 0) {
        grid.rows[i][j].state.blue = 0;
      }

      let redNeighborTotal = neighborTotals[i][j].red;
      switch (Math.floor(redNeighborTotal / 200)) {
        case 0: chg = 14; break;
        case 1: chg = 11; break;
        case 2: chg = 7; break;
        case 3: chg = 5; break;
        case 4: chg = 33; break;
        case 5: chg = -1; break;
        case 6: chg = 4; break;
        case 7: chg = 5; break;
        default: chg = -55;
      }
      grid.rows[i][j].state.red += chg;
      if (grid.rows[i][j].state.red < 0) {
        grid.rows[i][j].state.red = 0;
      }
  }
}