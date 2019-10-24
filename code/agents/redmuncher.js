class Redmuncher extends Muncher{
    constructor(isBaby) {
        super();
        this.done = isBaby;
        this.stomach = isBaby ? this.cec.redmuncher.babyStomach : this.cec.redmuncher.startStomach;
    }
    step(grid, munchers, i, j) {
        super.step();
        if (grid.rows[i][j].state.red > 0) {
            this.stomach += Math.min(this.cec.redmuncher.grazeLimit, grid.rows[i][j].state.red);
            grid.rows[i][j].state.red -= Math.min(this.cec.redmuncher.grazeLimit, grid.rows[i][j].state.red);
        }
        let neighborCell = -1;
        for(let k = 0; k < 4; k++) {
            neighborCell = grid.rows[mod(i + ORTH_SHIFTS_X[k], grid.size)][mod(j + ORTH_SHIFTS_Y[k], grid.size)];
            if(neighborCell.agent !== null && (neighborCell.agent instanceof Greenbug || neighborCell.agent instanceof Bluebug)) {
                neighborCell.agent.dead = true; // got munched
                this.stomach += neighborCell.agent.stomach/this.cec.redmuncher.stomachFactor;
                neighborCell.agent = null; // should this kind of thing be paired with the general death cleanup logic?
            }
        }
        for(let k = 0; k < 4; k++) {
            neighborCell = grid.rows[mod(i + DIAG_SHIFTS_X[k], grid.size)][mod(j + DIAG_SHIFTS_Y[k], grid.size)];
            if(neighborCell.agent !== null && (neighborCell.agent instanceof Greenbug || neighborCell.agent instanceof Bluebug)) {
                neighborCell.agent.dead = true; // got munched
                this.stomach += neighborCell.agent.stomach/this.cec.redmuncher.stomachFactor;
                neighborCell.agent = null; // should this kind of thing be paired with the general death cleanup logic?
            }
        }

        this.stomach -= this.cec.redmuncher.metabolism;
        grid.rows[i][j].agent = null;
        let willReproduce = false;
        if (this.stomach > Math.pow(2, this.cec.birthFactorShift + this.cec.redmuncher.birthFactor)) {
        willReproduce = true;
        }
        if (this.stomach > 0) { // RIP redmuncher if empty stomach, otherwise it moves instead of dies
        let direction = randInt(0, 3); // AI is same as unless it sees something

        // "Vision"
        let done = false;

        for (let v = 0; v < this.cec.redmuncher.fatigueVisibleZones.length; v++) {
            if (!done) {
            let i = this.cec.redmuncher.fatigueVisibleZones[v][0], j = this.cec.redmuncher.fatigueVisibleZones[v][1];
            for (let k = 0; k < SHIFT_INDEX[i][j].x.length; k++) {
                if (grid.rows[mod(i + SHIFT_INDEX[i][j].x[k], grid.size)][mod(j + SHIFT_INDEX[i][j].y[k], grid.size)].agent !== null &&
                grid.rows[mod(i + SHIFT_INDEX[i][j].x[k], grid.size)][mod(j + SHIFT_INDEX[i][j].y[k], grid.size)].agent instanceof Bluebug ||
                grid.rows[mod(i + SHIFT_INDEX[i][j].x[k], grid.size)][mod(j + SHIFT_INDEX[i][j].y[k], grid.size)].agent instanceof Greenbug) {
                    direction = pursueDirection(i, j)[k];
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
                    direction = pursueDirection(i, j)[k];
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
            let baby = new Redmuncher(true);
            this.vc.numRedmunchers++; // it seems unfortunate that this logic must live here for now
            this.stomach = this.cec.redmuncher.startStomach;
            grid.rows[i][j].agent = baby;
            munchers.push(baby);
            }
        } else {
            grid.rows[i][j].agent = this;
        }
        } else {
        this.dead = true;
        }
    }
}