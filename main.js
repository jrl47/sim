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

var grid = new Grid(30);
for (let i = 0; i < grid.size; i++) {
  for (let j = 0; j < grid.size; j++) {
    grid.rows[i][j].state.blue = randInt(0, 255);
    grid.rows[i][j].state.green = randInt(0, 255);
    grid.rows[i][j].state.red = randInt(0, 255);
  }
}

grid.rows[10][10].agents.push('greenbug');

drawGrid = function(grid) {
    for(let i = 0; i < grid.size; i++) {
      for(let j = 0; j < grid.size; j++) {
        // let redGrass = 0;
        let redGrass = grid.rows[i][j].state.red;
        // let greenGrass = 0;
        let greenGrass = grid.rows[i][j].state.green;
        // let blueGrass = 0;
        let blueGrass = grid.rows[i][j].state.blue;
        ctx.fillStyle = "rgb(" + (255 - blueGrass - greenGrass) + ", " +
          (255 - blueGrass - redGrass) + ", " +
          (255 - greenGrass - redGrass) + ")";
        ctx.fillRect(i * 30 + 1, j * 30 + 1, 29, 29);
      }
    }
};

stepGrid = function(grid) {
  neighborTotals = getNeighborTotals(grid);
  for(let i = 0; i < grid.size; i++) {
    for(let j = 0; j < grid.size; j++) {
      doGooLogic(grid, neighborTotals, i, j);
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