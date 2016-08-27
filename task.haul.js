var taskHaul = {
  run: function(creep) {
    if(creep.carry.energy == 0) {
      creep.moveTo(Game.flags['pickup'].pos);
    } else if(creep.carry.energy == creep.carryCapacity) {
      creep.moveTo(Game.flags['dropoff'].pos);
    }
  }
};

module.exports = taskHaul;
