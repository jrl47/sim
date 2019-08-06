class CurrentExperimentConstants {
    constructor() {
        if (!CurrentExperimentConstants.instance) {
            CurrentExperimentConstants.instance = this;
            this.numInitialGreenbugs = 25;
            this.numInitialBluebugs = 45;
            this.numInitialRedmunchers = 3;

            this.greenbug = {
                startStomach: 660,
                babyStomach: 140,
                metabolism: 17,
                grazeLimit: 90,
                birthFactor: 2
            }

            this.bluebug = {
                startStomach: 630,
                babyStomach: 80,
                metabolism: 14,
                grazeLimit: 75,
                birthFactor: 1.5
            }

            this.redmuncher = {
                startStomach: 2600,
                babyStomach: 320,
                metabolism: 44,
                grazeLimit: 115,
                birthFactor: 4,
                stomachFactor: 70
            }

            this.birthFactorShift = 8;
        }
        return CurrentExperimentConstants.instance;
    }
}