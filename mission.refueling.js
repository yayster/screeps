/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('mission.refueling');
 * mod.thing == 'a thing'; // true
 */
var missionRefueling = {
    
    run: function(creep) {
        var target = creep.pos.findClosestByRange(FIND_SOURCES, {});
        if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
            creep.say('2S')
            creep.moveTo(target);
        } else {
            creep.say('^' + creep.carry.energy)
        }
    }
}

module.exports = missionRefueling;