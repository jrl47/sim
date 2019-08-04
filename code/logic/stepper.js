class Stepper {
    constructor(grid, agents) {
        if (!Stepper.instance) {
            Stepper.instance = this;
            this.grid = grid;
            this.agents = agents;
            this.vc = new ViewControl();
            this.gooLogic = new GooLogic();
            this.bugLogic = new BugLogic();
            this.muncherLogic = new MuncherLogic();
        }
        return Stepper.instance;
    }
    doBugLogic() { // TODO

    }
    doMuncherLogic() { // TODO

    }
    step() {
        let neighborTotals = this.getNeighborTotals(this.grid);
        for(let i = 0; i < this.grid.size; i++) {
            for(let j = 0; j < this.grid.size; j++) {
                this.gooLogic.doGooLogic(this.grid, neighborTotals, i, j);
                this.bugLogic.doBugLogic(this.grid, this.agents.bugs, i, j);
                // this.doBugLogic(); TODO for refactor
                this.muncherLogic.doMuncherLogic(this.grid, this.agents.munchers, i, j); // MUST come after bug logic unless we want to worry about removal order
                // this.doMuncherLogic(); // MUST come after bug logic unless we want to worry about removal order TODO for refactor
            }
        }
        for (let a = 0; a < this.agents.bugs.length; a++) {
          this.agents.bugs[a].done = false;
          if (this.agents.bugs[a].dead) {
              if (this.agents.bugs[a].type === "greenbug") {
                  this.vc.numGreenbugs--;
              } else if (this.agents.bugs[a].type === "bluebug") {
                  this.vc.numBluebugs--;
              } else {
          
              }
              this.agents.bugs.splice(a, 1);
              a--;
          }
        }
        for (let a = 0; a < this.agents.munchers.length; a++) {
          this.agents.munchers[a].done = false;
          if (this.agents.munchers[a].dead) {
              if (this.agents.munchers[a].type === "redmuncher") {
                  this.vc.numRedmunchers--;
              } else {
          
              }
              this.agents.munchers.splice(a, 1);
              a--;
          }
        }
    }
    getNeighborTotals(grid) {
        let neighborTotals = [];
        for(let i = 0; i < grid.size; i++) {
          neighborTotals.push([]);
          for(var j = 0; j < grid.size; j++) {
            neighborTotals[i].push(
              {
                blue: this.getWeightedNeighborTotal(grid, 'blue', i, j),
                green: this.getWeightedNeighborTotal(grid, 'green', i, j),
                red: this.getWeightedNeighborTotal(grid, 'red', i, j)
              }
            );
          }
        }
        return neighborTotals;
    }
    getWeightedNeighborTotal(grid, color, i, j) {
        let result = 0;
      
        let selfWeight = -1;
        let orthWeight = -1;
      
        if (color === 'green') {
          selfWeight = 8;
          orthWeight = 2;
        } else if (color === 'blue') {
          selfWeight = 9;
          orthWeight = 2;
        } else if (color === 'red') {
          selfWeight = 10;
          orthWeight = 3;
        }
      
        result += grid.rows[i][j].state[color] * selfWeight;
        for (let k = 0; k < 4; k++) {
          result += grid.rows[mod(i + ORTH_SHIFTS_X[k], grid.size)][mod(j + ORTH_SHIFTS_Y[k], grid.size)].state[color] * orthWeight;
        }
        return result;
    }
}