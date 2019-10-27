class Bug extends Agent {
    constructor(isBaby) {
        super(isBaby);
    }
    doVision(grid, i, j) {
        for (let v = 0; v < this.constructor.visibleZones.length; v++) {
            if (!this.visionDone) {
                let a = this.constructor.visibleZones[v][0], b = this.constructor.visibleZones[v][1];
                for (let k = 0; k < SHIFT_INDEX[a][b].x.length; k++) {
                    if (grid.rows[mod(i + SHIFT_INDEX[a][b].x[k], grid.size)][mod(j + SHIFT_INDEX[a][b].y[k], grid.size)].agent !== null &&
                        grid.rows[mod(i + SHIFT_INDEX[a][b].x[k], grid.size)][mod(j + SHIFT_INDEX[a][b].y[k], grid.size)].agent instanceof Redmuncher) {
                        this.direction = runDirection(a, b)[k];
                        this.visionDone = true;
                    }
                }
            }
        }
    }
}