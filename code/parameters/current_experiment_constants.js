class CurrentExperimentConstants {
    constructor() {
        if (!CurrentExperimentConstants.instance) {
            CurrentExperimentConstants.instance = this;
            this.numInitialGreenbugs = 7;
            this.numInitialBluebugs = 9;
            this.numInitialRedmunchers = 2;

            this.greenbug = {
                startStomach: 1800,
                babyStomach: 800,
                metabolism: 18,
                grazeLimit: 85,
                birthFactor: 1.5
            }

            this.bluebug = {
                startStomach: 680,
                babyStomach: 60,
                metabolism: 14.5,
                grazeLimit: 75,
                birthFactor: 0.5
            }

            this.redmuncher = {
                startStomach: 4200,
                babyStomach: 1000,
                metabolism: 45,
                grazeLimit: 115,
                birthFactor: 3.5,
                stomachFactor: 40
            }

            this.birthFactorShift = 10;
        }
        return CurrentExperimentConstants.instance;
    }
}