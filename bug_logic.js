doSharedBugLogic = function(grid, bug, i, j) {
    bug.done = true;
    // TODO add more to this function once different bug types are actually Classes
}

doGreenbugLogic = function(grid, greenbug, i, j) {
    doSharedBugLogic(grid, greenbug, i, j);

    if (grid.rows[i][j].state.green > 0) {
      greenbug.stomach += Math.min(66, grid.rows[i][j].state.green);
      grid.rows[i][j].state.green -= Math.min(66, grid.rows[i][j].state.green);
    }
    greenbug.stomach -= 19;
    grid.rows[i][j].agent = null;
    let willReproduce = false;
    if (greenbug.stomach > 511) {
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
            stomach: 60
          };
          numGreenbugs++; // it seems unfortunate that this logic must live here for now
          greenbug.stomach = 80;
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

doBluebugLogic = function(grid, bluebug, i, j) {
    doSharedBugLogic(grid, bluebug, i, j);

    if (grid.rows[i][j].state.blue > 0) {
      bluebug.stomach += Math.min(55, grid.rows[i][j].state.blue);
      grid.rows[i][j].state.blue -= Math.min(55, grid.rows[i][j].state.blue);
    }
    bluebug.stomach -= 14;
    grid.rows[i][j].agent = null;
    let willReproduce = false;
    if (bluebug.stomach > 511) {
      willReproduce = true;
    }
    if (bluebug.stomach > 0) { // RIP bluebug if empty stomach, otherwise it moves instead of dies
      if (bluebug.stomach < 120) { // bluebugs are usually steadfast in their direction. but they have limits...
        bluebug.direction = randInt(0, 3);
      }
      let direction = bluebug.direction;
    //   console.log(grid + ' ' + mod(i + ORTH_SHIFTS_X[direction], grid.size) + ' '+  mod(j + ORTH_SHIFTS_Y[direction], grid.size));
      let destinationCell = grid.rows[mod(i + ORTH_SHIFTS_X[direction], grid.size)]
      [mod(j + ORTH_SHIFTS_Y[direction], grid.size)];
      if (destinationCell.agent === null) {
        destinationCell.agent = bluebug;
        if (willReproduce) {
          let baby = {
            type: 'bluebug',
            done: true, // "summoning sickness!"
            stomach: 115,
            direction: 1
          };
          numBluebugs++; // it seems unfortunate that this logic must live here for now
          bluebug.stomach = 120;
          bluebug.direction = 0;
          grid.rows[i][j].agent = baby;
          agents.push(baby);
        }
      } else {
        grid.rows[i][j].agent = bluebug;
        bluebug.direction = randInt(0, 3);
      }
    } else {
      bluebug.dead = true;
    }
}

doBugLogic = function (grid, agents, i, j) {
    if (grid.rows[i][j].agent !== null && grid.rows[i][j].agent.done === false) {
        if (grid.rows[i][j].agent.type === 'greenbug') {
            doGreenbugLogic(grid, grid.rows[i][j].agent, i, j);
        } else if (grid.rows[i][j].agent.type === 'bluebug') {
            doBluebugLogic(grid, grid.rows[i][j].agent, i, j);
        }
    }
}