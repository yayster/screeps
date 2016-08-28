var basicTasks  = require('basic.tasks');
var spawnWorker = require('spawn.worker');
var spawnTruck  = require('spawn.truck');
var taskRefresh = require('task.refresh');
var taskRefuel  = require('task.refuel');
var taskHarvest = require('task.harvest');
var taskUpgrade = require('task.upgrade');
var taskHaul    = require('task.haul');
var controllerContainer = require('controller.container');

module.exports.loop = function () {
  var result = basicTasks.cleanUpMemory();

  // Loop through the rooms.
  for(var room_name in Game.rooms) {
    var room = Game.rooms[room_name];

    // spawn
    if( room.memory.spawnId == undefined ) {
      for(var spawn_name in Game.spawns) {
        var spawn = Game.spawns[spawn_name];
        if(Object.is(spawn.room, room)) {
          room.memory.spawnId = spawn.id;
          break;
        }
      } 
      // right here is where the code needed to handle the situation of there
      // being no spawn in a room.
      //
    } else {
      // right here is where the code needed to handle the situation of having
      // the known spawn of a room be destroyed
      var spawn = Game.getObjectById(room.memory.spawnId);
    } 
    if( spawn.memory.initialized == undefined || 0 ){
      console.log('spawn initializing');
      if(spawn.memory.desiredWorkers == undefined) {
        spawn.memory.desiredWorkers = 1;
      }
      if(spawn.memory.workers == undefined) {
        spawn.memory.workers = [];
      }
      spawn.memory.initialized = 1;
    }
    if(spawn.memory.workers.length < spawn.memory.desiredWorkers &&
       room.energyAvailable >= 300) {
      spawn.memory.workers.push(spawnWorker.run(spawn,undefined,'harvest'));
    }       

    // controller
    var controller = room.controller;
    if(controller.my) {
      if(room.memory.controllerInitialized == undefined || 0){
        console.log('room controller initializing');
        if(room.memory.controllerDesiredWorkers == undefined) {
          room.memory.controllerDesiredWorkers = 2;
        }
        if(room.memory.controllerWorkers == undefined) {
          room.memory.controllerWorkers =[];
        }
        room.memory.controllerInitialized =1;
      }      
      if(room.memory.controllerWorkers.length 
          <  room.memory.controllerDesiredWorkers 
          && room.energyAvailable >= 300) {
        room.memory.controllerWorkers.push(
          spawnWorker.run(spawn,undefined,'upgrade')
        );
      }
          
      if(room.memory.controllerContainerId == undefined) {
        console.log('There is no container for the controller');
        controllerContainer.run(controller);
      } else { 
      }
    } else {
      console.log('This controller is not mine.');
    }

  }

  for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    if(creep.ticksToLive <= 135 || creep.memory.refresh == 'true')  {
      taskRefresh.run(creep);  
    } else if((creep.carry.energy == 0 || creep.memory.refuel == 'true')
      && creep.memory.role == 'worker' ) {
      taskRefuel.run(creep);
    } else if(creep.memory.task == 'harvest') {
      taskHarvest.run(creep);
    } else if(creep.memory.task == 'upgrade') {
      taskUpgrade.run(creep);
    } else if(creep.memory.task == 'haul') {
      taskHaul.run(creep);
    }
  }
}
