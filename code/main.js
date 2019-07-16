// Grid Setup
let gm = new GridMaker();
let grid = gm.makeGridSetup0();
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

// startup
draw();
let timer = new Timer(
  () => {
    stepper.step();
    draw();
  }
);