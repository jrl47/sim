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
                startStomach: 5200,
                babyStomach: 1000,
                metabolism: 29.5,
                grazeLimit: 100,
                birthFactor: 1.6
            }

            this.bluebug = {
                startStomach: 1600,
                babyStomach: 160,
                metabolism: 24,
                grazeLimit: 85,
                birthFactor: 0.6
            }

            this.redmuncher = {
                startStomach: 10000,
                babyStomach: 3000,
                metabolism: 43.5,
                grazeLimit: 120,
                birthFactor: 2.9,
                stomachFactor: 40,
                fatigueThreshold: 1500
            }

            this.birthFactorShift = 11;
        }
        return CurrentExperimentConstants.instance;
    }
}