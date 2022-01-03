class Agent {
    constructor(isBaby) {
        this.done = isBaby;
        this.i = -1;
        this.j = -1;
        this.prevI = -1;
        this.prevJ = -1;
    }
    // the populator or birthing agent must set the location in order for the Agent to be ready.
    setLocation(i, j) {
        this.prevI = this.i;
        this.prevJ = this.j;
        this.i = i;
        this.j = j;
    }
    step(grid, agents) {
        this.startTurn(grid);

        this.eat(grid);
        if (this instanceof Muncher) {
            this.munch(grid);
        }

        this.metabolize();
        if (this.isStarved()) {
            this.dead = true;
        } else {
            if (this instanceof Greenbug || this instanceof Redmuncher) {
                this.direction = randInt(0, 3);
            }

            this.visionDone = false;
            if (this instanceof Greenbug) {
                if (randInt(0, 12) <= 11) {
                    this.doVision(grid);
                }
            } else if (this instanceof Bluebug) {
                if (randInt(0, 4) <= 0) {
                    this.doVision(grid);
                }
            } else if (this instanceof Muncher) {
                this.doFatiguedVision(grid);
                if (this.stomach > this.constructor.fatigueThreshold) {
                    this.doVision(grid);
                }
            }

            if (this.move(grid)) { // can't reproduce if it was blocked
                if (this.willReproduce) {
                    this.reproduce(grid, agents);
                    if (this instanceof Bluebug) {
                        this.direction = randInt(0, 3);
                    }
                }
            } else {
                if (this instanceof Bluebug) { // non-Bluebugs change every time anyway
                    this.direction = randInt(0, 3);
                }
            }
        }
    }
    startTurn(grid) {
        this.done = true;
        // console.log(grid);
        // console.log(this.i);
        // console.log(this.j);
        grid.rows[this.i][this.j].agent = null;
    }
    eat(grid) {
        for (let k = 0; k < this.constructor.statesToGraze.length; k++) {
            if (grid.rows[this.i][this.j].state[this.constructor.statesToGraze[k]] > 0) {
                this.stomach += Math.min(this.constructor.grazeLimit, grid.rows[this.i][this.j].state[this.constructor.statesToGraze[k]]);
                grid.rows[this.i][this.j].state[this.constructor.statesToGraze[k]] -=
                    Math.min(this.constructor.grazeLimit, grid.rows[this.i][this.j].state[this.constructor.statesToGraze[k]]);
            }
        }
    }
    metabolize() {
        this.stomach -= this.constructor.metabolism;
        this.willReproduce = false;
        if (this.stomach > Math.pow(2, this.constructor.birthFactorShift + this.constructor.birthFactor)) {
            this.willReproduce = true;
        }
    }
    move(grid) {
        let destinationCell = grid.rows[mod(this.i + ORTH_SHIFTS_X[this.direction], grid.size)][mod(this.j + ORTH_SHIFTS_Y[this.direction], grid.size)];
        if (destinationCell.agent === null) {
            destinationCell.agent = this;
            this.setLocation(destinationCell.i, destinationCell.j);
            return true;
        } else {
            grid.rows[this.i][this.j].agent = this;
            return false;
        }
    }
    reproduce(grid, agents) {
        this.stomach = this.constructor.startStomach;
        let baby = new this.constructor(true);
        baby.setLocation(this.prevI, this.prevJ);
        grid.rows[this.prevI][this.prevJ].agent = baby;
        agents.add(baby);
    }

    isStarved() {
        return this.stomach < 0;
    }
}
Object.defineProperty(Agent, 'birthFactorShift', {value: cec.birthFactorShift, writable : false, enumerable : true, configurable : false});