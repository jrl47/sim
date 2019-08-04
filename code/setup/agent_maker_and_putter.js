class AgentMakerAndPutter {
    constructor(size) {
        if (!AgentMakerAndPutter.instance) {
            AgentMakerAndPutter.instance = this;
            this.vc = new ViewControl();
            this.cec = new CurrentExperimentConstants();
        }
        return AgentMakerAndPutter.instance;
    }
    makeAgentConfig0() {
        let agents = {
            bugs: [],
            munchers: []
        };

        this.vc.numGreenbugs = this.cec.numInitialGreenbugs;
        this.vc.numBluebugs = this.cec.numInitialBluebugs;
        this.vc.numRedmunchers = this.cec.numInitialRedmunchers;

        for (let i = 0; i < this.cec.numInitialGreenbugs; i++) {
            agents.bugs.push(
                new Greenbug(false)
            )
        }
        for (let i = 0; i < this.cec.numInitialBluebugs; i++) {
            agents.bugs.push(
                new Bluebug(false)
            )
        }
        for (let i = 0; i < this.cec.numInitialRedmunchers; i++) {
            agents.munchers.push(
                new Redmuncher(false)
            )
        }

        return agents;
    }
    putAgentConfig0(grid, agents) {
        for (let i = 0; i < agents.bugs.length; i++) {
            let x = randInt(0, grid.size - 1);
            let y = randInt(0, grid.size - 1);
            while (grid.rows[x][y].agent !== null) {
                x = randInt(0, grid.size - 1);
                y = randInt(0, grid.size - 1);
            }
            grid.rows[x][y].agent = agents.bugs[i];
        }
        for (let i = 0; i < agents.munchers.length; i++) {
            let x = randInt(0, grid.size - 1);
            let y = randInt(0, grid.size - 1);
            while (grid.rows[x][y].agent !== null) {
                x = randInt(0, grid.size - 1);
                y = randInt(0, grid.size - 1);
            }
            grid.rows[x][y].agent = agents.munchers[i];
        }
    }
}