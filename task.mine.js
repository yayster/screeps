var missionRefueling = {
  run: function(creep) {
    if( creep.memory.preferredSourceId == undefined ) {
      var target = creep.pos.findClosestByPath(FIND_SOURCES, {});
      if(target) { creep.memory.perferredSourceId = target.id; }
    } else {
      var target = Game.getObjectById( creep.memory.preferredSourceId );
    }
    if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }
  }
}

module.exports = missionRefueling;
