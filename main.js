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

var agents = [
  {
    type: 'greenbug',
    done: false,
    stomach: 100
  },
  {
    type: 'bluebug',
    done: false,
    stomach: 100,
    direction: 0
  }
];

grid.rows[10][10].agent = agents[0];
grid.rows[16][18].agent = agents[1];


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

        if (grid.rows[i][j].agent != null && grid.rows[i][j].agent.type === 'greenbug') {
          let greenbug = grid.rows[i][j].agent;
          let shade = greenbug.stomach;
          ctx.fillStyle = "rgb(0, 140, 0)";
          ctx.fillRect(i * 30 + 8, j * 30 + 8, 15, 15);
          ctx.fillStyle = "rgb(0, " + shade/2 + ", 0)";
          ctx.fillRect(i * 30 + 11, j * 30 + 11, 9, 9);
        } else if (grid.rows[i][j].agent != null && grid.rows[i][j].agent.type === 'bluebug') {
          let bluebug = grid.rows[i][j].agent;
          let shade = bluebug.stomach;
          ctx.fillStyle = "rgb(0, 0, 140)";
          ctx.fillRect(i * 30 + 8, j * 30 + 8, 15, 15);
          ctx.fillStyle = "rgb(0, 0, " + shade/2 + ")";
          ctx.fillRect(i * 30 + 11, j * 30 + 11, 9, 9);
        }

      }
    }
};

stepGrid = function(grid) {
  neighborTotals = getNeighborTotals(grid);
  for(let i = 0; i < grid.size; i++) {
    for(let j = 0; j < grid.size; j++) {
      doGooLogic(grid, neighborTotals, i, j);
      doBugLogic(grid, agents, i, j);
    }
  }
  for (let a = 0; a < agents.length; a++) {
    agents[a].done = false;
    if (agents[a].dead) {
      agents.splice(a, 1);
      a--;
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