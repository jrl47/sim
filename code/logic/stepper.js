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
    doAgentLogic(agent) {
      agent.step(this.grid, this.agents);
    }
    step() {
        let neighborTotals = this.gooLogic.getNeighborTotals(this.grid);
        if (timer.ticks % 8 === 0) {
          // let start = Date.now();
          // console.log('goo');
          for(let i = 0; i < this.grid.size; i++) {
            for(let j = 0; j < this.grid.size; j++) {
                this.gooLogic.doGooLogic(this.grid, neighborTotals, i, j);
            }
          }
          // let end = Date.now();
          // console.log(end - start);
        }
        // console.log('bug');
        // let start = Date.now();

        this.agents.bugs.forEach((bug) => {
          this.doAgentLogic(bug);
        });

        this.agents.munchers.forEach((muncher) => {
          this.doAgentLogic(muncher);
        });

        this.agents.agents.forEach((agent, sameAgent, set) => {
          agent.done = false;
          if (agent.dead) {
            this.agents.delete(agent);
          }
        });
        // let end = Date.now();
        // console.log(end - start);
    }
}