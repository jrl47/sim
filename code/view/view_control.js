class ViewControl {
    constructor() {
        if (!ViewControl.instance) {
            ViewControl.instance = this;
            this.showRedGrass = true;
            this.showGreenGrass = true;
            this.showBlueGrass = true;
            this.showGreenbug = true;
            this.showBluebug = true;
            this.showRedmuncher = true;
        }
        return ViewControl.instance;
    }
}