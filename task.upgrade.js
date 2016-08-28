var roleUpgrader = {
  run: function(creep) {
    creep.memory.preferredSourceId = creep.room.controller.controllerSourceId;
    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller);    
    }
  }
};

module.exports = roleUpgrader;
