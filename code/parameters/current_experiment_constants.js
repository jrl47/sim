class CurrentExperimentConstants {
    constructor() {
        if (!CurrentExperimentConstants.instance) {
            CurrentExperimentConstants.instance = this;
            this.numInitialGreenbugs = 25;
            this.numInitialBluebugs = 45;
            this.numInitialRedmunchers = 4;
            this.greenbugStartStomach = 450;
            this.greenbugBabyStomach = 180;
            this.greenbugMetabolism = 16;
            this.greenbugGrazeLimit = 85;
            this.greenbugBirthFactor = 1.3;
            this.bluebugStartStomach = 290;
            this.bluebugBabyStomach = 120;
            this.bluebugMetabolism = 11;
            this.bluebugGrazeLimit = 67;
            this.bluebugBirthFactor = .7;
            this.redmuncherStartStomach = 2450;
            this.redmuncherBabyStomach = 300;
            this.redmuncherMetabolism = 46;
            this.redmuncherGrazeLimit = 115;
            this.redmuncherBirthFactor = 3.4;
            this.redmuncherStomachFactor = 70;
            this.birthFactorShift = 8;
        }
        return CurrentExperimentConstants.instance;
    }
}