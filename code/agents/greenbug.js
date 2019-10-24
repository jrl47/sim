class Greenbug extends Bug {
    constructor(isBaby) {
        super();
        this.done = isBaby;
        this.stomach = isBaby ? this.cec.greenbug.babyStomach : this.cec.greenbug.startStomach;
    }
    step(grid, bugs, i, j) {
        super.step();
        if (grid.rows[i][j].state.green > 0) {
            this.stomach += Math.min(this.cec.greenbug.grazeLimit, grid.rows[i][j].state.green);
            grid.rows[i][j].state.green -= Math.min(this.cec.greenbug.grazeLimit, grid.rows[i][j].state.green);
        }
        this.stomach -= this.cec.greenbug.metabolism;
        grid.rows[i][j].agent = null;
        let willReproduce = false;
        if (this.stomach > Math.pow(2, this.cec.birthFactorShift + this.cec.greenbug.birthFactor)) {
        willReproduce = true;
        }
        if (this.stomach > 0) { // RIP greenbug if empty stomach, otherwise it moves instead of dies
        let direction = randInt(0, 3);

        if (randInt(0, 1) <= 0) { // 50% chance that computation time will be devoted to "looking"
            // "Vision"
            let done = false;
            
            for (let v = 0; v < this.cec.greenbug.visibleZones.length; v++) {
            if (!done) {
                let i = this.cec.greenbug.visibleZones[v][0], j = this.cec.greenbug.visibleZones[v][1];
                for (let k = 0; k < SHIFT_INDEX[i][j].x.length; k++) {
                if (grid.rows[mod(i + SHIFT_INDEX[i][j].x[k], grid.size)][mod(j + SHIFT_INDEX[i][j].y[k], grid.size)].agent !== null &&
                    grid.rows[mod(i + SHIFT_INDEX[i][j].x[k], grid.size)][mod(j + SHIFT_INDEX[i][j].y[k], grid.size)].agent instanceof Redmuncher) {
                    direction = runDirection(i, j)[k];
                    done = true;
                }
                }
            }
            }
        }

        let destinationCell = grid.rows[mod(i + ORTH_SHIFTS_X[direction], grid.size)][mod(j + ORTH_SHIFTS_Y[direction], grid.size)];
        if (destinationCell.agent === null) {
            destinationCell.agent = this;
            if (willReproduce) {
            let baby = new Greenbug(true);
            this.vc.numGreenbugs++; // if this can be refactored then agents won't need vcs
            this.stomach = this.cec.greenbug.startStomach;
            grid.rows[i][j].agent = baby;
            bugs.push(baby);
            }
        } else {
            grid.rows[i][j].agent = this;
        }
        } else {
        this.dead = true;
        }
    }
}