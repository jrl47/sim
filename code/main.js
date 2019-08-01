// Grid Setup
let gm = new GridMaker();
// let grid = gm.makeGridSetup0();
let grid = gm.makeGridSetup2();
let amp = new AgentMakerAndPutter();
let agents = amp.makeAgentConfig0();
amp.putAgentConfig0(grid, agents);

// View Setup
let gv = new GridView(grid);
let avm = new AgentInfoViewAndModel(agents);
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
let numExperiments = 0;
let maxExperiments = 25;
let blameRed = 0;
let blameGreen = 0
let blameBlue = 0;

let changes = -1; // "changes" object to modify experiment params

let timer = new Timer(
  () => {
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
      numSteps = 0;
      if (numExperiments < maxExperiments) {
        // grid = gm.makeGridSetup0();
        grid = gm.makeGridSetup2();
        agents = amp.makeAgentConfig0();
        amp.putAgentConfig0(grid, agents);

        gv.grid = grid;
        avm.agents = agents;
        gv.clear();

        stepper.grid = grid;
        stepper.agents = agents;
      } else {
        if (totalSteps/maxExperiments > maxSteps) {
          maxSteps = Math.floor(totalSteps/maxExperiments);
          // start again but with a "new" set of changes
          console.log(maxSteps);
          console.log(blameBlue);
          console.log(blameRed);
          timer.pause();
        } else {
          // "undo" the changes
        }
      }
    }
  }
);