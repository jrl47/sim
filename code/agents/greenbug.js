class Greenbug extends Bug {
    constructor(isBaby) {
        super(isBaby);
        this.stomach = isBaby ? cec.greenbug.babyStomach : cec.greenbug.startStomach;
    }
    step(grid, agents, i, j) {
        super.step(grid, agents, i, j);
        if (!this.isStarved()) {
            this.direction = randInt(0, 3); // unlike bluebugs, greenbugs randomize each turn by defualt.
            if (randInt(0, 1) <= 0) { // 50% chance that computation time will be devoted to "looking"
                super.doVision(grid, agents, i, j);
            }

            let destinationCell = grid.rows[mod(i + ORTH_SHIFTS_X[this.direction], grid.size)][mod(j + ORTH_SHIFTS_Y[this.direction], grid.size)];
            if (destinationCell.agent === null) {
                destinationCell.agent = this;
                if (this.willReproduce) {
                let baby = new Greenbug(true);
                this.stomach = cec.greenbug.startStomach;
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
Object.defineProperty(Greenbug, 'statesToGraze', {value: ['green'], writable : false, enumerable : true, configurable : false});
Object.defineProperty(Greenbug, 'grazeLimit', {value: cec.greenbug.grazeLimit, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Greenbug, 'metabolism', {value: cec.greenbug.metabolism, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Greenbug, 'birthFactor', {value: cec.greenbug.birthFactor, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Greenbug, 'visibleZones', {value: cec.greenbug.visibleZones, writable : false, enumerable : true, configurable : false});
