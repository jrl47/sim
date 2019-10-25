class AgentRoster {
    constructor() {
        this.md = new Metadata();
        this.agents = new Set();
        this.bugs = new Set();
        this.munchers = new Set();
    }
    add(agent) {
        this.agents.add(agent);
        if (agent instanceof Greenbug) {
            this.bugs.add(agent);
            this.md.numGreenbugs++;
        } else if (agent instanceof Bluebug) {
            this.bugs.add(agent);
            this.md.numBluebugs++;
        } else if (agent instanceof Redmuncher) {
            this.munchers.add(agent);
            this.md.numRedmunchers++;
        }
    }
    delete(agent) {
        this.agents.delete(agent);
        if (agent instanceof Greenbug) {
            this.bugs.delete(agent);
            this.md.numGreenbugs--;
        } else if (agent instanceof Bluebug) {
            this.bugs.delete(agent);
            this.md.numBluebugs--;
        } else if (agent instanceof Redmuncher) {
            this.munchers.delete(agent);
            this.md.numRedmunchers--;
        }
    }
}