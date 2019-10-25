class Metadata {
    constructor() {
        if (!Metadata.instance) {
            Metadata.instance = this;
            this.reset();
        }
        return Metadata.instance;
    }
    reset() {
        this.numGreenbugs = 0;
        this.numBluebugs = 0;
        this.numRedmunchers = 0;
    }
}