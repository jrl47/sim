function mod(number, modulus) {
  return ((number%modulus)+modulus)%modulus;
}

function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let showGreenGrass = true;
let greenGrassButton = new Button("greenGrass");
greenGrassButton.initialize(
  'greenGrass',
  () => { showGreenGrass = !showGreenGrass; }
);
let showBlueGrass = true;
let blueGrassButton = new Button("blueGrass");
blueGrassButton.initialize(
  'blueGrass',
  () => { showBlueGrass = !showBlueGrass; }
);
let showRedGrass = true;
let redGrassButton = new Button("redGrass");
redGrassButton.initialize(
  'redGrass',
  () => { showRedGrass = !showRedGrass; }
);
let showGreenbug = true;
let greenbugButton = new Button("greenbug");
greenbugButton.initialize(
  'greenbug',
  () => { showGreenbug = !showGreenbug; }
);
let showBluebug = true;
let bluebugButton = new Button("bluebug");
bluebugButton.initialize(
  'bluebug',
  () => { showBluebug = !showBluebug; }
);
let showRedmuncher = true;
let redmuncherButton = new Button("redmuncher");
redmuncherButton.initialize(
  'redmuncher',
  () => { showRedmuncher = !showRedmuncher; }
);

let numGreenbugsDisplay = document.getElementById("numGreenbugsDisplay");
let numBluebugsDisplay = document.getElementById("numBluebugsDisplay");
let numRedmunchersDisplay = document.getElementById("numRedmunchersDisplay");

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var grid = new Grid(60);
for (let i = 0; i < grid.size; i++) {
  for (let j = 0; j < grid.size; j++) {
    grid.rows[i][j].state.blue = randInt(0, 255);
    // grid.rows[i][j].state.green = randInt(0, 0);
    grid.rows[i][j].state.green = randInt(0, 255);
    grid.rows[i][j].state.red = randInt(0, 255);
  }
}

let NUM_INITIAL_GREENBUGS = 16;
let NUM_INITIAL_BLUEBUGS = 24;
let NUM_INITIAL_REDMUNCHERS = 5;

let numGreenbugs = NUM_INITIAL_GREENBUGS;
let numBluebugs = NUM_INITIAL_BLUEBUGS;
let numRedmunchers = NUM_INITIAL_REDMUNCHERS;

let agents = [];

for (let i = 0; i < NUM_INITIAL_GREENBUGS; i++) {
  agents.push({
    type: 'greenbug',
    done: false,
    stomach: 80
  })
}
for (let i = 0; i < NUM_INITIAL_BLUEBUGS; i++) {
  agents.push({
    type: 'bluebug',
    done: false,
    stomach: 120,
    direction: 1
  })
}
for (let i = 0; i < NUM_INITIAL_REDMUNCHERS; i++) {
  agents.push({
    type: 'redmuncher',
    done: false,
    stomach: 900
  })
}

for (let i = 0; i < agents.length; i++) {
  let x = randInt(0, grid.size - 1);
  let y = randInt(0, grid.size - 1);
  while (grid.rows[x][y].agent !== null) {
    x = randInt(0, grid.size);
    y = randInt(0, grid.size);
  }
  grid.rows[x][y].agent = agents[i];
}

// grid.rows[10][10].agent = agents[0];
// grid.rows[29][2].agent = agents[1];
// grid.rows[22][18].agent = agents[2];
// grid.rows[5][26].agent = agents[3];
// grid.rows[19][19].agent = agents[4];


drawGrid = function(grid) {
    for(let i = 0; i < grid.size; i++) {
      for(let j = 0; j < grid.size; j++) {
        let redGrass = showRedGrass ? grid.rows[i][j].state.red : 0;
        let greenGrass = showGreenGrass ? grid.rows[i][j].state.green : 0;
        let blueGrass = showBlueGrass ? grid.rows[i][j].state.blue : 0;
        ctx.fillStyle = "rgb(" + (255 - blueGrass - greenGrass) + ", " +
          (255 - blueGrass - redGrass) + ", " +
          (255 - greenGrass - redGrass) + ")";
        ctx.fillRect(i * 30 + 1, j * 30 + 1, 29, 29);

        if (showGreenbug && grid.rows[i][j].agent != null && grid.rows[i][j].agent.type === 'greenbug') {
          let greenbug = grid.rows[i][j].agent;
          let shade = greenbug.stomach;
          ctx.fillStyle = "rgb(0, 140, 0)";
          ctx.fillRect(i * 30 + 8, j * 30 + 8, 15, 15);
          ctx.fillStyle = "rgb(0, " + shade/2 + ", 0)";
          ctx.fillRect(i * 30 + 11, j * 30 + 11, 9, 9);
        } else if (showBluebug && grid.rows[i][j].agent != null && grid.rows[i][j].agent.type === 'bluebug') {
          let bluebug = grid.rows[i][j].agent;
          let shade = bluebug.stomach;
          ctx.fillStyle = "rgb(0, 0, 140)";
          ctx.fillRect(i * 30 + 8, j * 30 + 8, 15, 15);
          ctx.fillStyle = "rgb(0, 0, " + shade/2 + ")";
          ctx.fillRect(i * 30 + 11, j * 30 + 11, 9, 9);
        } else if (showRedmuncher && grid.rows[i][j].agent != null && grid.rows[i][j].agent.type === 'redmuncher') {
          let redmuncher = grid.rows[i][j].agent;
          let shade = redmuncher.stomach;
          ctx.fillStyle = "rgb(140, 0, 0)";
          ctx.fillRect(i * 30 + 8, j * 30 + 8, 15, 15);
          ctx.fillStyle = "rgb(" + shade/4 + ", 0, 0)";
          ctx.fillRect(i * 30 + 11, j * 30 + 11, 9, 9);
        }

      }
    }
};

drawInfo = function() {
  numGreenbugsDisplay.textContent = '# of greenbugs: ' + numGreenbugs;
  numBluebugsDisplay.textContent = '# of bluebugs: ' + numBluebugs;
  numRedmunchersDisplay.textContent = '# of redmunchers: ' + numRedmunchers;
}

stepGrid = function(grid) {
  neighborTotals = getNeighborTotals(grid);
  for(let i = 0; i < grid.size; i++) {
    for(let j = 0; j < grid.size; j++) {
      doGooLogic(grid, neighborTotals, i, j);
      doBugLogic(grid, agents, i, j);
      doMuncherLogic(grid, agents, i, j); // MUST come after bug logic unless we want to worry about removal order
    }
  }
  for (let a = 0; a < agents.length; a++) {
    agents[a].done = false;
    if (agents[a].dead) {
      if (agents[a].type === "greenbug") {
        numGreenbugs--;
      } else if (agents[a].type === "bluebug") {
        numBluebugs--;
      } else if (agents[a].type === "redmuncher") {
        numRedmunchers--;
      } else {

      }
      agents.splice(a, 1);
      a--;
    }
  }
}

draw = function(grid) {
  drawGrid(grid);
  drawInfo();
}

draw(grid);
let timer = new Timer(
  () => {
    stepGrid(grid);
    draw(grid);
  }
);