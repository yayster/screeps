var roleHarvester   = require('role.harvester');
var roleUpgrader    = require('role.upgrader');
var roleBuilder     = require('role.builder');
var roleRepairer    = require('role.repairer');
var roleGeneric     = require('role.generic');

var creep_count_generic     = 8;
var creep_count_harvester   = 4;
var creep_count_builder     = 4;
var creep_count_repairer    = 0;
var creep_count_upgrader    = 4;
var creep_count_attacker    = 0;

module.exports.loop = function () {
    console.log('BEGIN CPU CYCLE:');
    console.log('----------------');
    var spawner_energy_level = Game.spawns['Yayster1'].energy / Game.spawns['Yayster1'].energyCapacity * 100;
    console.log('Spawner energy level: ' + spawner_energy_level.toFixed(2) + '%');
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    if(harvesters.length < creep_count_harvester) {
        var newName = Game.spawns['Yayster1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);
    if(upgraders.length < creep_count_upgrader) {
        var newName = Game.spawns['Yayster1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);
    if(builders.length < creep_count_builder) {
        var newName = Game.spawns['Yayster1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
    }
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    console.log('Repairers ' + repairers.length);
    if(repairers.length < creep_count_repairer) {
        var newName = Game.spawns['Yayster1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'repairer'});
        console.log('Spawning new repairer: ' + newName);
    }
    var generics = _.filter(Game.creeps, (creep) => creep.memory.role == 'generic');
    console.log('Generics: ' + generics.length);
    if(generics.length < creep_count_generic) {
        var newName = Game.spawns['Yayster1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'generic'});
        console.log('Spawning new generic: ' + newName);
    }
    var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
    console.log('Attackers: ' + attackers.length);
    if(attackers.length < creep_count_attacker) {
        if( Game.spawns['Yayster1'].energy > 230 ) {
            var newName = Game.spawns['Yayster1'].createCreep([ATTACK,MOVE,WORK], undefined, {role: 'attacker'});
            console.log('Spawning new attacker: ' + newName);
        } else {
            console.log('waiting for higher energy level before spawn.')
        }
    }
    

    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        /*
        var message = 'Figuring out what to do with ' + name;
        message += ' who is a(n) ' + creep.memory.role;
        message += ' and has ' + creep.ticksToLive + ' ticks to live.';
        console.log( message )
        */
        if(creep.memory.role == 'generic') {
            roleGeneric.run(creep);
/*            
            if(spawner_energy_level == 100) {
                console.log('let me upgrade the room controller')
                roleUpgrader.run(creep);
            } else {
                console.log('the spawn point needs energy.')
                roleHarvester.run(creep);
            }
*/
        }
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep)
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'attacker') {
//            creep.moveTo(47,12);
//            var wall_target = new RoomPosition( 46,12,'Room W45N57');
//            creep.attack( wall_target );
        }
    }
}