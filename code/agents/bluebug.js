class Bluebug extends Bug {
    constructor(isBaby) {
        super();
        this.done = isBaby;
        this.stomach = isBaby ? this.cec.bluebug.babyStomach : this.cec.bluebug.startStomach;
        this.direction = 0;
    }
}