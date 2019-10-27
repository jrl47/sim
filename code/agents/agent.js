class Agent {
    constructor(isBaby) {
        this.done = isBaby;
    }
    startTurn(grid, i, j) {
        this.done = true;
        grid.rows[i][j].agent = null;
    }
    eat(grid, agents, i, j) {
        for (let k = 0; k < this.constructor.statesToGraze.length; k++) {
            if (grid.rows[i][j].state[this.constructor.statesToGraze[k]] > 0) {
                this.stomach += Math.min(this.constructor.grazeLimit, grid.rows[i][j].state[this.constructor.statesToGraze[k]]);
                grid.rows[i][j].state[this.constructor.statesToGraze[k]] -=
                    Math.min(this.constructor.grazeLimit, grid.rows[i][j].state[this.constructor.statesToGraze[k]]);
            }
        }
    }
    metabolize() {
        this.stomach -= this.constructor.metabolism;
        this.willReproduce = false;
        if (this.stomach > Math.pow(2, this.constructor.birthFactorShift + this.constructor.birthFactor)) {
            this.willReproduce = true;
        }
    }
    isStarved() {
        return this.stomach < 0;
    }
}
Object.defineProperty(Agent, 'birthFactorShift', {value: cec.birthFactorShift, writable : false, enumerable : true, configurable : false});