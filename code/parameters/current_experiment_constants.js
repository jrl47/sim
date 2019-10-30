class CurrentExperimentConstants {
    constructor() {
        if (!CurrentExperimentConstants.instance) {
            CurrentExperimentConstants.instance = this;
            this.numInitialGreenbugs = 15//;
            + 155;
            this.numInitialBluebugs = 20//;
            + 193;
            this.numInitialRedmunchers = 3//;
            + 5;

            this.greenbug = {
                startStomach: 5500,
                babyStomach: 1100,
                metabolism: 42,
                grazeLimit: 110,
                birthFactor: 2.3,
                visibleZones: [
                    [0, 1],
                    [1, 1],
                    [0, 2],
                    [1, 2],
                    [2, 2],
                    [0, 3],
                    [1, 3],
                    [2, 3],
                    [3, 3],
                    [0, 4]
                ]
            }

            this.bluebug = {
                startStomach: 2500,
                babyStomach: 500,
                metabolism: 60,
                grazeLimit: 95,
                birthFactor: 0.9,
                visibleZones: [
                    [0, 1],
                    [1, 1],
                    [0, 2],
                    [1, 2]
                ]
            }

            this.redmuncher = {
                startStomach: 19000,
                babyStomach: 2000,
                metabolism: 32,
                grazeLimit: 125,
                birthFactor: 3.5,
                stomachFactor: 6,
                fatigueThreshold: 1000,
                fatigueVisibleZones: [
                    [0, 1],
                    [1, 1],
                    [0, 2],
                    [2, 2],
                    [1, 2]
                ],
                visibleZones: [
                    [0, 3],
                    [1, 3],
                    [2, 3],
                    [3, 3],
                    [0, 4],
                    [1, 4],
                    [2, 4],
                    [3, 4],
                    [4, 4],
                    [0, 5],
                    [1, 5],
                    [2, 5],
                    [3, 5],
                    [4, 5],
                    [5, 5],
                    [0, 6],
                    [6, 6],
                    [0, 7],
                    [7, 7],
                    [0, 8],
                    [8, 8]
                  ]
            }

            this.birthFactorShift = 11;
        }
        return CurrentExperimentConstants.instance;
    }
}
cec = new CurrentExperimentConstants();