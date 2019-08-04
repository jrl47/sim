class AgentInfoViewAndModel { // SINGLETON
    constructor() {
        if (!AgentInfoViewAndModel.instance) {
            AgentInfoViewAndModel.instance = this;
            this.vc = new ViewControl();

            this.greenGrassButton = new Button("greenGrass");
            this.greenGrassButton.initialize(
                'greenGrass',
                () => { this.vc.showGreenGrass = !this.vc.showGreenGrass; }
            );
            this.blueGrassButton = new Button("blueGrass");
            this.blueGrassButton.initialize(
                'blueGrass',
                () => { this.vc.showBlueGrass = !this.vc.showBlueGrass; }
            );
            this.redGrassButton = new Button("redGrass");
            this.redGrassButton.initialize(
                'redGrass',
                () => { this.vc.showRedGrass = !this.vc.showRedGrass; }
            );
            this.greenbugButton = new Button("greenbug");
            this.greenbugButton.initialize(
                'greenbug',
                () => { this.vc.showGreenbug = !this.vc.showGreenbug; }
            );
            this.bluebugButton = new Button("bluebug");
            this.bluebugButton.initialize(
                'bluebug',
                () => { this.vc.showBluebug = !this.vc.showBluebug; }
            );
            this.redmuncherButton = new Button("redmuncher");
            this.redmuncherButton.initialize(
                'redmuncher',
                () => { this.vc.showRedmuncher = !this.vc.showRedmuncher; }
            );

            this.numGreenbugsDisplay = document.getElementById("numGreenbugsDisplay");
            this.numBluebugsDisplay = document.getElementById("numBluebugsDisplay");
            this.numRedmunchersDisplay = document.getElementById("numRedmunchersDisplay");
        }
        return AgentInfoViewAndModel.instance;
    }
    drawInfo() {
        this.numGreenbugsDisplay.textContent = '# of greenbugs: ' + this.vc.numGreenbugs;
        this.numBluebugsDisplay.textContent = '# of bluebugs: ' + this.vc.numBluebugs;
        this.numRedmunchersDisplay.textContent = '# of redmunchers: ' + this.vc.numRedmunchers;
    }
}