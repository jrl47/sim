function mod(number, modulus) {
  return ((number%modulus)+modulus)%modulus;
}

function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var grid = new Grid(80,);
for (let i = 0; i < grid.size; i++) {
  for (let j = 0; j < grid.size; j++) {
    grid.rows[i][j].state.blue = randInt(0, 255);
    grid.rows[i][j].state.green = randInt(0, 255);
  }
}

drawGrid = function(grid) {
    for(let i = 0; i < grid.size; i++) {
      for(let j = 0; j < grid.size; j++) {
        let blueGrass = grid.rows[i][j].state.blue;
        let greenGrass = grid.rows[i][j].state.green;
        ctx.fillStyle = "rgb(" + (255 - blueGrass - greenGrass) + ", " + (255 - blueGrass) + ", " + (255 - greenGrass) + ")";
        // ctx.fillStyle = "rgb(" + (255 - grid.rows[i][j].state) + ", " + (255 - grid.rows[i][j].state) + ", 255)";
        ctx.fillRect(i * 10 + 1, j * 10 + 1, 9, 9);
      }
    }
};

getNeighborTotal = function(grid, color, i, j) {
  result = 0;
  // xShifts = [0, 0, 1, 1, 1, -1, -1, -1];
  // yShifts = [1, -1, 1, 0, -1, 1, 0, -1];
  xShifts = [0,  0, 0, 1, 1, 1, -1, -1, -1];
  yShifts = [0,  1, -1, 1, 0, -1, 1, 0, -1];
  for (let k = 0; k < xShifts.length; k++) {
    result += grid.rows[mod(i + xShifts[k], grid.size)][mod(j + yShifts[k], grid.size)].state[color];
  }
  // console.log(i + ' ' + j + '  ' + result);
  return result;
}

stepGrid = function(grid) {
  let neighborTotals = [];
  for(let i = 0; i < grid.size; i++) {
    neighborTotals.push([]);
    for(var j = 0; j < grid.size; j++) {
      neighborTotals[i].push(
        {
          blue: getNeighborTotal(grid, 'blue', i, j),
          green: getNeighborTotal(grid, 'green', i, j)
        }
      );
    }
  }
  for(let i = 0; i < grid.size; i++) {
    for(let j = 0; j < grid.size; j++) {
      let blueNeighborTotal = neighborTotals[i][j].blue;
      let blueCutoffs = [200, 175, 172, 150, 143, 125, 122, 100, 20, 0];
      let blueChanges = [-63, -33, 21, -9, 14, -6, 7, 14, -3, -5];
      for(let k = 0; k < blueCutoffs.length; k++) {
        if (blueNeighborTotal > blueCutoffs[k]) {
          grid.rows[i][j].state.blue += blueChanges[k];
          break;
        }
      }
      if (grid.rows[i][j].state.blue < 0) {
        grid.rows[i][j].state.blue = 0;
      }

      let greenNeighborTotal = neighborTotals[i][j].green;
      let greenCutoffs = [200, 175, 172, 150, 143, 125, 122, 100, 20, 0];
      let greenChanges = [-63, -33, 21, -9, 14, -6, 7, 14, -3, -5];
      for(let k = 0; k < greenCutoffs.length; k++) {
        if (greenNeighborTotal > greenCutoffs[k]) {
          grid.rows[i][j].state.green += greenChanges[k];
          break;
        }
      }
      if (grid.rows[i][j].state.green < 0) {
        grid.rows[i][j].state.green = 0;
      }
    }
  }
}

drawGrid(grid);
let timer = new Timer(
  () => {
    stepGrid(grid);
    drawGrid(grid);
  }
);