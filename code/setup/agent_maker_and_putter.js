class AgentMakerAndPutter {
    constructor(size) {
        if (!AgentMakerAndPutter.instance) {
            AgentMakerAndPutter.instance = this;
            this.vc = new ViewControl();
        }
        return AgentMakerAndPutter.instance;
    }
    makeAgentConfig0() {
        let agents = [];

        let NUM_INITIAL_GREENBUGS = 16;
        let NUM_INITIAL_BLUEBUGS = 24;
        let NUM_INITIAL_REDMUNCHERS = 5;

        this.vc.numGreenbugs = NUM_INITIAL_GREENBUGS;
        this.vc.numBluebugs = NUM_INITIAL_BLUEBUGS;
        this.vc.numRedmunchers = NUM_INITIAL_REDMUNCHERS;

        for (let i = 0; i < NUM_INITIAL_GREENBUGS; i++) {
            agents.push({
                type: 'greenbug',
                done: false,
                stomach: 80
            })
        }
        for (let i = 0; i < NUM_INITIAL_BLUEBUGS; i++) {
            agents.push({
                type: 'bluebug',
                done: false,
                stomach: 120,
                direction: 1
            })
        }
        for (let i = 0; i < NUM_INITIAL_REDMUNCHERS; i++) {
            agents.push({
                type: 'redmuncher',
                done: false,
                stomach: 900
            })
        }

        return agents;
    }
    putAgentConfig0(grid, agents) {
        for (let i = 0; i < agents.length; i++) {
            let x = randInt(0, grid.size - 1);
            let y = randInt(0, grid.size - 1);
            while (grid.rows[x][y].agent !== null) {
                x = randInt(0, grid.size);
                y = randInt(0, grid.size);
            }
            grid.rows[x][y].agent = agents[i];
        }
    }
}