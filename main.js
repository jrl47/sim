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
    type: 'greenbug',
    done: false,
    stomach: 100
  },
  {
    type: 'greenbug',
    done: false,
    stomach: 100
  }
];

grid.rows[10][10].agent = agents[0];
grid.rows[17][3].agent = agents[1];
grid.rows[27][13].agent = agents[2];


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
          ctx.fillStyle = "rgb(0, 0, 0)";
          ctx.fillRect(i * 30 + 6, j * 30 + 6, 19, 19);
          ctx.fillStyle = "rgb(0, " + shade + ", 0)";
          // ctx.fillStyle = "rgb(" + (255 - blueGrass - greenGrass) + ", " +
          //   (255 - blueGrass - redGrass) + ", " +
          //   (255 - greenGrass - redGrass) + ")";
          ctx.fillRect(i * 30 + 10, j * 30 + 10, 11, 11);
        }
      }
    }
};

stepGrid = function(grid) {
  neighborTotals = getNeighborTotals(grid);
  for(let i = 0; i < grid.size; i++) {
    for(let j = 0; j < grid.size; j++) {
      doGooLogic(grid, neighborTotals, i, j);

      if (grid.rows[i][j].agent !== null && grid.rows[i][j].agent.type === 'greenbug' &&
        grid.rows[i][j].agent.done === false) {

        let greenbug = grid.rows[i][j].agent;
        greenbug.done = true;
        if (grid.rows[i][j].state.green > 0) {
          greenbug.stomach += Math.min(50, grid.rows[i][j].state.green);
          grid.rows[i][j].state.green -= Math.min(60, grid.rows[i][j].state.green);
        }
        greenbug.stomach -= 14;
        grid.rows[i][j].agent = null;
        let willReproduce = false;
        if (greenbug.stomach > 255) {
          willReproduce = true;
        }
        if (greenbug.stomach > 0) { // RIP greenbug if empty stomach, otherwise it moves instead of dies
          let direction = randInt(0, 3);
          let destinationCell = grid.rows[mod(i + ORTH_SHIFTS_X[direction], grid.size)][mod(j + ORTH_SHIFTS_Y[direction], grid.size)];
          if (destinationCell.agent === null) {
            destinationCell.agent = greenbug;
            if (willReproduce) {
              let baby = {
                type: 'greenbug',
                done: true, // "summoning sickness!"
                stomach: 100
              };
              greenbug.stomach = 100;
              grid.rows[i][j].agent = baby;
              agents.push(baby);
            }
          } else {
            grid.rows[i][j].agent = greenbug;
          }
        } else {
          greenbug.dead = true;
        }
      }
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