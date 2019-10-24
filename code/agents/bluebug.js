class Bluebug extends Bug {
    constructor(isBaby) {
        super();
        this.done = isBaby;
        this.stomach = isBaby ? this.cec.bluebug.babyStomach : this.cec.bluebug.startStomach;
        this.direction = randInt(0, 3);
    }
    step(grid, bugs, i, j) {
        super.step();
        if (grid.rows[i][j].state.blue > 0) {
            this.stomach += Math.min(this.cec.bluebug.grazeLimit, grid.rows[i][j].state.blue);
            grid.rows[i][j].state.blue -= Math.min(this.cec.bluebug.grazeLimit, grid.rows[i][j].state.blue);
        }
        this.stomach -= this.cec.bluebug.metabolism;
        grid.rows[i][j].agent = null;
        let willReproduce = false;
        if (this.stomach > Math.pow(2, this.cec.birthFactorShift + this.cec.bluebug.birthFactor)) {
            willReproduce = true;
        }
        if (this.stomach > 0) { // RIP bluebug if empty stomach, otherwise it moves instead of dies

        let direction = this.direction;

        if (randInt(0, 1) <= 0) { // 50% chance that computation time will be devoted to "looking"
            // "Vision"
            let done = false;

            for (let v = 0; v < this.cec.bluebug.visibleZones.length; v++) {
            if (!done) {
                let i = this.cec.bluebug.visibleZones[v][0], j = this.cec.bluebug.visibleZones[v][1];
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

        // console.log(grid + ' ' + mod(i + ORTH_SHIFTS_X[direction], grid.size) + ' '+  mod(j + ORTH_SHIFTS_Y[direction], grid.size));
        let destinationCell = grid.rows[mod(i + ORTH_SHIFTS_X[direction], grid.size)]
        [mod(j + ORTH_SHIFTS_Y[direction], grid.size)];
        if (destinationCell.agent === null) {
            destinationCell.agent = this;
            if (willReproduce) {
            let baby = new Bluebug(true);
            this.vc.numBluebugs++; // it seems unfortunate that this logic must live here for now
            this.stomach = this.cec.bluebug.startStomach;
            this.direction = 0;
            grid.rows[i][j].agent = baby;
            bugs.push(baby);
            }
        } else {
            grid.rows[i][j].agent = this;
            this.direction = randInt(0, 3);
        }
        } else {
        this.dead = true;
        }
    }
}