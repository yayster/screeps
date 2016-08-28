module.exports = {
  run: function(spawn, task) {
    spawn.createCreep([MOVE,CARRY,CARRY,CARRY,CARRY,CARRY],
      undefined,
      {role: 'truck', task: task}
    );
  }
}
