var taskHarvest = {
  run: function(creep) {
    var targets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return  (structure.structureType == STRUCTURE_EXTENSION ||
                 structure.structureType == STRUCTURE_SPAWN ||
                 structure.structureType == STRUCTURE_TOWER
                ) && structure.energy < structure.energyCapacity;
        }
      });
    if(targets.length > 0) {
      if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0]);
      }
    } else {
      creep.say('~');
      creep.moveTo(18,22);
    }
  }
};

module.exports = taskHarvest;
