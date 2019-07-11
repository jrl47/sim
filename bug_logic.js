doBugLogic = function (grid, agents, i, j) {
    if (grid.rows[i][j].agent !== null && grid.rows[i][j].agent.type === 'greenbug' &&
    grid.rows[i][j].agent.done === false) {

    let greenbug = grid.rows[i][j].agent;
    greenbug.done = true;
    if (grid.rows[i][j].state.green > 0) {
      greenbug.stomach += Math.min(50, grid.rows[i][j].state.green);
      grid.rows[i][j].state.green -= Math.min(60, grid.rows[i][j].state.green);
    }
    greenbug.stomach -= 14;
    grid.rows[i][j].agent = null;
    let willReproduce = false;
    if (greenbug.stomach > 255) {
      willReproduce = true;
    }
    if (greenbug.stomach > 0) { // RIP greenbug if empty stomach, otherwise it moves instead of dies
      let direction = randInt(0, 3);
      let destinationCell = grid.rows[mod(i + ORTH_SHIFTS_X[direction], grid.size)][mod(j + ORTH_SHIFTS_Y[direction], grid.size)];
      if (destinationCell.agent === null) {
        destinationCell.agent = greenbug;
        if (willReproduce) {
          let baby = {
            type: 'greenbug',
            done: true, // "summoning sickness!"
            stomach: 100
          };
          greenbug.stomach = 100;
          grid.rows[i][j].agent = baby;
          agents.push(baby);
        }
      } else {
        grid.rows[i][j].agent = greenbug;
      }
    } else {
      greenbug.dead = true;
    }
  }
}