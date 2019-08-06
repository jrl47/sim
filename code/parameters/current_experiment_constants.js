class CurrentExperimentConstants {
    constructor() {
        if (!CurrentExperimentConstants.instance) {
            CurrentExperimentConstants.instance = this;
            this.numInitialGreenbugs = 20;
            this.numInitialBluebugs = 35;
            this.numInitialRedmunchers = 3;

            this.greenbug = {
                startStomach: 680,
                babyStomach: 130,
                metabolism: 18,
                grazeLimit: 85,
                birthFactor: 2
            }

            this.bluebug = {
                startStomach: 640,
                babyStomach: 80,
                metabolism: 14.5,
                grazeLimit: 75,
                birthFactor: 1.5
            }

            this.redmuncher = {
                startStomach: 2400,
                babyStomach: 320,
                metabolism: 43,
                grazeLimit: 115,
                birthFactor: 3.5,
                stomachFactor: 65
            }

            this.birthFactorShift = 8;
        }
        return CurrentExperimentConstants.instance;
    }
}