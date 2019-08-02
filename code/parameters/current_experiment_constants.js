class CurrentExperimentConstants {
    constructor() {
        if (!CurrentExperimentConstants.instance) {
            CurrentExperimentConstants.instance = this;
            this.numInitialGreenbugs = 20;
            this.numInitialBluebugs = 35;
            this.numInitialRedmunchers = 4;
            this.greenbugStartStomach = 410;
            this.greenbugBabyStomach = 260;
            this.greenbugMetabolism = 16;
            this.greenbugGrazeLimit = 87;
            this.greenbugBirthFactor = 1.4;
            this.bluebugStartStomach = 270;
            this.bluebugBabyStomach = 140;
            this.bluebugMetabolism = 11;
            this.bluebugGrazeLimit = 67;
            this.bluebugBirthFactor = .7;
            this.redmuncherStartStomach = 2200;
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