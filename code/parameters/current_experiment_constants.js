class CurrentExperimentConstants {
    constructor() {
        if (!CurrentExperimentConstants.instance) {
            CurrentExperimentConstants.instance = this;
            this.numInitialGreenbugs = 15//;
            + 20;
            this.numInitialBluebugs = 20//;
            + 20;
            this.numInitialRedmunchers = 3//;
            + 6;

            this.greenbug = {
                startStomach: 5000,
                babyStomach: 1000,
                metabolism: 36,
                grazeLimit: 100,
                birthFactor: 1.6
            }

            this.bluebug = {
                startStomach: 1800,
                babyStomach: 350,
                metabolism: 26,
                grazeLimit: 85,
                birthFactor: 0.6
            }

            this.redmuncher = {
                startStomach: 12500,
                babyStomach: 4500,
                metabolism: 42,
                grazeLimit: 120,
                birthFactor: 3.1,
                stomachFactor: 27,
                fatigueThreshold: 2000
            }

            this.birthFactorShift = 11;
        }
        return CurrentExperimentConstants.instance;
    }
}