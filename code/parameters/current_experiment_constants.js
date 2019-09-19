class CurrentExperimentConstants {
    constructor() {
        if (!CurrentExperimentConstants.instance) {
            CurrentExperimentConstants.instance = this;
            this.numInitialGreenbugs = 13//;
            + 20;
            this.numInitialBluebugs = 16//;
            + 20;
            this.numInitialRedmunchers = 2//;
            + 6;

            this.greenbug = {
                startStomach: 4500,
                babyStomach: 450,
                metabolism: 35.5,
                grazeLimit: 100,
                birthFactor: 1.5
            }

            this.bluebug = {
                startStomach: 1500,
                babyStomach: 140,
                metabolism: 23.5,
                grazeLimit: 85,
                birthFactor: 0.5
            }

            this.redmuncher = {
                startStomach: 9000,
                babyStomach: 2600,
                metabolism: 38.5,
                grazeLimit: 120,
                birthFactor: 2.8,
                stomachFactor: 29,
                fatigueThreshold: 1300
            }

            this.birthFactorShift = 11;
        }
        return CurrentExperimentConstants.instance;
    }
}