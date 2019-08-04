class Greenbug extends Bug {
    constructor(isBaby) {
        super();
        this.done = isBaby;
        this.stomach = isBaby ? this.cec.greenbug.babyStomach : this.cec.greenbug.startStomach;
    }
}