var missionRefueling = {
  run: function(creep) {
    creep.memory.refuel = 'true';
    var target = 
//Game.getObjectById(creep.memory.preferredSource).pos ||
      creep.pos.findClosestByRange(FIND_SOURCES, {});
    if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
      creep.say('2S')
      creep.moveTo(target);
    } else {
      creep.say('^' + creep.carry.energy)
    }
    if(creep.carry.energy == creep.carryCapacity) {
      creep.memory.refuel = 'false';
    }
  }
}

module.exports = missionRefueling;
