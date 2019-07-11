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
    done: false,
    stomach: 100
  },
  {
    done: false,
    stomach: 100
  },
  {
    done: false,
    stomach: 100
  },
  {
    done: false,
    stomach: 100
  }
];

grid.rows[10][10].agents.greenbug = agents[0];
grid.rows[17][3].agents.greenbug = agents[1];
grid.rows[27][13].agents.greenbug = agents[2];
grid.rows[21][19].agents.greenbug = agents[3];


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
        if (grid.rows[i][j].agents.greenbug !== null) {
          let greenbug = grid.rows[i][j].agents.greenbug;
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
  // console.log(agents.length);
  neighborTotals = getNeighborTotals(grid);
  for(let i = 0; i < grid.size; i++) {
    for(let j = 0; j < grid.size; j++) {
      doGooLogic(grid, neighborTotals, i, j);

      // TODO adjust this logic to ensure there can only be one agent and just make classes for Agents
      if (grid.rows[i][j].agents.greenbug !== null && grid.rows[i][j].agents.greenbug.done === false) {
        let greenbug = grid.rows[i][j].agents.greenbug;
        greenbug.done = true;
        if (grid.rows[i][j].state.green > 0) {
          greenbug.stomach += Math.min(52, grid.rows[i][j].state.green);
          grid.rows[i][j].state.green -= Math.min(60, grid.rows[i][j].state.green);
        }
        greenbug.stomach -= 14;
        grid.rows[i][j].agents.greenbug = null;
        let willReproduce = false;
        if (greenbug.stomach > 255) {
          willReproduce = true;
        }
        if (greenbug.stomach > 0) { // RIP greenbug if empty stomach, otherwise it moves instead of dies
          let direction = randInt(0, 3);
          let destinationCell = grid.rows[mod(i + ORTH_SHIFTS_X[direction], grid.size)][mod(j + ORTH_SHIFTS_Y[direction], grid.size)];
          if (destinationCell.agents.greenbug === null) {
            destinationCell.agents.greenbug = greenbug;
            if (willReproduce) {
              let baby = {
                done: true, // "summoning sickness!"
                stomach: 100
              };
              greenbug.stomach = 100;
              grid.rows[i][j].agents.greenbug = baby;
              agents.push(baby);
            }
          } else {
            grid.rows[i][j].agents.greenbug = greenbug;
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