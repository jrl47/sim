class CurrentExperimentConstants {
    constructor() {
        if (!CurrentExperimentConstants.instance) {
            CurrentExperimentConstants.instance = this;
            this.numInitialGreenbugs = 15//;
            + 30;
            this.numInitialBluebugs = 20//;
            + 33;
            this.numInitialRedmunchers = 3//;
            + 9;

            this.greenbug = {
                startStomach: 5500,
                babyStomach: 1100,
                metabolism: 41,
                grazeLimit: 100,
                birthFactor: 1.9,
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
                metabolism: 39,
                grazeLimit: 90,
                birthFactor: 0.9,
                visibleZones: [
                    [0, 1],
                    [1, 1],
                    [0, 2],
                    [1, 2]
                ]
            }

            this.redmuncher = {
                startStomach: 16500,
                babyStomach: 2000,
                metabolism: 44,
                grazeLimit: 125,
                birthFactor: 3.3,
                stomachFactor: 180,
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