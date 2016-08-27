var basicTasks = require('basic.tasks');
var spawnWorker = require('spawn.worker');
//var creepManagement = require('creep.management');
var taskRefresh = require('task.refresh');
var taskRefuel = require('task.refuel');
var taskHarvest = require('task.harvest');
var taskUpgrade = require('task.upgrade');


const desired_workers = 9;
const desired_grunts  = 8;

module.exports.loop = function () {
  console.log('----- Begin Game Tick -----');
  console.log('CPU used  : ' + Game.cpu.getUsed());
  console.log('Game.time : ' + Game.time);
  console.log('GCL       : ' + Game.gcl.level + ' ' + Game.gcl.progress);

  var result = basicTasks.cleanUpMemory();
  console.log('CPU used: ' + Game.cpu.getUsed());

  console.log('total creeps: ' + Object.keys(Game.creeps).length);
  var creepWorkers = _.filter(Game.creeps,
    (creep) => creep.memory.role == 'worker');
  console.log('     workers: ' + Object.keys(creepWorkers).length);

  for(var room_name in Game.rooms) {
    console.log('Examining ' + room_name + ':');
    var room = Game.rooms[room_name];
    var controller = room.controller;
    console.log('Controller level: ' + controller.level);
    console.log('   to next level: ' + 
      ( controller.progressTotal - controller.progress ));
    for(var spawn_name in Game.spawns) {
      var spawn = Game.spawns[spawn_name];
      if(Object.is(spawn.room, room)) {
        console.log('Examining ' + spawn_name + ':');
        console.log('Energy Available: ' + room.energyAvailable);
        if( Object.keys(creepWorkers).length < desired_workers ) {
          console.log('  trying to spawn another worker.');
          if( Object.keys(creepWorkers).length == 0 ) {
            spawnWorker.run(spawn, 'harvest'); 
          } else {
            spawnWorker.run(spawn, 'upgrade');
          }
        }
        console.log('Energy Available: ' + room.energyAvailable);
        console.log('CPU used: ' + Game.cpu.getUsed());
      }
    }
    console.log('CPU used: ' + Game.cpu.getUsed());
  }
  console.log('CPU used: ' + Game.cpu.getUsed());

  for(var name in Game.creeps) {
    console.log('Directing ' + name + ':');
    var creep = Game.creeps[name];
    console.log('    life: ' + creep.ticksToLive);
    console.log('   alive: ' + creep.memory.ticks_alive);
    creep.memory.ticks_alive++;
    if(creep.ticksToLive <= 135 || creep.memory.refresh == 'true')  {
      taskRefresh.run(creep);  
    } else if(creep.carry.energy == 0 || creep.memory.refuel == 'true') {
      taskRefuel.run(creep);
    } else if(creep.memory.task == 'harvest') {
      taskHarvest.run(creep);
    } else if(creep.memory.task == 'upgrade') {
      taskUpgrade.run(creep);
    }
  }
  console.log('CPU used: ' + Game.cpu.getUsed());

}
