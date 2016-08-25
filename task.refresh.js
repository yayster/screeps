/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester'); 
 * mod.thing == 'a thing'; // true
 */
var roleBuilder = require('role.builder');
var roleHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {
    creep.memory.refresh = 'true';
    var room_spawn = _.filter(Game.spawns,
      (spawn) => spawn.room.name == creep.room.name);
    if(room_spawn[0].renewCreep(creep) == ERR_NOT_IN_RANGE) {
      creep.moveTo(room_spawn[0]);
      creep.say('Help!');
    }
    if(creep.ticksToLive >= 1350) { creep.memory.refresh = 'false'; }
  }
};

module.exports = roleHarvester;
