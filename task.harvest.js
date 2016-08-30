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
//    if(targets.length > 0 && (creep.carry.energy == creep.carryCapacity))
    if(targets.length > 0 ) {
      if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0]);
      }
    } else {
      creep.say('~');
      var target = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES,
        {filter: { structureType: STRUCTURE_ROAD }});
      if(target) {
        if(creep.build(target) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      } else {
        var targets = creep.room.find(FIND_STRUCTURES, {
          filter: function(object) {
            return object.structureType == STRUCTURE_ROAD && 
              (object.hits < object.hitsMax)}});
        if(targets) {
          if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0])
          }
        } else {
          creep.moveTo(25,26);
        }
      }
    }
  }
};

module.exports = taskHarvest;
