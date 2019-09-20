class CurrentExperimentConstants {
    constructor() {
        if (!CurrentExperimentConstants.instance) {
            CurrentExperimentConstants.instance = this;
            this.numInitialGreenbugs = 13;
            // + 20;
            this.numInitialBluebugs = 16;
            // + 20;
            this.numInitialRedmunchers = 2;
            // + 6;

            this.greenbug = {
                startStomach: 5000,
                babyStomach: 1000,
                metabolism: 33,
                grazeLimit: 100,
                birthFactor: 1.6
            }

            this.bluebug = {
                startStomach: 1600,
                babyStomach: 160,
                metabolism: 23,
                grazeLimit: 85,
                birthFactor: 0.5
            }

            this.redmuncher = {
                startStomach: 9000,
                babyStomach: 2800,
                metabolism: 42,
                grazeLimit: 120,
                birthFactor: 2.9,
                stomachFactor: 34,
                fatigueThreshold: 1800
            }

            this.birthFactorShift = 11;
        }
        return CurrentExperimentConstants.instance;
    }
}