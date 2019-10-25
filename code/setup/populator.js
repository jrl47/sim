class Populator {
    constructor(size) {
        if (!Populator.instance) {
            Populator.instance = this;
        }
        return Populator.instance;
    }
    populate0(grid, agents) {
        agents.bugs.forEach((bug, sameBug, set) => {
            let x = randInt(0, grid.size - 1);
            let y = randInt(0, grid.size - 1);
            while (grid.rows[x][y].agent !== null) {
                x = randInt(0, grid.size - 1);
                y = randInt(0, grid.size - 1);
            }
            grid.rows[x][y].agent = bug;
        });
        agents.munchers.forEach((muncher, sameMuncher, set) => {
            let x = randInt(0, grid.size - 1);
            let y = randInt(0, grid.size - 1);
            while (grid.rows[x][y].agent !== null) {
                x = randInt(0, grid.size - 1);
                y = randInt(0, grid.size - 1);
            }
            grid.rows[x][y].agent = muncher;
        });
    }
}