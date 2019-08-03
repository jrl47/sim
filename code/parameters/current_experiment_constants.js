class CurrentExperimentConstants {
    constructor() {
        if (!CurrentExperimentConstants.instance) {
            CurrentExperimentConstants.instance = this;
            this.numInitialGreenbugs = 25;
            this.numInitialBluebugs = 45;
            this.numInitialRedmunchers = 3;
            this.greenbugStartStomach = 450;
            this.greenbugBabyStomach = 170;
            this.greenbugMetabolism = 16;
            this.greenbugGrazeLimit = 89;
            this.greenbugBirthFactor = 1.5;
            this.bluebugStartStomach = 430;
            this.bluebugBabyStomach = 140;
            this.bluebugMetabolism = 13;
            this.bluebugGrazeLimit = 74;
            this.bluebugBirthFactor = 1.25;
            this.redmuncherStartStomach = 2550;
            this.redmuncherBabyStomach = 320;
            this.redmuncherMetabolism = 44;
            this.redmuncherGrazeLimit = 115;
            this.redmuncherBirthFactor = 3.75;
            this.redmuncherStomachFactor = 70;
            this.birthFactorShift = 8;
        }
        return CurrentExperimentConstants.instance;
    }
}