let timer = new Timer(7);

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
  stepper.step();
  if (timer.ticks % 250 === 0) {
    view.draw();
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