class CurrentExperimentConstants {
    constructor() {
        if (!CurrentExperimentConstants.instance) {
            CurrentExperimentConstants.instance = this;
            this.numInitialGreenbugs = 10;
            this.numInitialBluebugs = 13;
            this.numInitialRedmunchers = 2;

            this.greenbug = {
                startStomach: 2200,
                babyStomach: 500,
                metabolism: 17.5,
                grazeLimit: 90,
                birthFactor: 1.4
            }

            this.bluebug = {
                startStomach: 800,
                babyStomach: 80,
                metabolism: 14.5,
                grazeLimit: 75,
                birthFactor: 0.4
            }

            this.redmuncher = {
                startStomach: 4000,
                babyStomach: 1000,
                metabolism: 42,
                grazeLimit: 115,
                birthFactor: 2.6,
                stomachFactor: 50
            }

            this.birthFactorShift = 10;
        }
        return CurrentExperimentConstants.instance;
    }
}