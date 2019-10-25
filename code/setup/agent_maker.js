class AgentMaker {
    constructor(size) {
        if (!AgentMaker.instance) {
            AgentMaker.instance = this;
            this.cec = new CurrentExperimentConstants();
        }
        return AgentMaker.instance;
    }
    agents0() {
        let agents = new AgentRoster();

        for (let i = 0; i < this.cec.numInitialGreenbugs; i++) {
            let bug = new Greenbug(false);
            agents.add(bug);
        }
        for (let i = 0; i < this.cec.numInitialBluebugs; i++) {
            let bug = new Bluebug(false);
            agents.add(bug);
        }
        for (let i = 0; i < this.cec.numInitialRedmunchers; i++) {
            let muncher = new Redmuncher(false);
            agents.add(muncher);
        }

        return agents;
    }
}