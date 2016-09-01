module.exports = {
  run: function(spawn, name, task) {
    spawn.createCreep([MOVE,WORK,WORK,CARRY],
      name,
      {role: 'miner', task: task}
    );
  }
}
