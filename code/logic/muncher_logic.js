class MuncherLogic {
  constructor(size) {
      if (!MuncherLogic.instance) {
        MuncherLogic.instance = this;
        this.vc = new ViewControl();
        this.cec = new CurrentExperimentConstants();
      }
      return MuncherLogic.instance;
  }
  doSharedMuncherLogic(grid, bug, i, j) { // this logic in here is actually shared AGENT knowledge
      bug.done = true;
      // TODO add more to this function once different bug types are actually Classes
  }

  doRedmuncherLogic(grid, redmuncher, i, j, munchers) {
      this.doSharedMuncherLogic(grid, redmuncher, i, j);

      if (grid.rows[i][j].state.red > 0) {
        redmuncher.stomach += Math.min(this.cec.redmuncher.grazeLimit, grid.rows[i][j].state.red);
        grid.rows[i][j].state.red -= Math.min(this.cec.redmuncher.grazeLimit, grid.rows[i][j].state.red);
      }
      let neighborCell = -1;
      for(let k = 0; k < 4; k++) {
          neighborCell = grid.rows[mod(i + ORTH_SHIFTS_X[k], grid.size)][mod(j + ORTH_SHIFTS_Y[k], grid.size)];
          if(neighborCell.agent !== null && (neighborCell.agent instanceof Greenbug || neighborCell.agent instanceof Bluebug)) {
              neighborCell.agent.dead = true; // got munched
              redmuncher.stomach += neighborCell.agent.stomach/this.cec.redmuncher.stomachFactor;
              neighborCell.agent = null; // should this kind of thing be paired with the general death cleanup logic?
          }
      }
      for(let k = 0; k < 4; k++) {
          neighborCell = grid.rows[mod(i + DIAG_SHIFTS_X[k], grid.size)][mod(j + DIAG_SHIFTS_Y[k], grid.size)];
          if(neighborCell.agent !== null && (neighborCell.agent instanceof Greenbug || neighborCell.agent instanceof Bluebug)) {
              neighborCell.agent.dead = true; // got munched
              redmuncher.stomach += neighborCell.agent.stomach/this.cec.redmuncher.stomachFactor;
              neighborCell.agent = null; // should this kind of thing be paired with the general death cleanup logic?
          }
      }

      redmuncher.stomach -= this.cec.redmuncher.metabolism;
      grid.rows[i][j].agent = null;
      let willReproduce = false;
      if (redmuncher.stomach > Math.pow(2, this.cec.birthFactorShift + this.cec.redmuncher.birthFactor)) {
        willReproduce = true;
      }
      if (redmuncher.stomach > 0) { // RIP redmuncher if empty stomach, otherwise it moves instead of dies
        let direction = randInt(0, 3); // AI is same as unless it sees something

        if (redmuncher.stomach > this.cec.redmuncher.fatigueThreshold) { // vision only happens if muncher is not too hungry
          // "Vision"
          let done = false;
          // orth
          let pursueDirections = [0, 1, 2, 3];
          if (!done) {
            for (let k = 0; k < ORTH_SHIFTS_X.length; k++) {
              if (grid.rows[mod(i + ORTH_SHIFTS_X[k], grid.size)][mod(j + ORTH_SHIFTS_Y[k], grid.size)].agent !== null &&
                grid.rows[mod(i + ORTH_SHIFTS_X[k], grid.size)][mod(j + ORTH_SHIFTS_Y[k], grid.size)].agent instanceof Bluebug ||
                grid.rows[mod(i + ORTH_SHIFTS_X[k], grid.size)][mod(j + ORTH_SHIFTS_Y[k], grid.size)].agent instanceof Greenbug) {
                  direction = pursueDirections[k];
                  done = true;
              }
            }
          }
          // diag (arbitrarily chose the 135 degree angle "runaway angle" convention for it)
          if (!done) {
            pursueDirections = [0, 2, 3, 1];
            for (let k = 0; k < DIAG_SHIFTS_X.length; k++) {
              if (grid.rows[mod(i + DIAG_SHIFTS_X[k], grid.size)][mod(j + DIAG_SHIFTS_Y[k], grid.size)].agent !== null &&
                grid.rows[mod(i + DIAG_SHIFTS_X[k], grid.size)][mod(j + DIAG_SHIFTS_Y[k], grid.size)].agent instanceof Bluebug) {
                  direction = pursueDirections[k];
                  done = true;
              }
            }
          }
          // "far orth, for bluebugs" 
          if (!done) {
            pursueDirections = [0, 1, 2, 3];
            for (let k = 0; k < ORTH_SHIFTS_X_1.length; k++) {
              if (grid.rows[mod(i + ORTH_SHIFTS_X_1[k], grid.size)][mod(j + ORTH_SHIFTS_Y_1[k], grid.size)].agent !== null &&
                grid.rows[mod(i + ORTH_SHIFTS_X_1[k], grid.size)][mod(j + ORTH_SHIFTS_Y_1[k], grid.size)].agent instanceof Bluebug) {
                  direction = pursueDirections[k];
                  done = true;
              }
            }
          }
          // "diag, for greenbugs"
          if (!done) {
            pursueDirections = [0, 2, 3, 1];
            for (let k = 0; k < DIAG_SHIFTS_X.length; k++) {
              if (grid.rows[mod(i + DIAG_SHIFTS_X[k], grid.size)][mod(j + DIAG_SHIFTS_Y[k], grid.size)].agent !== null &&
                grid.rows[mod(i + DIAG_SHIFTS_X[k], grid.size)][mod(j + DIAG_SHIFTS_Y[k], grid.size)].agent instanceof Greenbug) {
                  direction = pursueDirections[k];
                  done = true;
              }
            }
          }
          // "far orth, for greenbugs"
          if (!done) {
            pursueDirections = [0, 1, 2, 3];
            for (let k = 0; k < ORTH_SHIFTS_X_1.length; k++) {
              if (grid.rows[mod(i + ORTH_SHIFTS_X_1[k], grid.size)][mod(j + ORTH_SHIFTS_Y_1[k], grid.size)].agent !== null &&
                grid.rows[mod(i + ORTH_SHIFTS_X_1[k], grid.size)][mod(j + ORTH_SHIFTS_Y_1[k], grid.size)].agent instanceof Greenbug) {
                  direction = pursueDirections[k];
                  done = true;
              }
            }
          }
          // "far diag, for all bugs"
          if (!done) {
            pursueDirections = [0, 2, 3, 1];
            for (let k = 0; k < DIAG_SHIFTS_X_1.length; k++) {
              if (grid.rows[mod(i + DIAG_SHIFTS_X_1[k], grid.size)][mod(j + DIAG_SHIFTS_Y_1[k], grid.size)].agent !== null &&
                (grid.rows[mod(i + DIAG_SHIFTS_X_1[k], grid.size)][mod(j + DIAG_SHIFTS_Y_1[k], grid.size)].agent instanceof Bluebug ||
                grid.rows[mod(i + DIAG_SHIFTS_X_1[k], grid.size)][mod(j + DIAG_SHIFTS_Y_1[k], grid.size)].agent instanceof Greenbug)) {
                  direction = pursueDirections[k];
                  done = true;
              }
            }
          }
          for (let l = 3; l < 8; l++) {
            // "far far orth, for all bugs" (lowestestestestest priority)
            if (!done) {
              pursueDirections = [0, 1, 2, 3];
              for (let k = 0; k < ORTH_SHIFTS_X.length; k++) {
                if (grid.rows[mod(i + l * ORTH_SHIFTS_X[k], grid.size)][mod(j + l * ORTH_SHIFTS_Y[k], grid.size)].agent !== null &&
                  (grid.rows[mod(i + l * ORTH_SHIFTS_X[k], grid.size)][mod(j + l * ORTH_SHIFTS_Y[k], grid.size)].agent instanceof Bluebug ||
                  grid.rows[mod(i + l * ORTH_SHIFTS_X[k], grid.size)][mod(j + l * ORTH_SHIFTS_Y[k], grid.size)].agent instanceof Greenbug)) {
                    direction = pursueDirections[k];
                    done = true;
                }
              }
            }
            // "far far diag, for all bugs" (lowestestestestest priority)
            if (!done) {
              pursueDirections = [0, 2, 3, 1];
              for (let k = 0; k < DIAG_SHIFTS_X.length; k++) {
                if (grid.rows[mod(i + l * DIAG_SHIFTS_X[k], grid.size)][mod(j + l * DIAG_SHIFTS_Y[k], grid.size)].agent !== null &&
                  (grid.rows[mod(i + l * DIAG_SHIFTS_X[k], grid.size)][mod(j + l * DIAG_SHIFTS_Y[k], grid.size)].agent instanceof Bluebug ||
                  grid.rows[mod(i + l * DIAG_SHIFTS_X[k], grid.size)][mod(j + l * DIAG_SHIFTS_Y[k], grid.size)].agent instanceof Greenbug)) {
                    direction = pursueDirections[k];
                    done = true;
                }
              }
            } 
          }
        }


        let destinationCell = grid.rows[mod(i + ORTH_SHIFTS_X[direction], grid.size)][mod(j + ORTH_SHIFTS_Y[direction], grid.size)];
        if (destinationCell.agent === null) {
          destinationCell.agent = redmuncher;
          if (willReproduce) {
            let baby = new Redmuncher(true);
            this.vc.numRedmunchers++; // it seems unfortunate that this logic must live here for now
            redmuncher.stomach = this.cec.redmuncher.startStomach;
            grid.rows[i][j].agent = baby;
            munchers.push(baby);
          }
        } else {
          grid.rows[i][j].agent = redmuncher;
        }
      } else {
        redmuncher.dead = true;
      }
  }

  doMuncherLogic(grid, munchers, i, j) {
      if (grid.rows[i][j].agent !== null && grid.rows[i][j].agent.done === false) {
          if (grid.rows[i][j].agent instanceof Redmuncher) {
              this.doRedmuncherLogic(grid, grid.rows[i][j].agent, i, j, munchers);
          }
      }
  }
}