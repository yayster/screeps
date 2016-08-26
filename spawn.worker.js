module.exports = {
  run: function(spawn, task) {
    spawn.createCreep([MOVE,MOVE,WORK,CARRY,CARRY],
      undefined,
      {role: 'worker', task: task}
    );
  }
}
