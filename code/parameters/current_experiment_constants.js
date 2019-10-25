class CurrentExperimentConstants {
    constructor() {
        if (!CurrentExperimentConstants.instance) {
            CurrentExperimentConstants.instance = this;
            this.numInitialGreenbugs = 15//;
            + 20;
            this.numInitialBluebugs = 20//;
            + 20;
            this.numInitialRedmunchers = 3//;
            + 6;

            this.greenbug = {
                startStomach: 5100,
                babyStomach: 900,
                metabolism: 42,
                grazeLimit: 100,
                birthFactor: 1.6,
                visibleZones: [
                    [0, 1],
                    [1, 1],
                    [0, 2],
                    [1, 2],
                    [2, 2],
                    [0, 3],
                    [3, 3]
                ]
            }

            this.bluebug = {
                startStomach: 2100,
                babyStomach: 300,
                metabolism: 36,
                grazeLimit: 85,
                birthFactor: 0.5,
                visibleZones: [
                    [0, 1],
                    [1, 1],
                    [0, 2],
                    [1, 2],
                    [2, 2],
                    [0, 3]
                ]
            }

            this.redmuncher = {
                startStomach: 13500,
                babyStomach: 3500,
                metabolism: 44,
                grazeLimit: 120,
                birthFactor: 3.1,
                stomachFactor: 7,
                fatigueThreshold: 2000,
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