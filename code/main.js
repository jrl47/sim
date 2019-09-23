// Grid Setup
let gm = new GridMaker();
let grid = gm.makeGridSetupA();
// let grid = gm.makeGridSetup0();
// let grid = gm.makeGridSetup1();
// let grid = gm.makeGridSetup2();
let amp = new AgentMakerAndPutter();
let agents = amp.makeAgentConfig0();
amp.putAgentConfig0(grid, agents);

// View Setup
let gv = new GridView(grid);
let avm = new AgentInfoViewAndModel();
let draw = function() {
  gv.drawGrid();
  avm.drawInfo();
}

// Engine Setup
let stepper = new Stepper(grid, agents);

// Need this to access # of each critter
let vc = new ViewControl();

// startup
draw();
let numSteps = 0;
let totalSteps = 0;
let maxSteps = 0;
let maxAvgSteps = 0;
let numExperiments = 0;
let maxExperiments = 10;

let blameRed = 0;
let blameGreen = 0
let blameBlue = 0;

let currentMaxRed = 0;
let currentMaxGreen = 0;
let currentMaxBlue = 0;
let maxRed = 0;
let maxGreen = 0;
let maxBlue = 0;

let changes = -1; // "changes" object to modify experiment params

let timer = new Timer(
  () => {
    if (vc.numRedmunchers > currentMaxRed) {
      currentMaxRed = vc.numRedmunchers;
    }
    if (vc.numGreenbugs > currentMaxGreen) {
      currentMaxGreen = vc.numGreenbugs;
    }
    if (vc.numBluebugs > currentMaxBlue) {
      currentMaxBlue = vc.numBluebugs;
    }
    if (vc.numGreenbugs !== 0 && vc.numBluebugs !== 0 && vc.numRedmunchers !== 0) {
      stepper.step();
      draw();
      numSteps++;
      if (numSteps % 10000 === 0) {
        console.log(numSteps);
      }
    } else {

      if (vc.numRedmunchers === 0) {
        blameRed++;
      }
      if (vc.numGreenbugs === 0) {
        blameGreen++;
      }
      if (vc.numBluebugs === 0) {
        blameBlue++;
      }

      numExperiments++;
      totalSteps += numSteps;
      console.log(numSteps);
      console.log('red? ' + (blameRed));
      console.log('green? ' + (blameGreen));
      console.log('blue? ' + (blameBlue));

      maxRed += currentMaxRed;
      maxGreen += currentMaxGreen;
      maxBlue += currentMaxBlue;
      currentMaxRed = 0;
      currentMaxGreen = 0;
      currentMaxBlue = 0;

      if (numSteps > maxSteps) {
        maxSteps = numSteps;
      }

      numSteps = 0;
      if (numExperiments < maxExperiments) {
        let grid = gm.makeGridSetupA();
        // let grid = gm.makeGridSetup0();
        // grid = gm.makeGridSetup1();
        // grid = gm.makeGridSetup2();
        agents = amp.makeAgentConfig0();
        amp.putAgentConfig0(grid, agents);

        gv.grid = grid;
        gv.clear();

        stepper.grid = grid;
        stepper.agents = agents;
      } else {
        if (totalSteps/maxExperiments > maxAvgSteps) {
          maxAvgSteps = Math.floor(totalSteps/maxExperiments);
          // start again but with a "new" set of changes
          console.log('Maximum Number of Steps: ' + maxSteps);
          console.log('Average Number of Steps: ' + maxAvgSteps);
          console.log('Max Redmuncher Population: ' + maxRed/maxExperiments);
          console.log('Max Greenbug Population: ' + maxGreen/maxExperiments);
          console.log('Max Bluebug Population: ' + maxBlue/maxExperiments);
          timer.pause();
        } else {
          // "undo" the changes
        }
      }
    }
  }
);