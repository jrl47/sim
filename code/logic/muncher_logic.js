class MuncherLogic {
  constructor(size) {
      if (!MuncherLogic.instance) {
        MuncherLogic.instance = this;
        this.vc = new ViewControl();
      }
      return MuncherLogic.instance;
  }
  doSharedMuncherLogic(grid, bug, i, j) { // this logic in here is actually shared AGENT knowledge
      bug.done = true;
      // TODO add more to this function once different bug types are actually Classes
  }

  doRedmuncherLogic(grid, redmuncher, i, j) {
      this.doSharedMuncherLogic(grid, redmuncher, i, j);

      if (grid.rows[i][j].state.red > 0) {
        redmuncher.stomach += Math.min(255, grid.rows[i][j].state.red);
        grid.rows[i][j].state.red -= Math.min(255, grid.rows[i][j].state.red);
      }
      let neighborCell = -1;
      let STOMACH_FACTOR = 1;
      for(let k = 0; k < 4; k++) {
          neighborCell = grid.rows[mod(i + ORTH_SHIFTS_X[k], grid.size)][mod(j + ORTH_SHIFTS_Y[k], grid.size)];
          if(neighborCell.agent !== null && (neighborCell.agent.type === 'greenbug' || neighborCell.agent.type === 'bluebug')) {
              // console.log(neighborCell.agent + ' MUNCHED (orth)');
              neighborCell.agent.dead = true; // got munched
              redmuncher.stomach += neighborCell.agent.stomach/STOMACH_FACTOR;
              neighborCell.agent = null; // should this kind of thing be paired with the general death cleanup logic?
          }
      }
      for(let k = 0; k < 4; k++) {
          neighborCell = grid.rows[mod(i + DIAG_SHIFTS_X[k], grid.size)][mod(j + DIAG_SHIFTS_Y[k], grid.size)];
          if(neighborCell.agent !== null && (neighborCell.agent.type === 'greenbug' || neighborCell.agent.type === 'bluebug')) {
            // console.log(neighborCell.agent + ' MUNCHED (diag)');
              neighborCell.agent.dead = true; // got munched
              redmuncher.stomach += neighborCell.agent.stomach/STOMACH_FACTOR;
              neighborCell.agent = null; // should this kind of thing be paired with the general death cleanup logic?
          }
      }

      redmuncher.stomach -= 30;
      grid.rows[i][j].agent = null;
      let willReproduce = false;
      if (redmuncher.stomach > 1023) {
        willReproduce = true;
      }
      if (redmuncher.stomach > 0) { // RIP redmuncher if empty stomach, otherwise it moves instead of dies
        let direction = randInt(0, 3); // AI is same as greenbug
        let destinationCell = grid.rows[mod(i + ORTH_SHIFTS_X[direction], grid.size)][mod(j + ORTH_SHIFTS_Y[direction], grid.size)];
        if (destinationCell.agent === null) {
          destinationCell.agent = redmuncher;
          if (willReproduce) {
            let baby = {
              type: 'redmuncher',
              done: true, // "summoning sickness!"
              stomach: 660
            };
            this.vc.numRedmunchers++; // it seems unfortunate that this logic must live here for now
            redmuncher.stomach = 900;
            grid.rows[i][j].agent = baby;
            agents.push(baby);
          }
        } else {
          grid.rows[i][j].agent = redmuncher;
        }
      } else {
        redmuncher.dead = true;
      }
  }

  doMuncherLogic(grid, agents, i, j) {
      if (grid.rows[i][j].agent !== null && grid.rows[i][j].agent.done === false) {
          if (grid.rows[i][j].agent.type === 'redmuncher') {
              this.doRedmuncherLogic(grid, grid.rows[i][j].agent, i, j);
          }
      }
  }
}