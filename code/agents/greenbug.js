class Greenbug extends Bug {
    constructor(isBaby) {
        super();
        this.done = isBaby;
        this.stomach = isBaby ? this.cec.greenbug.babyStomach : this.cec.greenbug.startStomach;
        this.statesToGraze = ['green'];
        this.grazeLimit = this.cec.greenbug.grazeLimit;
        this.metabolism = this.cec.greenbug.metabolism;
        this.birthFactor = this.cec.greenbug.birthFactor;
    }
    step(grid, agents, i, j) {
        super.step(grid, agents, i, j);
        if (this.stomach > 0) { // RIP greenbug if empty stomach, otherwise it moves instead of dies
            this.direction = randInt(0, 3);

            if (randInt(0, 1) <= 0) { // 50% chance that computation time will be devoted to "looking"
                // "Vision"
                let done = false;
                
                for (let v = 0; v < this.cec.greenbug.visibleZones.length; v++) {
                if (!done) {
                    let i = this.cec.greenbug.visibleZones[v][0], j = this.cec.greenbug.visibleZones[v][1];
                    for (let k = 0; k < SHIFT_INDEX[i][j].x.length; k++) {
                    if (grid.rows[mod(i + SHIFT_INDEX[i][j].x[k], grid.size)][mod(j + SHIFT_INDEX[i][j].y[k], grid.size)].agent !== null &&
                        grid.rows[mod(i + SHIFT_INDEX[i][j].x[k], grid.size)][mod(j + SHIFT_INDEX[i][j].y[k], grid.size)].agent instanceof Redmuncher) {
                        this.direction = runDirection(i, j)[k];
                        done = true;
                    }
                    }
                }
                }
            }

            let destinationCell = grid.rows[mod(i + ORTH_SHIFTS_X[this.direction], grid.size)][mod(j + ORTH_SHIFTS_Y[this.direction], grid.size)];
            if (destinationCell.agent === null) {
                destinationCell.agent = this;
                if (this.willReproduce) {
                let baby = new Greenbug(true);
                this.stomach = this.cec.greenbug.startStomach;
                grid.rows[i][j].agent = baby;
                agents.add(baby);
                }
            } else {
                grid.rows[i][j].agent = this;
            }
        } else {
            this.dead = true;
        }
    }
}