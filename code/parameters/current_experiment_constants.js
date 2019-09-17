class CurrentExperimentConstants {
    constructor() {
        if (!CurrentExperimentConstants.instance) {
            CurrentExperimentConstants.instance = this;
            this.numInitialGreenbugs = 13//;
            + 20;
            this.numInitialBluebugs = 16//;
            + 20;
            this.numInitialRedmunchers = 2//;
            + 10;

            this.greenbug = {
                startStomach: 4500,
                babyStomach: 450,
                metabolism: 36,
                grazeLimit: 100,
                birthFactor: 1.5
            }

            this.bluebug = {
                startStomach: 1500,
                babyStomach: 120,
                metabolism: 25,
                grazeLimit: 85,
                birthFactor: 0.5
            }

            this.redmuncher = {
                startStomach: 7800,
                babyStomach: 1200,
                metabolism: 45,
                grazeLimit: 120,
                birthFactor: 2.2,
                stomachFactor: 20,
                fatigueThreshold: 1500
            }

            this.birthFactorShift = 11;
        }
        return CurrentExperimentConstants.instance;
    }
}