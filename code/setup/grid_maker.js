class GridMaker {
    constructor(size) {
        if (!GridMaker.instance) {
            GridMaker.instance = this;
        }
        return GridMaker.instance;
    }
    makeGridSetup0() {
        let grid = new Grid(60);
            for (let i = 0; i < grid.size; i++) {
                for (let j = 0; j < grid.size; j++) {
                    grid.rows[i][j].state.blue = randInt(0, 255);
                    grid.rows[i][j].state.green = randInt(0, 255);
                    grid.rows[i][j].state.red = randInt(0, 255);
                }
        }
        return grid;
        // let NUM_INITIAL_GREENBUGS = 16;
        // let NUM_INITIAL_BLUEBUGS = 24;
        // let NUM_INITIAL_REDMUNCHERS = 5;

        // let numGreenbugs = NUM_INITIAL_GREENBUGS;
        // let numBluebugs = NUM_INITIAL_BLUEBUGS;
        // let numRedmunchers = NUM_INITIAL_REDMUNCHERS;

        // let agents = [];

        // for (let i = 0; i < NUM_INITIAL_GREENBUGS; i++) {
        // agents.push({
        //     type: 'greenbug',
        //     done: false,
        //     stomach: 80
        // })
        // }
        // for (let i = 0; i < NUM_INITIAL_BLUEBUGS; i++) {
        // agents.push({
        //     type: 'bluebug',
        //     done: false,
        //     stomach: 120,
        //     direction: 1
        // })
        // }
        // for (let i = 0; i < NUM_INITIAL_REDMUNCHERS; i++) {
        // agents.push({
        //     type: 'redmuncher',
        //     done: false,
        //     stomach: 900
        // })
        // }

        // for (let i = 0; i < agents.length; i++) {
        // let x = randInt(0, grid.size - 1);
        // let y = randInt(0, grid.size - 1);
        // while (grid.rows[x][y].agent !== null) {
        //     x = randInt(0, grid.size);
        //     y = randInt(0, grid.size);
        // }
        // grid.rows[x][y].agent = agents[i];
        // }
    }
}