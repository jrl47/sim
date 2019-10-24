class Agent {
    constructor() {
        this.done = false;
        this.vc = new ViewControl();
        this.cec = new CurrentExperimentConstants();
    }
    step() {
        this.done = true;
    }
}