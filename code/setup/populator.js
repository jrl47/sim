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
            // this redundancy allows for the major efficiency improvement of iterating over the agents, not the grid, to do their logic.
            bug.setLocation(x, y);
            grid.rows[x][y].agent = bug;
        });
        agents.munchers.forEach((muncher, sameMuncher, set) => {
            let x = randInt(0, grid.size - 1);
            let y = randInt(0, grid.size - 1);
            while (grid.rows[x][y].agent !== null) {
                x = randInt(0, grid.size - 1);
                y = randInt(0, grid.size - 1);
            }
            // this redundancy allows for the major efficiency improvement of iterating over the agents, not the grid, to do their logic.
            muncher.setLocation(x, y);
            grid.rows[x][y].agent = muncher;
        });
    }
}