var missionRefueling = {
  run: function(creep) {
    creep.memory.refuel = 'true';
    if( creep.memory.preferredSourceId == undefined ) {
      var target = creep.pos.findClosestByPath(FIND_SOURCES, {});
      if(target) { creep.memory.perferredSourceId = target.id; }
    } else {
      var target = Game.getObjectById( creep.memory.preferredSourceId );
    }
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
