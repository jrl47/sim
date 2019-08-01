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
        let agents = [];

        this.vc.numGreenbugs = this.cec.numInitialGreenbugs;
        this.vc.numBluebugs = this.cec.numInitialBluebugs;
        this.vc.numRedmunchers = this.cec.numInitialRedmunchers;

        for (let i = 0; i < this.cec.numInitialGreenbugs; i++) {
            agents.push({
                type: 'greenbug',
                done: false,
                stomach: this.cec.greenbugStartStomach
            })
        }
        for (let i = 0; i < this.cec.numInitialBluebugs; i++) {
            agents.push({
                type: 'bluebug',
                done: false,
                stomach: this.cec.bluebugStartStomach,
                direction: 1
            })
        }
        for (let i = 0; i < this.cec.numInitialRedmunchers; i++) {
            agents.push({
                type: 'redmuncher',
                done: false,
                stomach: this.cec.redmuncherStartStomach
            })
        }

        return agents;
    }
    putAgentConfig0(grid, agents) {
        for (let i = 0; i < agents.length; i++) {
            let x = randInt(0, grid.size - 1);
            let y = randInt(0, grid.size - 1);
            while (grid.rows[x][y].agent !== null) {
                x = randInt(0, grid.size - 1);
                y = randInt(0, grid.size - 1);
            }
            grid.rows[x][y].agent = agents[i];
        }
    }
}