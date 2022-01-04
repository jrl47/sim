let timer = new Timer(8);

let grid = -1;
let agents = -1;

// Setup
let setup = new Setup();
let setupGridAndAgents = () => {
  grid = setup.grid();
  agents = setup.agents();
  setup.populate(grid, agents);
};
setupGridAndAgents();


// View Setup
let view = new View(grid);
view.draw();


// Engine Setup
let stepper = new Stepper(grid, agents);
let doStep = () => {
  // let start = Date.now();
  // console.log('STEP');
  stepper.step();
  // let end = Date.now();
  // console.log(end - start);
  if (timer.ticks % 200 === 0) {
    // start = Date.now();
    // console.log('VIEW');
    view.draw();
    // end = Date.now();
    // console.log(end - start);
  }
};
// timer.addTickCallback(() => {doStep()});


// Experimenter Setup
let doReset = () => {
  setupGridAndAgents();
  view.resetGrid(grid);
  stepper.resetGridAndAgents(grid, agents);
};
let experimenter = new Experimenter(doStep, doReset);
timer.addTickCallback(() => {experimenter.proceed()});