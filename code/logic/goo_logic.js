class GooLogic { // SINGLETON
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
        greenPenalty += redMinusGreen;
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
        greenPenalty -= greenMinusBlue;
      }

      let gooPenaltyScale = 250;
      grid.rows[i][j].state.red = Math.floor(grid.rows[i][j].state.red * Math.pow(.55, redPenalty/gooPenaltyScale));
      grid.rows[i][j].state.green = Math.floor(grid.rows[i][j].state.green * Math.pow(.975, greenPenalty/gooPenaltyScale));
      grid.rows[i][j].state.blue = Math.floor(grid.rows[i][j].state.blue * Math.pow(.9, bluePenalty/gooPenaltyScale));

      let chg = 0;

      let greenNeighborTotal = neighborTotals[i][j].green;
      switch (Math.floor(greenNeighborTotal / 250)) {
        // case 0: chg = 0; break;
        case 0: chg = 5; break;
        case 1: chg = 4; break;
        case 2: chg = 3; break;
        case 3: chg = 2; break;
        case 4: chg = 2; break;
        case 5: chg = 1; break;
        case 6: chg = 1; break;
        case 7: chg = 0; break;
        default: chg = -3;
      }
      grid.rows[i][j].state.green += chg;
      if (grid.rows[i][j].state.green < 0) {
        grid.rows[i][j].state.green = 0;
      }

      let blueNeighborTotal = neighborTotals[i][j].blue;
      switch (Math.floor(blueNeighborTotal / 250)) {
        case 0: chg = 5; break;
        case 1: chg = 2; break;
        case 2: chg = 4; break;
        case 3: chg = 6; break;
        case 4: chg = 1; break;
        case 5: chg = 1; break;
        case 6: chg = -17; break;
        case 7: chg = -3; break;
        default: chg = -7;
      }
      grid.rows[i][j].state.blue += chg;
      if (grid.rows[i][j].state.blue < 0) {
        grid.rows[i][j].state.blue = 0;
      }

      let redNeighborTotal = neighborTotals[i][j].red;
      switch (Math.floor(redNeighborTotal / 250)) {
        case 0: chg = 7; break;
        case 1: chg = 5; break;
        case 2: chg = 4; break;
        case 3: chg = 3; break;
        case 4: chg = 9; break;
        case 5: chg = -2; break;
        case 6: chg = -7; break;
        case 7: chg = 2; break;
        default: chg = -22;
      }
      grid.rows[i][j].state.red += chg;
      if (grid.rows[i][j].state.red < 0) {
        grid.rows[i][j].state.red = 0;
      }
  }
  getNeighborTotals(grid) {
    let neighborTotals = [];
    for(let i = 0; i < grid.size; i++) {
      neighborTotals.push([]);
      for(var j = 0; j < grid.size; j++) {
        neighborTotals[i].push(
          {
            blue: this.getWeightedNeighborTotal(grid, 'blue', i, j),
            green: this.getWeightedNeighborTotal(grid, 'green', i, j),
            red: this.getWeightedNeighborTotal(grid, 'red', i, j)
          }
        );
      }
    }
    return neighborTotals;
  }
  getWeightedNeighborTotal(grid, color, i, j) {
    let result = 0;
  
    let selfWeight = -1;
    let orthWeight = -1;
  
    if (color === 'green') {
      selfWeight = 8;
      orthWeight = 1.7;
    } else if (color === 'blue') {
      selfWeight = 9;
      orthWeight = 1.7;
    } else if (color === 'red') {
      selfWeight = 10;
      orthWeight = 2.1;
    }
  
    result += grid.rows[i][j].state[color] * selfWeight;
    for (let k = 0; k < 4; k++) {
      result += grid.rows[mod(i + ORTH_SHIFTS_X[k], grid.size)][mod(j + ORTH_SHIFTS_Y[k], grid.size)].state[color] * orthWeight;
    }
    return result;
  }
}