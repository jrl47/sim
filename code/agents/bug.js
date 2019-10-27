class Bug extends Agent {
    constructor(isBaby) {
        super(isBaby);
    }
    step(grid, agents, i, j) {
        super.startTurn(grid, i, j);
        super.eat(grid, agents, i, j);
        super.metabolize();
    }
    doVision(grid, agents, i, j) {
        // "Vision"
        let visionDone = false;
        
        for (let v = 0; v < this.constructor.visibleZones.length; v++) {
            if (!this.visionDone) {
                let i = this.constructor.visibleZones[v][0], j = this.constructor.visibleZones[v][1];
                for (let k = 0; k < SHIFT_INDEX[i][j].x.length; k++) {
                    if (grid.rows[mod(i + SHIFT_INDEX[i][j].x[k], grid.size)][mod(j + SHIFT_INDEX[i][j].y[k], grid.size)].agent !== null &&
                        grid.rows[mod(i + SHIFT_INDEX[i][j].x[k], grid.size)][mod(j + SHIFT_INDEX[i][j].y[k], grid.size)].agent instanceof Redmuncher) {
                        this.direction = runDirection(i, j)[k];
                        this.visionDone = true;
                    }
                }
            }
        }
    }
}