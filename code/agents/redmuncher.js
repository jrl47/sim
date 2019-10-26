class Redmuncher extends Muncher{
    constructor(isBaby) {
        super();
        this.done = isBaby;
        this.stomach = isBaby ? this.cec.redmuncher.babyStomach : this.cec.redmuncher.startStomach;
        this.statesToGraze = ['red'];
        this.bugsToEat = [Greenbug, Bluebug];
        this.grazeLimit = this.cec.redmuncher.grazeLimit;
        this.metabolism = this.cec.redmuncher.metabolism;
        this.birthFactor = this.cec.redmuncher.birthFactor;
        this.stomachFactor = this.cec.redmuncher.stomachFactor;
    }
    step(grid, agents, i, j) {
        super.step(grid, agents, i, j);
        if (this.stomach > 0) { // RIP redmuncher if empty stomach, otherwise it moves instead of dies
            this.direction = randInt(0, 3); // AI is same as unless it sees something

            // "Vision"
            let done = false;

            for (let v = 0; v < this.cec.redmuncher.fatigueVisibleZones.length; v++) {
                if (!done) {
                let i = this.cec.redmuncher.fatigueVisibleZones[v][0], j = this.cec.redmuncher.fatigueVisibleZones[v][1];
                for (let k = 0; k < SHIFT_INDEX[i][j].x.length; k++) {
                    if (grid.rows[mod(i + SHIFT_INDEX[i][j].x[k], grid.size)][mod(j + SHIFT_INDEX[i][j].y[k], grid.size)].agent !== null &&
                    grid.rows[mod(i + SHIFT_INDEX[i][j].x[k], grid.size)][mod(j + SHIFT_INDEX[i][j].y[k], grid.size)].agent instanceof Bluebug ||
                    grid.rows[mod(i + SHIFT_INDEX[i][j].x[k], grid.size)][mod(j + SHIFT_INDEX[i][j].y[k], grid.size)].agent instanceof Greenbug) {
                        this.direction = pursueDirection(i, j)[k];
                        done = true;
                    }
                }
                }
            }

            if (this.stomach > this.cec.redmuncher.fatigueThreshold) { // hq vision only happens if muncher is not too hungry
                for (let v = 0; v < this.cec.redmuncher.visibleZones.length; v++) {
                if (!done) {
                    let i = this.cec.redmuncher.visibleZones[v][0], j = this.cec.redmuncher.visibleZones[v][1];
                    for (let k = 0; k < SHIFT_INDEX[i][j].x.length; k++) {
                    if (grid.rows[mod(i + SHIFT_INDEX[i][j].x[k], grid.size)][mod(j + SHIFT_INDEX[i][j].y[k], grid.size)].agent !== null &&
                        grid.rows[mod(i + SHIFT_INDEX[i][j].x[k], grid.size)][mod(j + SHIFT_INDEX[i][j].y[k], grid.size)].agent instanceof Bluebug ||
                        grid.rows[mod(i + SHIFT_INDEX[i][j].x[k], grid.size)][mod(j + SHIFT_INDEX[i][j].y[k], grid.size)].agent instanceof Greenbug) {
                        this.direction = pursueDirection(i, j)[k];
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
                let baby = new Redmuncher(true);
                this.stomach = this.cec.redmuncher.startStomach;
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