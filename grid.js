class Grid {
    constructor(size) {
        this.size = size;
        this.rows = [];
        for(let i = 0; i < this.size; i++) {
            this.rows.push([]);
            for(var j = 0; j < this.size; j++) {
              this.rows[i].push(new Cell(i, j));
            }
        }
    }
}