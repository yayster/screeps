/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.generic');
 * mod.thing == 'a thing'; // true
 */
var missionRefueling = require('mission.refueling');
var roleGeneric = {
  run: function(creep) {
    creep.say('^');
    console.log(creep.memory.mission);
    if(creep.carry.energy == 0) {
      creep.memory.mission = 'refuel';
    } 
    
    if(creep.memory.mission == 'refuel') {
      missionRefueling.run(creep);
      if(creep.carry.energy == creep.carryCapacity) { 
        creep.memory.mission = 'scout'; 
      }
    } else if(creep.memory.mission == 'scout') {
      console.log('SCOUT REPORT');
      var roadToRepair = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: function(object) {
          return object.structureType
            === STRUCTURE_CONTAINER && (object.hits < object.hitsMax * .9);
          return object.structureType 
            === STRUCTURE_ROAD && (object.hits < object.hitsMax * .9);
        } 
      });
      if(roadToRepair) {
        console.log('road to repair');
        console.log(roadToRepair.id)
        console.log(roadToRepair.pos);
        console.log(roadToRepair.hits);
        console.log(roadToRepair.hitsMax);
        creep.memory.roadToRepair = roadToRepair.id;
        creep.memory.mission = 'repair';
      } else {
        console.log('no road to repair');
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller);
        }
      }
    } else if(creep.memory.mission == 'repair') {
      console.log(creep.memory.roadToRepair);
//            creep.memory.mission = 'scout';
      roadToRepair = Game.getObjectById(creep.memory.roadToRepair);
      console.log('REPAIR REPORT')
      console.log(roadToRepair.pos);
      console.log(roadToRepair.hits);
      console.log(roadToRepair.hitsMax);
      if(roadToRepair.hits == roadToRepair.hitsMax) { 
        creep.memory.mission = 'scout'; 
      } else {
        creep.moveTo(roadToRepair);
        creep.repair(roadToRepair);
      }
    }
  }
}

module.exports = roleGeneric;
