class Redmuncher extends Muncher{
    constructor(isBaby) {
        super();
        this.stomach = isBaby ? cec.redmuncher.babyStomach : cec.redmuncher.startStomach;
    }
    step(grid, agents, i, j) {
        super.step(grid, agents, i, j);
        if (!this.isStarved()) { // RIP redmuncher if empty stomach, otherwise it moves instead of dies
            this.direction = randInt(0, 3); // AI is same as unless it sees something
            let visionDone = false;

            for (let v = 0; v < this.constructor.fatigueVisibleZones.length; v++) {
                if (!visionDone) {
                let i = this.constructor.fatigueVisibleZones[v][0], j = this.constructor.fatigueVisibleZones[v][1];
                for (let k = 0; k < SHIFT_INDEX[i][j].x.length; k++) {
                    if (grid.rows[mod(i + SHIFT_INDEX[i][j].x[k], grid.size)][mod(j + SHIFT_INDEX[i][j].y[k], grid.size)].agent !== null &&
                    grid.rows[mod(i + SHIFT_INDEX[i][j].x[k], grid.size)][mod(j + SHIFT_INDEX[i][j].y[k], grid.size)].agent instanceof Bluebug ||
                    grid.rows[mod(i + SHIFT_INDEX[i][j].x[k], grid.size)][mod(j + SHIFT_INDEX[i][j].y[k], grid.size)].agent instanceof Greenbug) {
                        this.direction = pursueDirection(i, j)[k];
                        visionDone = true;
                    }
                }
                }
            }

            if (visionDone) {
                super.doVision(grid, agents, i, j);
            }


            let destinationCell = grid.rows[mod(i + ORTH_SHIFTS_X[this.direction], grid.size)][mod(j + ORTH_SHIFTS_Y[this.direction], grid.size)];
            if (destinationCell.agent === null) {
                destinationCell.agent = this;
                if (this.willReproduce) {
                let baby = new Redmuncher(true);
                this.stomach = cec.redmuncher.startStomach;
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

// Necessary because ES6 does not allow for static const fields inside of classes.
// Reference: https://stackoverflow.com/questions/32647215/declaring-static-constants-in-es6-classes
Object.defineProperty(Redmuncher, 'statesToGraze', {value: ['red'], writable : false, enumerable : true, configurable : false});
Object.defineProperty(Redmuncher, 'bugsToEat', {value: [Greenbug, Bluebug], writable : false, enumerable : true, configurable : false});
Object.defineProperty(Redmuncher, 'grazeLimit', {value: cec.redmuncher.grazeLimit, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Redmuncher, 'metabolism', {value: cec.redmuncher.metabolism, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Redmuncher, 'birthFactor', {value: cec.redmuncher.birthFactor, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Redmuncher, 'stomachFactor', {value: cec.redmuncher.stomachFactor, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Redmuncher, 'visibleZones', {value: cec.redmuncher.visibleZones, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Redmuncher, 'fatigueThreshold', {value: cec.redmuncher.fatigueThreshold, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Redmuncher, 'fatigueVisibleZones', {value: cec.redmuncher.fatigueVisibleZones, writable : false, enumerable : true, configurable : false});