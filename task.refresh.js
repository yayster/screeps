var taskRefresh = {

  /** @param {Creep} creep **/
  run: function(creep) {
    creep.memory.refresh = 'true';
    var room_spawn = _.filter(Game.spawns,
      (spawn) => spawn.room.name == creep.room.name);
    if(room_spawn[0].renewCreep(creep) == ERR_NOT_IN_RANGE) {
      creep.room.createConstructionSite(creep.pos,STRUCTURE_ROAD);
      creep.moveTo(room_spawn[0]);
      creep.say('Help! '+creep.ticksToLive);
    } else {
      creep.transfer(room_spawn[0], RESOURCE_ENERGY);
    }
    if(creep.ticksToLive >= 1350) { creep.memory.refresh = 'false'; }
  }
};

module.exports = taskRefresh;
