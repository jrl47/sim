class Greenbug extends Bug {
    constructor(isBaby) {
        super(isBaby);
        this.stomach = isBaby ? cec.greenbug.babyStomach : cec.greenbug.startStomach;
    }
}

// Necessary because ES6 does not allow for static const fields inside of classes.
// Reference: https://stackoverflow.com/questions/32647215/declaring-static-constants-in-es6-classes
Object.defineProperty(Greenbug, 'statesToGraze', {value: ['green'], writable : false, enumerable : true, configurable : false});
Object.defineProperty(Greenbug, 'grazeLimit', {value: cec.greenbug.grazeLimit, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Greenbug, 'metabolism', {value: cec.greenbug.metabolism, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Greenbug, 'birthFactor', {value: cec.greenbug.birthFactor, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Greenbug, 'visibleZones', {value: cec.greenbug.visibleZones, writable : false, enumerable : true, configurable : false});
Object.defineProperty(Greenbug, 'startStomach', {value: cec.greenbug.startStomach, writable : false, enumerable : true, configurable : false});
