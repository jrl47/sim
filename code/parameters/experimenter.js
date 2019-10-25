class Experimenter {
    constructor(doStep, doReset) {
        if (!Experimenter.instance) {
            Experimenter.instance = this;
            // The metadata must be reset after each experiment! It doesn't "know" when to reset count.
            this.md = new Metadata();

            this.doStep = doStep;
            this.doReset = doReset;
            this.numSteps = 0;
            this.totalSteps = 0;
            this.maxSteps = 0;
            this.maxAvgSteps = 0;
            this.numExperiments = 0;
            this.maxExperiments = 10;

            this.blameRed = 0;
            this.blameGreen = 0
            this.blameBlue = 0;

            this.currentMaxRed = 0;
            this.currentMaxGreen = 0;
            this.currentMaxBlue = 0;
            this.maxRed = 0;
            this.maxGreen = 0;
            this.maxBlue = 0;

            this.changes = -1; // "changes" object to modify experiment params
        }
        return Experimenter.instance;
    }
    proceed() {
        if (this.md.numRedmunchers > this.currentMaxRed) {
            this.currentMaxRed = this.md.numRedmunchers;
        }
        if (this.md.numGreenbugs > this.currentMaxGreen) {
            this.currentMaxGreen = this.md.numGreenbugs;
        }
        if (this.md.numBluebugs > this.currentMaxBlue) {
            this.currentMaxBlue = this.md.numBluebugs;
        }
        if (this.md.numGreenbugs !== 0 && this.md.numBluebugs !== 0 && this.md.numRedmunchers !== 0) {
            doStep();
            this.numSteps++;
            if (this.numSteps % 10000 === 0) {
              console.log(this.numSteps);
            }
        } else {
            if (this.md.numRedmunchers === 0) {
                this.blameRed++;
            }
            if (this.md.numGreenbugs === 0) {
                this.blameGreen++;
            }
            if (this.md.numBluebugs === 0) {
                this.blameBlue++;
            }
      
            this.numExperiments++;
            this.totalSteps += this.numSteps;
            console.log(this.numSteps);
            console.log('red? ' + (this.blameRed));
            console.log('green? ' + (this.blameGreen));
            console.log('blue? ' + (this.blameBlue));
      
            this.maxRed += this.currentMaxRed;
            this.maxGreen += this.currentMaxGreen;
            this.maxBlue += this.currentMaxBlue;
            this.currentMaxRed = 0;
            this.currentMaxGreen = 0;
            this.currentMaxBlue = 0;
      
            if (this.numSteps > this.maxSteps) {
                this.maxSteps = this.numSteps;
            }
            this.numSteps = 0;
      
            if (this.numExperiments < this.maxExperiments) {
              this.md.reset();
              doReset();
            } else {
              if (this.totalSteps/this.maxExperiments > this.maxAvgSteps) {
                this.maxAvgSteps = Math.floor(this.totalSteps/this.maxExperiments);
                // start again but with a "new" set of changes
                console.log('Maximum Number of Steps: ' + this.maxSteps);
                console.log('Average Number of Steps: ' + this.maxAvgSteps);
                console.log('Max Redmuncher Population: ' + this.maxRed/this.maxExperiments);
                console.log('Max Greenbug Population: ' + this.maxGreen/this.maxExperiments);
                console.log('Max Bluebug Population: ' + this.maxBlue/this.maxExperiments);
                timer.pause();
              } else {
                // "undo" the changes
              }
            }
        }
    }
}