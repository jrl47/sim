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
  }

  doGreenbugLogic(grid, greenbug, i, j, bugs) {
      this.doSharedBugLogic(grid, greenbug, i, j);

      if (grid.rows[i][j].state.green > 0) {
        greenbug.stomach += Math.min(this.cec.greenbug.grazeLimit, grid.rows[i][j].state.green);
        grid.rows[i][j].state.green -= Math.min(this.cec.greenbug.grazeLimit, grid.rows[i][j].state.green);
      }
      greenbug.stomach -= this.cec.greenbug.metabolism;
      grid.rows[i][j].agent = null;
      let willReproduce = false;
      if (greenbug.stomach > Math.pow(2, this.cec.birthFactorShift + this.cec.greenbug.birthFactor)) {
        willReproduce = true;
      }
      if (greenbug.stomach > 0) { // RIP greenbug if empty stomach, otherwise it moves instead of dies
        let direction = randInt(0, 3);

        if (randInt(0, 1) <= 0) { // 50% chance that computation time will be devoted to "looking"
          // "Vision"
          let done = false;
          // orth
          let runDirections = [1, 0, 3, 2];
          if (!done) {
            for (let k = 0; k < ORTH_SHIFTS_X.length; k++) {
              if (grid.rows[mod(i + ORTH_SHIFTS_X[k], grid.size)][mod(j + ORTH_SHIFTS_Y[k], grid.size)].agent !== null &&
                grid.rows[mod(i + ORTH_SHIFTS_X[k], grid.size)][mod(j + ORTH_SHIFTS_Y[k], grid.size)].agent instanceof Redmuncher) {
                  direction = runDirections[k];
                  done = true;
              }
            }
          }
          // diag (arbitrarily chose the 135 degree angle "runaway angle" convention for it)
          if (!done) {
            runDirections = [2, 0, 1, 3];
            for (let k = 0; k < DIAG_SHIFTS_X.length; k++) {
              if (grid.rows[mod(i + DIAG_SHIFTS_X[k], grid.size)][mod(j + DIAG_SHIFTS_Y[k], grid.size)].agent !== null &&
                grid.rows[mod(i + DIAG_SHIFTS_X[k], grid.size)][mod(j + DIAG_SHIFTS_Y[k], grid.size)].agent instanceof Redmuncher) {
                  direction = runDirections[k];
                  done = true;
              }
            }
          }
          // "far orth" (low priority)
          if (!done) {
            runDirections = [1, 0, 3, 2];
            for (let k = 0; k < ORTH_SHIFTS_X_2.length; k++) {
              if (grid.rows[mod(i + ORTH_SHIFTS_X_2[k], grid.size)][mod(j + ORTH_SHIFTS_Y_2[k], grid.size)].agent !== null &&
                grid.rows[mod(i + ORTH_SHIFTS_X_2[k], grid.size)][mod(j + ORTH_SHIFTS_Y_2[k], grid.size)].agent instanceof Redmuncher) {
                  direction = runDirections[k];
                  done = true;
              }
            }
          }
          // "far diag" (lowest priority)
          if (!done) {
            let runDirections = [2, 0, 1, 3];
            for (let k = 0; k < DIAG_SHIFTS_X_2.length; k++) {
              if (grid.rows[mod(i + DIAG_SHIFTS_X_2[k], grid.size)][mod(j + DIAG_SHIFTS_Y_2[k], grid.size)].agent !== null &&
                grid.rows[mod(i + DIAG_SHIFTS_X_2[k], grid.size)][mod(j + DIAG_SHIFTS_Y_2[k], grid.size)].agent instanceof Redmuncher) {
                  direction = runDirections[k];
                  done = true;
              }
            }
          }
        }

        let destinationCell = grid.rows[mod(i + ORTH_SHIFTS_X[direction], grid.size)][mod(j + ORTH_SHIFTS_Y[direction], grid.size)];
        if (destinationCell.agent === null) {
          destinationCell.agent = greenbug;
          if (willReproduce) {
            let baby = new Greenbug(true);
            this.vc.numGreenbugs++; // it seems unfortunate that this logic must live here for now
            greenbug.stomach = this.cec.greenbug.startStomach;
            grid.rows[i][j].agent = baby;
            bugs.push(baby);
          }
        } else {
          grid.rows[i][j].agent = greenbug;
        }
      } else {
        greenbug.dead = true;
      }
  }

  doBluebugLogic(grid, bluebug, i, j, bugs) {
      this.doSharedBugLogic(grid, bluebug, i, j);

      if (grid.rows[i][j].state.blue > 0) {
        bluebug.stomach += Math.min(this.cec.bluebug.grazeLimit, grid.rows[i][j].state.blue);
        grid.rows[i][j].state.blue -= Math.min(this.cec.bluebug.grazeLimit, grid.rows[i][j].state.blue);
      }
      bluebug.stomach -= this.cec.bluebug.metabolism;
      grid.rows[i][j].agent = null;
      let willReproduce = false;
      if (bluebug.stomach > Math.pow(2, this.cec.birthFactorShift + this.cec.bluebug.birthFactor)) {
        willReproduce = true;
      }
      if (bluebug.stomach > 0) { // RIP bluebug if empty stomach, otherwise it moves instead of dies

        // if (bluebug.stomach < 120) { // bluebugs are usually steadfast in their direction. but they have limits...
        //   bluebug.direction = randInt(0, 3);
        // }
        let direction = bluebug.direction;

        if (randInt(0, 1) <= 0) { // 50% chance that computation time will be devoted to "looking"
          // "Vision"
          let done = false;
          // orth
          let runDirections = [1, 0, 3, 2];
          for (let k = 0; k < ORTH_SHIFTS_X.length; k++) {
            if (grid.rows[mod(i + ORTH_SHIFTS_X[k], grid.size)][mod(j + ORTH_SHIFTS_Y[k], grid.size)].agent !== null &&
              grid.rows[mod(i + ORTH_SHIFTS_X[k], grid.size)][mod(j + ORTH_SHIFTS_Y[k], grid.size)].agent instanceof Redmuncher) {
                direction = runDirections[k];
                done = true;
            }
          }
          // diag (arbitrarily chose the 135 degree angle "runaway angle" convention for it)
          if (!done) {
            runDirections = [2, 0, 1, 3];
            for (let k = 0; k < DIAG_SHIFTS_X.length; k++) {
              if (grid.rows[mod(i + DIAG_SHIFTS_X[k], grid.size)][mod(j + DIAG_SHIFTS_Y[k], grid.size)].agent !== null &&
                grid.rows[mod(i + DIAG_SHIFTS_X[k], grid.size)][mod(j + DIAG_SHIFTS_Y[k], grid.size)].agent instanceof Redmuncher) {
                  direction = runDirections[k];
                  done = true;
              }
            }
          }
          // "far orth"
          if (!done) {
            runDirections = [1, 0, 3, 2];
            for (let k = 0; k < ORTH_SHIFTS_X_2.length; k++) {
              if (grid.rows[mod(i + ORTH_SHIFTS_X_2[k], grid.size)][mod(j + ORTH_SHIFTS_Y_2[k], grid.size)].agent !== null &&
                grid.rows[mod(i + ORTH_SHIFTS_X_2[k], grid.size)][mod(j + ORTH_SHIFTS_Y_2[k], grid.size)].agent instanceof Redmuncher) {
                  direction = runDirections[k];
                  done = true;
              }
            }
          }
          // "far diag"
          if (!done) {
            let runDirections = [2, 0, 1, 3];
            for (let k = 0; k < DIAG_SHIFTS_X_2.length; k++) {
              if (grid.rows[mod(i + DIAG_SHIFTS_X_2[k], grid.size)][mod(j + DIAG_SHIFTS_Y_2[k], grid.size)].agent !== null &&
                grid.rows[mod(i + DIAG_SHIFTS_X_2[k], grid.size)][mod(j + DIAG_SHIFTS_Y_2[k], grid.size)].agent instanceof Redmuncher) {
                  direction = runDirections[k];
                  done = true;
              }
            }
          }
        }

        // console.log(grid + ' ' + mod(i + ORTH_SHIFTS_X[direction], grid.size) + ' '+  mod(j + ORTH_SHIFTS_Y[direction], grid.size));
        let destinationCell = grid.rows[mod(i + ORTH_SHIFTS_X[direction], grid.size)]
        [mod(j + ORTH_SHIFTS_Y[direction], grid.size)];
        if (destinationCell.agent === null) {
          destinationCell.agent = bluebug;
          if (willReproduce) {
            let baby = new Bluebug(true);
            this.vc.numBluebugs++; // it seems unfortunate that this logic must live here for now
            bluebug.stomach = this.cec.bluebug.startStomach;
            bluebug.direction = 0;
            grid.rows[i][j].agent = baby;
            bugs.push(baby);
          }
        } else {
          grid.rows[i][j].agent = bluebug;
          bluebug.direction = randInt(0, 3);
        }
      } else {
        bluebug.dead = true;
      }
  }

  doBugLogic(grid, bugs, i, j) {
      if (grid.rows[i][j].agent !== null && grid.rows[i][j].agent.done === false) {
          if (grid.rows[i][j].agent instanceof Greenbug) {
              this.doGreenbugLogic(grid, grid.rows[i][j].agent, i, j, bugs);
          } else if (grid.rows[i][j].agent instanceof Bluebug) {
              this.doBluebugLogic(grid, grid.rows[i][j].agent, i, j, bugs);
          }
      }
  }
}