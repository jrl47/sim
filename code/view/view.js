class View { // SINGLETON
    constructor() {
        if (!View.instance) {
            View.instance = this;
            this.gv = new GridView();
            this.av = new AgentInfoView();
            this.fv = new FunctionView();
        }
        return View.instance;
    }
    draw() {
        this.gv.drawGrid();
        this.av.drawInfo();
        this.fv.drawFunctions();
    }
    resetGrid(grid) {
        this.gv.clear();
        this.gv.grid = grid;
    }
}