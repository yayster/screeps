var roleUpgrader = {
  run: function(creep) {
    creep.memory.preferredSourceId = creep.room.controller.controllerSourceId;
    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      if(creep.fatigue > 0) {
        creep.room.createConstructionSite(creep.pos,STRUCTURE_ROAD);
      }
      creep.moveTo(creep.room.controller);    
    }
  }
};

module.exports = roleUpgrader;
