class GridView { // SINGLETON
    constructor(grid) {
        if (!GridView.instance) {
          GridView.instance = this;
            this.grid = grid;
            this.c = document.getElementById("myCanvas");
            this.ctx = this.c.getContext("2d");
            this.vc = new ViewControl();
            this.cec = new CurrentExperimentConstants();
        }
        return GridView.instance;
    }
    drawGrid() {
        for(let i = 0; i < grid.size; i++) {
          for(let j = 0; j < grid.size; j++) {
            let redGrass = this.vc.showRedGrass ? grid.rows[i][j].state.red : 0;
            let greenGrass = this.vc.showGreenGrass ? grid.rows[i][j].state.green : 0;
            let blueGrass = this.vc.showBlueGrass ? grid.rows[i][j].state.blue : 0;
            this.ctx.fillStyle = "rgb(" + (255 - blueGrass - greenGrass) + ", " +
              (255 - blueGrass - redGrass) + ", " +
              (255 - greenGrass - redGrass) + ")";
              this.ctx.fillRect(i * 30 + 1, j * 30 + 1, 29, 29);
    
            if (this.vc.showGreenbug && grid.rows[i][j].agent != null && grid.rows[i][j].agent instanceof Greenbug) {
              let greenbug = grid.rows[i][j].agent;
              let shade = greenbug.stomach;
              this.ctx.fillStyle = "rgb(0, 140, 0)";
              this.ctx.fillRect(i * 30 + 8, j * 30 + 8, 15, 15);
              this.ctx.fillStyle = "rgb(0, " + shade/Math.pow(2, this.cec.greenbug.birthFactor) + ", 0)";
              this.ctx.fillRect(i * 30 + 11, j * 30 + 11, 9, 9);
            } else if (this.vc.showBluebug && grid.rows[i][j].agent != null && grid.rows[i][j].agent instanceof Bluebug) {
              let bluebug = grid.rows[i][j].agent;
              let shade = bluebug.stomach;
              this.ctx.fillStyle = "rgb(0, 0, 140)";
              this.ctx.fillRect(i * 30 + 8, j * 30 + 8, 15, 15);
              this.ctx.fillStyle = "rgb(0, 0, " + shade/Math.pow(2, this.cec.bluebug.birthFactor) + ")";
              this.ctx.fillRect(i * 30 + 11, j * 30 + 11, 9, 9);
            } else if (this.vc.showRedmuncher && grid.rows[i][j].agent != null && grid.rows[i][j].agent instanceof Redmuncher) {
              let redmuncher = grid.rows[i][j].agent;
              let shade = redmuncher.stomach;
              this.ctx.fillStyle = "rgb(140, 0, 0)";
              this.ctx.fillRect(i * 30 + 8, j * 30 + 8, 15, 15);
              this.ctx.fillStyle = "rgb(" + shade/Math.pow(2, this.cec.redmuncher.birthFactor) + ", 0, 0)";
              this.ctx.fillRect(i * 30 + 11, j * 30 + 11, 9, 9);
            }
    
          }
        }
    };

    clear() {
      this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    }
}