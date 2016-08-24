var roleHarvester   = require('role.harvester');
var roleUpgrader    = require('role.upgrader');
var roleBuilder     = require('role.builder');
var roleRepairer    = require('role.repairer');
var roleGeneric     = require('role.generic');
var reportTest      = require('report.test');
var greetings       = require("greetings");
//Game.scout           = require('./scout');

var creep_count_generic     = 0;
var creep_count_harvester   = 1;
var creep_count_builder     = 1;
var creep_count_repairer    = 0;
var creep_count_upgrader    = 9;
var creep_count_attacker    = 0;

module.exports.loop = function () {
  var main_spawn = Game.spawns['Spawn1'];
// scout
//
// Begin the scout phase by getting all the room names that we operate in. 
  for(let room_name of Object.keys(Game.rooms)) {
    var room = Game.rooms[room_name];
    if(room.memory.inital_scout == null) {
      var room_spawn_name = null;
      for(let spawn of Object.keys(Game.spawns)) {
        var test_string = '[room ' + room_name +']';
        if( Game.spawns[spawn].room == test_string) {
          room_spawn_name = spawn;
        }
      }
      if( room_spawn_name ) {
        var room_spawn = Game.spawns[room_spawn_name];
        var room_spawn_x = room_spawn.pos.x;
        var room_spawn_y = room_spawn.pos.y - 1;
        for(let source of room.find(FIND_SOURCES)) {
          var x = null;
          var y = null;
          if(source.pos.x >= room_spawn_x) {
            if(source.pos.y >= room_spawn_y) {
Loop1:
for(x = source.pos.x - 1; x <= source.pos.x + 1; x++) {
  for( y = source.pos.y -1; y <= source.pos.y + 1; y++) {
    var result = room.createConstructionSite(x,y, STRUCTURE_CONTAINER);
    if( result == 0 ) { break Loop1; }
  }
}          
            } else {
Loop2: 
for(x = source.pos.x - 1; x <= source.pos.x + 1; x++) {
  for( y = source.pos.y +1; y >= source.pos.y - 1; y--) {
    var result = room.createConstructionSite(x,y, STRUCTURE_CONTAINER); 
    if( result == 0 ) { break Loop2; }
  }
}
            }
          } else {
            if(source.pos.y >= room_spawn_y) {
Loop3: 
for(x = source.pos.x + 1; x >= source.pos.x - 1; x--) {
  for( y = source.pos.y -1; y <= source.pos.y + 1; y++) {
    var result = room.createConstructionSite(x,y, STRUCTURE_CONTAINER); 
    if( result == 0 ) { break Loop3; }
  }
}
            } else {
Loop4:
for(x = source.pos.x + 1; x >= source.pos.x - 1; x--) {
  for( y = source.pos.y +1; y >= source.pos.y - 1; y--) {
    var result = room.createConstructionSite(x,y, STRUCTURE_CONTAINER);
    if( result == 0 ) { break Loop4; }
  }
}
            }
          }
        }
      }      
      room.memory.inital_scout = 1;
    }
  }

//  console.log(greetings.sayHelloInSpanish());
//  reportTest.run(creep);
//    console.log('BEGIN CPU CYCLE:');
//    console.log('----------------');
    var spawner_energy_level = Game.spawns['Spawn1'].energy / Game.spawns['Spawn1'].energyCapacity * 100;
//    console.log('Spawner energy level: ' + spawner_energy_level.toFixed(2) + '%');
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
//    console.log('Harvesters: ' + harvesters.length);
    if(harvesters.length < creep_count_harvester) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
//        console.log('Spawning new harvester: ' + newName);
    }
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
//    console.log('Upgraders: ' + upgraders.length);
    if(upgraders.length < creep_count_upgrader) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
//        console.log('Spawning new upgrader: ' + newName);
    }
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
//    console.log('Builders: ' + builders.length);
    if(builders.length < creep_count_builder) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
//        console.log('Spawning new builder: ' + newName);
    }
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
//    console.log('Repairers ' + repairers.length);
    if(repairers.length < creep_count_repairer) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'repairer'});
//        console.log('Spawning new repairer: ' + newName);
    }
    var generics = _.filter(Game.creeps, (creep) => creep.memory.role == 'generic');
//    console.log('Generics: ' + generics.length);
    if(generics.length < creep_count_generic) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'generic'});
//        console.log('Spawning new generic: ' + newName);
    }
    var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
//    console.log('Attackers: ' + attackers.length);
    if(attackers.length < creep_count_attacker) {
        if( Game.spawns['Spawn1'].energy > 230 ) {
            var newName = Game.spawns['Spawn1'].createCreep([ATTACK,MOVE,WORK], undefined, {role: 'attacker'});
//            console.log('Spawning new attacker: ' + newName);
        } else {
//            console.log('waiting for higher energy level before spawn.')
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
