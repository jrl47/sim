class GridMaker {
    constructor(size) {
        if (!GridMaker.instance) {
            GridMaker.instance = this;
        }
        return GridMaker.instance;
    }
    gridC() {
        let grid = new Grid(200);
            for (let i = 0; i < grid.size; i++) {
                for (let j = 0; j < grid.size; j++) {
                    grid.rows[i][j].state.blue = randInt(0, 255);
                    grid.rows[i][j].state.green = randInt(0, 255);
                    grid.rows[i][j].state.red = randInt(0, 255);
                }
        }
        return grid;
    }
    gridB() {
        let grid = new Grid(160);
            for (let i = 0; i < grid.size; i++) {
                for (let j = 0; j < grid.size; j++) {
                    grid.rows[i][j].state.blue = randInt(0, 255);
                    grid.rows[i][j].state.green = randInt(0, 255);
                    grid.rows[i][j].state.red = randInt(0, 255);
                }
        }
        return grid;
    }
    gridA() {
        let grid = new Grid(120);
            for (let i = 0; i < grid.size; i++) {
                for (let j = 0; j < grid.size; j++) {
                    grid.rows[i][j].state.blue = randInt(0, 255);
                    grid.rows[i][j].state.green = randInt(0, 255);
                    grid.rows[i][j].state.red = randInt(0, 255);
                }
        }
        return grid;
    }
    grid0() {
        let grid = new Grid(60);
            for (let i = 0; i < grid.size; i++) {
                for (let j = 0; j < grid.size; j++) {
                    grid.rows[i][j].state.blue = randInt(0, 255);
                    grid.rows[i][j].state.green = randInt(0, 255);
                    grid.rows[i][j].state.red = randInt(0, 255);
                }
        }
        return grid;
    }
    grid1() {
        let grid = new Grid(40);
            for (let i = 0; i < grid.size; i++) {
                for (let j = 0; j < grid.size; j++) {
                    grid.rows[i][j].state.blue = randInt(0, 255);
                    grid.rows[i][j].state.green = randInt(0, 255);
                    grid.rows[i][j].state.red = randInt(0, 255);
                }
        }
        return grid;
    }
    grid2() {
        let grid = new Grid(27);
            for (let i = 0; i < grid.size; i++) {
                for (let j = 0; j < grid.size; j++) {
                    grid.rows[i][j].state.blue = randInt(0, 255);
                    grid.rows[i][j].state.green = randInt(0, 255);
                    grid.rows[i][j].state.red = randInt(0, 255);
                }
        }
        return grid;
    }
}