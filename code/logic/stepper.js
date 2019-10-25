class Stepper {
    constructor(grid, agents) {
        if (!Stepper.instance) {
            Stepper.instance = this;
            this.grid = grid;
            this.agents = agents;
            this.gooLogic = new GooLogic();
        }
        return Stepper.instance;
    }
    resetGridAndAgents(grid, agents) {
      this.grid = grid;
      this.agents = agents;
    }
    doBugLogic(i, j) {
      if (this.grid.rows[i][j].agent !== null && this.grid.rows[i][j].agent.done === false && this.grid.rows[i][j].agent instanceof Bug) {
          this.grid.rows[i][j].agent.step(this.grid, this.agents, i, j);
      }
    }
    doMuncherLogic(i, j) {
      if (this.grid.rows[i][j].agent !== null && this.grid.rows[i][j].agent.done === false && this.grid.rows[i][j].agent instanceof Muncher) {
        this.grid.rows[i][j].agent.step(this.grid, this.agents, i, j);
      }
    }
    step() {
        let neighborTotals = this.gooLogic.getNeighborTotals(this.grid);
        for(let i = 0; i < this.grid.size; i++) {
            for(let j = 0; j < this.grid.size; j++) {
                this.gooLogic.doGooLogic(this.grid, neighborTotals, i, j);
                this.doBugLogic(i, j);
                this.doMuncherLogic(i, j);
            }
        }
        this.agents.agents.forEach((agent, sameAgent, set) => {
          agent.done = false;
          if (agent.dead) {
            this.agents.delete(agent);
          }
        });
    }
}