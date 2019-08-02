class BugLogic {
  constructor(size) {
      if (!BugLogic.instance) {
        BugLogic.instance = this;
        this.vc = new ViewControl();
        this.cec = new CurrentExperimentConstants();
      }
      return BugLogic.instance;
  }
  doSharedBugLogic(grid, bug, i, j) {
      bug.done = true;
      // TODO add more to this function once different bug types are actually Classes
  }

  doGreenbugLogic(grid, greenbug, i, j) {
      this.doSharedBugLogic(grid, greenbug, i, j);

      if (grid.rows[i][j].state.green > 0) {
        greenbug.stomach += Math.min(this.cec.greenbugGrazeLimit, grid.rows[i][j].state.green);
        grid.rows[i][j].state.green -= Math.min(this.cec.greenbugGrazeLimit, grid.rows[i][j].state.green);
      }
      greenbug.stomach -= this.cec.greenbugMetabolism;
      grid.rows[i][j].agent = null;
      let willReproduce = false;
      if (greenbug.stomach > Math.pow(2, this.cec.birthFactorShift + this.cec.greenbugBirthFactor)) {
        willReproduce = true;
      }
      if (greenbug.stomach > 0) { // RIP greenbug if empty stomach, otherwise it moves instead of dies
        let direction = randInt(0, 3);
        let destinationCell = grid.rows[mod(i + ORTH_SHIFTS_X[direction], grid.size)][mod(j + ORTH_SHIFTS_Y[direction], grid.size)];
        if (destinationCell.agent === null) {
          destinationCell.agent = greenbug;
          if (willReproduce) {
            let baby = {
              type: 'greenbug',
              done: true, // "summoning sickness!"
              stomach: this.cec.greenbugBabyStomach
            };
            this.vc.numGreenbugs++; // it seems unfortunate that this logic must live here for now
            greenbug.stomach = this.cec.greenbugStartStomach;
            grid.rows[i][j].agent = baby;
            agents.push(baby);
          }
        } else {
          grid.rows[i][j].agent = greenbug;
        }
      } else {
        greenbug.dead = true;
      }
  }

  doBluebugLogic(grid, bluebug, i, j) {
      this.doSharedBugLogic(grid, bluebug, i, j);

      if (grid.rows[i][j].state.blue > 0) {
        bluebug.stomach += Math.min(this.cec.bluebugGrazeLimit, grid.rows[i][j].state.blue);
        grid.rows[i][j].state.blue -= Math.min(this.cec.bluebugGrazeLimit, grid.rows[i][j].state.blue);
      }
      bluebug.stomach -= this.cec.bluebugMetabolism;
      grid.rows[i][j].agent = null;
      let willReproduce = false;
      if (bluebug.stomach > Math.pow(2, this.cec.birthFactorShift + this.cec.bluebugBirthFactor)) {
        willReproduce = true;
      }
      if (bluebug.stomach > 0) { // RIP bluebug if empty stomach, otherwise it moves instead of dies
        if (bluebug.stomach < 120) { // bluebugs are usually steadfast in their direction. but they have limits...
          bluebug.direction = randInt(0, 3);
        }
        let direction = bluebug.direction;

        // "Vision"
        // "far diag" (lowest priority)
        let runDirections = [2, 0, 1, 3];
        for (let k = 0; k < DIAG_SHIFTS_X_1.length; k++) {
          if (grid.rows[mod(i + DIAG_SHIFTS_X_1[k], grid.size)][mod(j + DIAG_SHIFTS_Y_1[k], grid.size)].agent !== null &&
            grid.rows[mod(i + DIAG_SHIFTS_X_1[k], grid.size)][mod(j + DIAG_SHIFTS_Y_1[k], grid.size)].agent.type === 'redmuncher') {
              direction = runDirections[k];
          }
        }
        // "far orth" (low priority)
        runDirections = [1, 0, 3, 2];
        for (let k = 0; k < ORTH_SHIFTS_X_1.length; k++) {
          if (grid.rows[mod(i + ORTH_SHIFTS_X_1[k], grid.size)][mod(j + ORTH_SHIFTS_Y_1[k], grid.size)].agent !== null &&
            grid.rows[mod(i + ORTH_SHIFTS_X_1[k], grid.size)][mod(j + ORTH_SHIFTS_Y_1[k], grid.size)].agent.type === 'redmuncher') {
              direction = runDirections[k];
          }
        }
        // diag (arbitrarily chose the 135 degree angle "runaway angle" convention for it)
        runDirections = [2, 0, 1, 3];
        for (let k = 0; k < DIAG_SHIFTS_X.length; k++) {
          if (grid.rows[mod(i + DIAG_SHIFTS_X[k], grid.size)][mod(j + DIAG_SHIFTS_Y[k], grid.size)].agent !== null &&
            grid.rows[mod(i + DIAG_SHIFTS_X[k], grid.size)][mod(j + DIAG_SHIFTS_Y[k], grid.size)].agent.type === 'redmuncher') {
              direction = runDirections[k];
          }
        }
        // orth (overrides diag)
        runDirections = [1, 0, 3, 2];
        for (let k = 0; k < ORTH_SHIFTS_X.length; k++) {
          if (grid.rows[mod(i + ORTH_SHIFTS_X[k], grid.size)][mod(j + ORTH_SHIFTS_Y[k], grid.size)].agent !== null &&
            grid.rows[mod(i + ORTH_SHIFTS_X[k], grid.size)][mod(j + ORTH_SHIFTS_Y[k], grid.size)].agent.type === 'redmuncher') {
              direction = runDirections[k];
          }
        }

      //   console.log(grid + ' ' + mod(i + ORTH_SHIFTS_X[direction], grid.size) + ' '+  mod(j + ORTH_SHIFTS_Y[direction], grid.size));
        let destinationCell = grid.rows[mod(i + ORTH_SHIFTS_X[direction], grid.size)]
        [mod(j + ORTH_SHIFTS_Y[direction], grid.size)];
        if (destinationCell.agent === null) {
          destinationCell.agent = bluebug;
          if (willReproduce) {
            let baby = {
              type: 'bluebug',
              done: true, // "summoning sickness!"
              stomach: this.cec.bluebugBabyStomach,
              direction: 1
            };
            this.vc.numBluebugs++; // it seems unfortunate that this logic must live here for now
            bluebug.stomach = this.cec.bluebugStartStomach;
            bluebug.direction = 0;
            grid.rows[i][j].agent = baby;
            agents.push(baby);
          }
        } else {
          grid.rows[i][j].agent = bluebug;
          bluebug.direction = randInt(0, 3);
        }
      } else {
        bluebug.dead = true;
      }
  }

  doBugLogic(grid, agents, i, j) {
      if (grid.rows[i][j].agent !== null && grid.rows[i][j].agent.done === false) {
          if (grid.rows[i][j].agent.type === 'greenbug') {
              this.doGreenbugLogic(grid, grid.rows[i][j].agent, i, j);
          } else if (grid.rows[i][j].agent.type === 'bluebug') {
              this.doBluebugLogic(grid, grid.rows[i][j].agent, i, j);
          }
      }
  }
}