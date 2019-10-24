class FunctionView { // SINGLETON
    constructor(vc) {
        if (!FunctionView.instance) {
          FunctionView.instance = this;
            this.c = document.getElementById("functionCanvas");
            this.ctx = this.c.getContext("2d");
            this.vc = new ViewControl();
            this.AXIS_WIDTH = 40;
            this.xScale = 2;
            this.yScale = 1;
            this.interval = 100;
            this.max = 350;

            this.numLines = 0;
            this.lastBlueEnd = 0;
            this.lastGreenEnd = 0;
            this.lastRedEnd = 0;

            this.c.style.background = 'white';

            this.ctx.fillStyle = "rgb(0, 0, 0)";
            for (let i = 0; i < this.max/this.interval; i++) {
                this.ctx.fillRect(this.AXIS_WIDTH - 8, this.c.height - 2 - (i * this.interval) / this.yScale, 8, 2);
                this.ctx.font = "15px sans-serif";
                this.ctx.fillText("" + i * this.interval, 2, this.c.height - 2 - (i * this.interval) / this.yScale);
            }

            this.ctx.lineWidth = 3;

            this.ctx.fillStyle = "rgb(0, 0, 0)";
            this.ctx.fillRect(this.AXIS_WIDTH - 1, 0, 1, this.c.height);
        }
        return FunctionView.instance;
    }
    drawFunctions() {
        let currentMax = Math.max(this.vc.numBluebugs, this.vc.numGreenbugs, this.vc.numRedmunchers)
        if (currentMax > this.max) {
            this.max = currentMax;
        }

        if (this.numLines * this.xScale < this.c.width - this.AXIS_WIDTH) { // non-scrolling case
            this.ctx.beginPath();
            this.ctx.moveTo(this.AXIS_WIDTH + this.numLines * this.xScale,
                this.c.height - (this.lastBlueEnd / this.yScale));
            this.ctx.lineTo(this.AXIS_WIDTH + (this.numLines + 1) * this.xScale,
                this.c.height - (this.vc.numBluebugs / this.yScale));
            this.ctx.strokeStyle = "rgb(0, 0, 255)";
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(this.AXIS_WIDTH + this.numLines * this.xScale,
                this.c.height - (this.lastGreenEnd / this.yScale));
            this.ctx.lineTo(this.AXIS_WIDTH + (this.numLines + 1) * this.xScale,
                this.c.height - (this.vc.numGreenbugs / this.yScale));
            this.ctx.strokeStyle = "rgb(0, 255, 0)";
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(this.AXIS_WIDTH + this.numLines * this.xScale,
                this.c.height - (this.lastRedEnd / this.yScale));
            this.ctx.lineTo(this.AXIS_WIDTH + (this.numLines + 1) * this.xScale,
                this.c.height - (this.vc.numRedmunchers / this.yScale));
            this.ctx.strokeStyle = "rgb(255, 0, 0)";
            this.ctx.stroke();
        } else { // scrolling case
            this.ctx.beginPath();
            this.ctx.moveTo(this.c.width - ((this.c.width - this.AXIS_WIDTH) % this.xScale) - this.xScale, 
                this.c.height - (this.lastBlueEnd / this.yScale));
            this.ctx.lineTo(this.c.width - ((this.c.width - this.AXIS_WIDTH) % this.xScale),
                this.c.height - (this.vc.numBluebugs / this.yScale));
            this.ctx.strokeStyle = "rgb(0, 0, 255)";
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(this.c.width - ((this.c.width - this.AXIS_WIDTH) % this.xScale) - this.xScale,
                this.c.height - (this.lastGreenEnd / this.yScale));
            this.ctx.lineTo(this.c.width - ((this.c.width - this.AXIS_WIDTH) % this.xScale),
                this.c.height - (this.vc.numGreenbugs / this.yScale));
            this.ctx.strokeStyle = "rgb(0, 255, 0)";
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(this.c.width - ((this.c.width - this.AXIS_WIDTH) % this.xScale) - this.xScale,
                this.c.height - (this.lastRedEnd / this.yScale));
            this.ctx.lineTo(this.c.width - ((this.c.width - this.AXIS_WIDTH) % this.xScale),
                this.c.height - (this.vc.numRedmunchers / this.yScale));
            this.ctx.strokeStyle = "rgb(255, 0, 0)";
            this.ctx.stroke();

            // scolling logic
            let imageData = this.ctx.getImageData(40 + this.xScale, 0, this.c.width, this.c.height);
            this.ctx.clearRect(40, 0, this.c.width, this.c.height);
            this.ctx.putImageData(imageData, 40, 0);
        }
        this.numLines++;
        this.lastBlueEnd = this.vc.numBluebugs;
        this.lastGreenEnd = this.vc.numGreenbugs;
        this.lastRedEnd = this.vc.numRedmunchers;

    };

    clear() {
      this.ctx.clearRect(0, 0, this.c.width, this.c.height);
      this.max = 100;
    }
}