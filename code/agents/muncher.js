class Muncher extends Agent {
    constructor() {
        super();
    }
    step(grid, agents, i, j) {
        let neighborCell = -1;
        let directionsToLookX = [ORTH_SHIFTS_X, DIAG_SHIFTS_X];
        let directionsToLookY = [ORTH_SHIFTS_Y, DIAG_SHIFTS_Y];
        for (let a = 0; a < directionsToLookX.length; a++) {
            for (let b = 0; b < directionsToLookX[a].length; b++) {
                neighborCell = grid.rows[mod(i + directionsToLookX[a][b], grid.size)][mod(j + directionsToLookY[a][b], grid.size)];
                let isEdible = false;
                if (neighborCell.agent !== null) {
                    for (let k = 0; k < this.bugsToEat.length; k++) {
                        if (neighborCell.agent instanceof this.bugsToEat[k]) {
                            isEdible = true;
                        }
                    }
                }
                if(isEdible === true) {
                    neighborCell.agent.dead = true; // got munched
                    this.stomach += neighborCell.agent.stomach/this.stomachFactor;
                    neighborCell.agent = null; // should this kind of thing be paired with the general death cleanup logic?
                }
            }
        }
        super.step(grid, agents, i, j);
    }
}