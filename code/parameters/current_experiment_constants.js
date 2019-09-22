class CurrentExperimentConstants {
    constructor() {
        if (!CurrentExperimentConstants.instance) {
            CurrentExperimentConstants.instance = this;
            this.numInitialGreenbugs = 15;
            // + 20;
            this.numInitialBluebugs = 20;
            // + 20;
            this.numInitialRedmunchers = 3;
            // + 6;

            this.greenbug = {
                startStomach: 5000,
                babyStomach: 1000,
                metabolism: 40,
                grazeLimit: 100,
                birthFactor: 1.6
            }

            this.bluebug = {
                startStomach: 2100,
                babyStomach: 300,
                metabolism: 33,
                grazeLimit: 85,
                birthFactor: 0.6
            }

            this.redmuncher = {
                startStomach: 13000,
                babyStomach: 4000,
                metabolism: 41,
                grazeLimit: 120,
                birthFactor: 3.1,
                stomachFactor: 12,
                fatigueThreshold: 2000
            }

            this.birthFactorShift = 11;
        }
        return CurrentExperimentConstants.instance;
    }
}