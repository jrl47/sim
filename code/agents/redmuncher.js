class Redmuncher extends Muncher{
    constructor(isBaby) {
        super();
        this.stomach = isBaby ? cec.redmuncher.babyStomach : cec.redmuncher.startStomach;
    }
}

// Necessary because ES6 does not allow for static const fields inside of classes.
// Reference: https://stackoverflow.com/questions/32647215/declaring-static-constants-in-es6-classes
Object.defineProperty(Redmuncher, 'statesToGraze', {value: ['red'], writable : false, enumerable : true, configurable : false});
Object.defineProperty(Redmuncher, 'bugsToEat', {value: [Greenbug, Bluebug], writable : false, enumerable : true, configurable : false});
Object.defineProperty(Redmuncher, 'grazeLimit', {value: cec.redmuncher.grazeLimit, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Redmuncher, 'metabolism', {value: cec.redmuncher.metabolism, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Redmuncher, 'birthFactor', {value: cec.redmuncher.birthFactor, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Redmuncher, 'stomachFactor', {value: cec.redmuncher.stomachFactor, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Redmuncher, 'visibleZones', {value: cec.redmuncher.visibleZones, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Redmuncher, 'fatigueThreshold', {value: cec.redmuncher.fatigueThreshold, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Redmuncher, 'fatigueVisibleZones', {value: cec.redmuncher.fatigueVisibleZones, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Redmuncher, 'startStomach', {value: cec.redmuncher.startStomach, writable : false, enumerable : true, configurable : false});