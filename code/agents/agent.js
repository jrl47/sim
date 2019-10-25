class Agent {
    constructor() {
        this.done = false;
        this.cec = new CurrentExperimentConstants();
    }
    step() {
        this.done = true;
    }
}