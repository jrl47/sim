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

        if (redmuncher.stomach > this.cec.redmuncher.fatigueThreshold) { // hq vision only happens if muncher is not too hungry
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