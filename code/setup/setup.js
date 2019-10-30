class Setup { // SINGLETON
    constructor() {
        if (!Setup.instance) {
            Setup.instance = this;
            this.gm = new GridMaker();
            this.am = new AgentMaker();
            this.pop = new Populator();
        }
        return Setup.instance;
    }
    grid() {
        return this.gm.gridB();
    }
    agents() {
        return this.am.agents0();
    }
    populate(grid, agents) {
        this.pop.populate0(grid, agents);
    }
}