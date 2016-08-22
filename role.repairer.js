/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.repairer');
 * mod.thing == 'a thing'; // true
 */
var roleRepairer = {
    run: function(creep) {
        
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }
                
        if(creep.memory.building) {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function(object) {
                    return object.structureType === STRUCTURE_ROAD && (object.hits > object.hitsMax / 20);
                }
            });
            if(target) {
                creep.say('R'+creep.carry.energy+'F');
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                creep.say('R~');
                creep.moveTo(41,11);
            }
        } else {
            var source = creep.pos.findClosestByRange(FIND_SOURCES, {});
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.say('R2S');
                creep.moveTo(source);
            } else {
                creep.say('R'+creep.carry.energy);
            }
        }
    }
}

module.exports = roleRepairer;