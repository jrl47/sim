class Agent {
    constructor(isBaby) {
        this.done = isBaby;
    }
    step(grid, agents, i, j) {
        this.startTurn(grid, i, j);

        this.eat(grid, i, j);
        if (this instanceof Muncher) {
            this.munch(grid, i, j);
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
                if (randInt(0, 5) <= 4) {
                    this.doVision(grid, i, j);
                }
            } else if (this instanceof Bluebug) {
                if (randInt(0, 4) <= 3) {
                    this.doVision(grid, i, j);
                }
            } else if (this instanceof Muncher) {
                this.doFatiguedVision(grid, i, j);
                if (this.stomach > this.constructor.fatigueThreshold) {
                    this.doVision(grid, i, j);
                }
            }

            if (this.move(grid, i, j)) { // can't reproduce if it was blocked.
                if (this.willReproduce) {
                    this.reproduce(grid, agents, i, j);
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
    startTurn(grid, i, j) {
        this.done = true;
        grid.rows[i][j].agent = null;
    }
    eat(grid, i, j) {
        for (let k = 0; k < this.constructor.statesToGraze.length; k++) {
            if (grid.rows[i][j].state[this.constructor.statesToGraze[k]] > 0) {
                this.stomach += Math.min(this.constructor.grazeLimit, grid.rows[i][j].state[this.constructor.statesToGraze[k]]);
                grid.rows[i][j].state[this.constructor.statesToGraze[k]] -=
                    Math.min(this.constructor.grazeLimit, grid.rows[i][j].state[this.constructor.statesToGraze[k]]);
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
    move(grid, i, j) {
        let destinationCell = grid.rows[mod(i + ORTH_SHIFTS_X[this.direction], grid.size)][mod(j + ORTH_SHIFTS_Y[this.direction], grid.size)];
        if (destinationCell.agent === null) {
            destinationCell.agent = this;
            return true;
        } else {
            grid.rows[i][j].agent = this;
            return false;
        }
    }
    reproduce(grid, agents, i, j) {
        let baby = new this.constructor(true);
        this.stomach = this.constructor.startStomach;
        grid.rows[i][j].agent = baby;
        agents.add(baby);
    }

    isStarved() {
        return this.stomach < 0;
    }
}
Object.defineProperty(Agent, 'birthFactorShift', {value: cec.birthFactorShift, writable : false, enumerable : true, configurable : false});