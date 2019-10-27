class Bluebug extends Bug {
    constructor(isBaby) {
        super(isBaby);
        this.stomach = isBaby ? cec.bluebug.babyStomach : cec.bluebug.startStomach;
        this.direction = randInt(0, 3);
    }
}

// Necessary because ES6 does not allow for static const fields inside of classes.
// Reference: https://stackoverflow.com/questions/32647215/declaring-static-constants-in-es6-classes
Object.defineProperty(Bluebug, 'statesToGraze', {value: ['blue'], writable : false, enumerable : true, configurable : false});
Object.defineProperty(Bluebug, 'grazeLimit', {value: cec.bluebug.grazeLimit, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Bluebug, 'metabolism', {value: cec.bluebug.metabolism, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Bluebug, 'birthFactor', {value: cec.bluebug.birthFactor, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Bluebug, 'visibleZones', {value: cec.bluebug.visibleZones, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Bluebug, 'startStomach', {value: cec.bluebug.startStomach, writable : false, enumerable : true, configurable : false});