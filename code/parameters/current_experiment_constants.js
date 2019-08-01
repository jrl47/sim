class CurrentExperimentConstants {
    constructor() {
        if (!CurrentExperimentConstants.instance) {
            CurrentExperimentConstants.instance = this;
            this.numInitialGreenbugs = 22;
            this.numInitialBluebugs = 36;
            this.numInitialRedmunchers = 5;
            this.greenbugStartStomach = 510;
            this.greenbugBabyStomach = 480;
            this.greenbugMetabolism = 18;
            this.greenbugGrazeLimit = 74;
            this.greenbugBirthFactor = 1.9;
            this.bluebugStartStomach = 260;
            this.bluebugBabyStomach = 140;
            this.bluebugMetabolism = 9;
            this.bluebugGrazeLimit = 65;
            this.bluebugBirthFactor = .7;
            this.redmuncherStartStomach = 1350;
            this.redmuncherBabyStomach = 350;
            this.redmuncherMetabolism = 39;
            this.redmuncherGrazeLimit = 114;
            this.redmuncherBirthFactor = 2.75;
            this.redmuncherStomachFactor = 14;
            this.birthFactorShift = 8;
        }
        return CurrentExperimentConstants.instance;
    }
}