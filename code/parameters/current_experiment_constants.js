class CurrentExperimentConstants {
    constructor() {
        if (!CurrentExperimentConstants.instance) {
            CurrentExperimentConstants.instance = this;
            this.numInitialGreenbugs = 20;
            this.numInitialBluebugs = 35;
            this.numInitialRedmunchers = 4;
            this.greenbugStartStomach = 520;
            this.greenbugBabyStomach = 480;
            this.greenbugMetabolism = 17.5;
            this.greenbugGrazeLimit = 81;
            this.greenbugBirthFactor = 1.7;
            this.bluebugStartStomach = 230;
            this.bluebugBabyStomach = 150;
            this.bluebugMetabolism = 7.5;
            this.bluebugGrazeLimit = 66;
            this.bluebugBirthFactor = .5;
            this.redmuncherStartStomach = 1700;
            this.redmuncherBabyStomach = 250;
            this.redmuncherMetabolism = 38;
            this.redmuncherGrazeLimit = 115;
            this.redmuncherBirthFactor = 3.1;
            this.redmuncherStomachFactor = 60;
            this.birthFactorShift = 8;
        }
        return CurrentExperimentConstants.instance;
    }
}