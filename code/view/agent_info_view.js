class AgentInfoView { // SINGLETON
    constructor() {
        if (!AgentInfoView.instance) {
            AgentInfoView.instance = this;
            this.vc = new ViewControl();
            this.md = new Metadata();

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
                "greenbug",
                () => { this.vc.showGreenbug = !this.vc.showGreenbug; }
            );
            this.bluebugButton = new Button("bluebug");
            this.bluebugButton.initialize(
                "bluebug",
                () => { this.vc.showBluebug = !this.vc.showBluebug; }
            );
            this.redmuncherButton = new Button("redmuncher");
            this.redmuncherButton.initialize(
                "redmuncher",
                () => { this.vc.showRedmuncher = !this.vc.showRedmuncher; }
            );

            this.numGreenbugsDisplay = document.getElementById("numGreenbugsDisplay");
            this.numBluebugsDisplay = document.getElementById("numBluebugsDisplay");
            this.numRedmunchersDisplay = document.getElementById("numRedmunchersDisplay");
        }
        return AgentInfoView.instance;
    }
    drawInfo() {
        this.numGreenbugsDisplay.textContent = '# of greenbugs: ' + this.md.numGreenbugs;
        this.numBluebugsDisplay.textContent = '# of bluebugs: ' + this.md.numBluebugs;
        this.numRedmunchersDisplay.textContent = '# of redmunchers: ' + this.md.numRedmunchers;
    }
}