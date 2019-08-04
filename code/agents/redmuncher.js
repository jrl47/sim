class Redmuncher extends Muncher{
    constructor(isBaby) {
        super();
        this.done = isBaby;
        this.stomach = isBaby ? this.cec.redmuncher.babyStomach : this.cec.redmuncher.startStomach;
    }
}