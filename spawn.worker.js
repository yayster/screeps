var spawnWorker = {
  run: function(spawn, name, task) {
    return spawn.createCreep([MOVE,WORK,CARRY,CARRY,CARRY],
      name,
      {role: 'worker', task: task}
    );
  }
}

module.exports = spawnWorker;
