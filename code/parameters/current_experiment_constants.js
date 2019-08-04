class CurrentExperimentConstants {
    constructor() {
        if (!CurrentExperimentConstants.instance) {
            CurrentExperimentConstants.instance = this;
            this.numInitialGreenbugs = 25;
            this.numInitialBluebugs = 45;
            this.numInitialRedmunchers = 3;

            this.greenbug = {
                startStomach: 450,
                babyStomach: 170,
                metabolism: 16,
                grazeLimit: 89,
                birthFactor: 1.5
            }

            this.bluebug = {
                startStomach: 430,
                babyStomach: 140,
                metabolism: 13,
                grazeLimit: 74,
                birthFactor: 1.25
            }

            this.redmuncher = {
                startStomach: 2550,
                babyStomach: 320,
                metabolism: 44,
                grazeLimit: 115,
                birthFactor: 3.75,
                stomachFactor: 70
            }

            this.birthFactorShift = 8;
        }
        return CurrentExperimentConstants.instance;
    }
}