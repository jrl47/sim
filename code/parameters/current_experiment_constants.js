class CurrentExperimentConstants {
    constructor() {
        if (!CurrentExperimentConstants.instance) {
            CurrentExperimentConstants.instance = this;
            this.numInitialGreenbugs = 25;
            this.numInitialBluebugs = 45;
            this.numInitialRedmunchers = 4;
            this.greenbugStartStomach = 450;
            this.greenbugBabyStomach = 180;
            this.greenbugMetabolism = 17;
            this.greenbugGrazeLimit = 89;
            this.greenbugBirthFactor = 1.4;
            this.bluebugStartStomach = 290;
            this.bluebugBabyStomach = 110;
            this.bluebugMetabolism = 11;
            this.bluebugGrazeLimit = 67;
            this.bluebugBirthFactor = .8;
            this.redmuncherStartStomach = 2500;
            this.redmuncherBabyStomach = 320;
            this.redmuncherMetabolism = 45;
            this.redmuncherGrazeLimit = 115;
            this.redmuncherBirthFactor = 3.4;
            this.redmuncherStomachFactor = 70;
            this.birthFactorShift = 8;
        }
        return CurrentExperimentConstants.instance;
    }
}