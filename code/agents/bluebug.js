class Bluebug extends Bug {
    constructor(isBaby) {
        super(isBaby);
        this.stomach = isBaby ? cec.bluebug.babyStomach : cec.bluebug.startStomach;
        this.direction = randInt(0, 3);
    }
    step(grid, agents, i, j) {
        super.step(grid, agents, i, j);
        if (!this.isStarved()) { // RIP bluebug if empty stomach, otherwise it moves instead of dies
            if (randInt(0, 1) <= 0) { // 50% chance that computation time will be devoted to "looking"
                super.doVision(grid, agents, i, j);
            }

            let destinationCell = grid.rows[mod(i + ORTH_SHIFTS_X[this.direction], grid.size)]
            [mod(j + ORTH_SHIFTS_Y[this.direction], grid.size)];
            if (destinationCell.agent === null) {
                destinationCell.agent = this;
                if (this.willReproduce) {
                let baby = new Bluebug(true);
                this.stomach = cec.bluebug.startStomach;
                this.direction = 0;
                grid.rows[i][j].agent = baby;
                agents.add(baby);
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

// Necessary because ES6 does not allow for static const fields inside of classes.
// Reference: https://stackoverflow.com/questions/32647215/declaring-static-constants-in-es6-classes
Object.defineProperty(Bluebug, 'statesToGraze', {value: ['blue'], writable : false, enumerable : true, configurable : false});
Object.defineProperty(Bluebug, 'grazeLimit', {value: cec.bluebug.grazeLimit, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Bluebug, 'metabolism', {value: cec.bluebug.metabolism, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Bluebug, 'birthFactor', {value: cec.bluebug.birthFactor, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Bluebug, 'visibleZones', {value: cec.bluebug.visibleZones, writable : false, enumerable : true, configurable : false});