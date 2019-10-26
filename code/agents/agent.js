class Agent {
    constructor() {
        this.done = false;
        this.cec = new CurrentExperimentConstants();
    }
    step(grid, agents, i, j) {
        this.done = true;
        for (let k = 0; k < this.statesToGraze.length; k++) {
            if (grid.rows[i][j].state[this.statesToGraze[k]] > 0) {
                this.stomach += Math.min(this.grazeLimit, grid.rows[i][j].state[this.statesToGraze[k]]);
                grid.rows[i][j].state[this.statesToGraze[k]] -= Math.min(this.grazeLimit, grid.rows[i][j].state[this.statesToGraze[k]]);
            }
        }
        this.stomach -= this.metabolism;
        grid.rows[i][j].agent = null;

        this.willReproduce = false;
        if (this.stomach > Math.pow(2, this.cec.birthFactorShift + this.birthFactor)) {
            this.willReproduce = true;
        }
    }
}