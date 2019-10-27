class Muncher extends Agent {
    constructor(isBaby) {
        super(isBaby);
    }
    munch(grid, i, j) {
        let neighborCell = -1;
        let directionsToLookX = [ORTH_SHIFTS_X, DIAG_SHIFTS_X];
        let directionsToLookY = [ORTH_SHIFTS_Y, DIAG_SHIFTS_Y];
        for (let a = 0; a < directionsToLookX.length; a++) {
            for (let b = 0; b < directionsToLookX[a].length; b++) {
                neighborCell = grid.rows[mod(i + directionsToLookX[a][b], grid.size)][mod(j + directionsToLookY[a][b], grid.size)];
                let isEdible = false;
                if (neighborCell.agent !== null) {
                    for (let k = 0; k < this.constructor.bugsToEat.length; k++) {
                        if (neighborCell.agent instanceof this.constructor.bugsToEat[k]) {
                            isEdible = true;
                        }
                    }
                }
                if(isEdible === true) {
                    neighborCell.agent.dead = true; // got munched
                    this.stomach += neighborCell.agent.stomach/this.constructor.stomachFactor;
                    neighborCell.agent = null; // should this kind of thing be paired with the general death cleanup logic?
                }
            }
        }
    }
    doFatiguedVision(grid, i, j) {
        for (let v = 0; v < this.constructor.fatigueVisibleZones.length; v++) {
            if (!this.visionDone) {
            let a = this.constructor.fatigueVisibleZones[v][0], b = this.constructor.fatigueVisibleZones[v][1];
            for (let k = 0; k < SHIFT_INDEX[a][b].x.length; k++) {
                if (grid.rows[mod(i + SHIFT_INDEX[a][b].x[k], grid.size)][mod(j + SHIFT_INDEX[a][b].y[k], grid.size)].agent !== null &&
                grid.rows[mod(i + SHIFT_INDEX[a][b].x[k], grid.size)][mod(j + SHIFT_INDEX[a][b].y[k], grid.size)].agent instanceof Bluebug ||
                grid.rows[mod(i + SHIFT_INDEX[a][b].x[k], grid.size)][mod(j + SHIFT_INDEX[a][b].y[k], grid.size)].agent instanceof Greenbug) {
                    this.direction = pursueDirection(a, b)[k];
                    this.visionDone = true;
                }
            }
            }
        }
    }
    doVision(grid, i, j) {
            for (let v = 0; v < this.constructor.visibleZones.length; v++) {
            if (!this.visionDone) {
                let a = this.constructor.visibleZones[v][0], b = this.constructor.visibleZones[v][1];
                for (let k = 0; k < SHIFT_INDEX[a][b].x.length; k++) {
                if (grid.rows[mod(i + SHIFT_INDEX[a][b].x[k], grid.size)][mod(j + SHIFT_INDEX[a][b].y[k], grid.size)].agent !== null &&
                    grid.rows[mod(i + SHIFT_INDEX[a][b].x[k], grid.size)][mod(j + SHIFT_INDEX[a][b].y[k], grid.size)].agent instanceof Bluebug ||
                    grid.rows[mod(i + SHIFT_INDEX[a][b].x[k], grid.size)][mod(j + SHIFT_INDEX[a][b].y[k], grid.size)].agent instanceof Greenbug) {
                    this.direction = pursueDirection(a, b)[k];
                    this.visionDone = true;
                }
                }
            }
        }
    }
}