var controllerContainer  = {
  run: function(controller) {
    if(controller.room.memory.controllerSourceId == undefined) {
      var nearest_source = controller.pos.findClosestByPath(FIND_SOURCES, {});
      controller.room.memory.controllerSourceId = nearest_source.id;
    }
    var nearest_source = 
      Game.getObjectById(controller.room.memory.controllerSourceId);
// This is a real mess
//
    if(controller.room.memory.controllerContainer_tempConstructed ==
      undefined) {
      if(nearest_source.pos.x - controller.pos.x > 1){ 
        if(nearest_source.pos.y - controller.pos.y > 1){
Loop1:
for(var x = controller.pos.x + 3; x >= controller.pos.x; x--) {
  for(var y = controller.pos.y + 3; y >= controller.pos.y; y--) {
    var result = 
      controller.room.createConstructionSite(x,y, STRUCTURE_CONTAINER);
    if( result == 0 ) {
      controller.room.memory.controllerContainer_tempConstructed = 1;
      controller.room.memory.controllerContainer_tempX = x;
      controller.room.memory.controllerContainer_tempY = y;
      break Loop1; 
    }
  }
}
        } else {
Loop2:
for(var x = controller.pos.x + 3; x >= controller.pos.x; x--) {
  for(var y = controller.pos.y - 3; y <= controller.pos.y; y++) { 
    var result = 
      controller.room.createConstructionSite(x,y, STRUCTURE_CONTAINER);
    if( result == 0 ) { 
      controller.room.memory.controllerContainer_tempConstructed = 1;
      controller.room.memory.controllerContainer_tempX = x;
      controller.room.memory.controllerContainer_tempY = y;
      break Loop2; 
    } 
  }
}
        }
      } else {
        if(nearest_source.pos.y - controller.pos.y > 1){
Loop3:
for(var x = controller.pos.x - 3; x <= controller.pos.x; x++) {
  for(var y = controller.pos.y + 3; y >= controller.pos.y; y--) { 
    var result = 
      controller.room.createConstructionSite(x,y, STRUCTURE_CONTAINER);
    if( result == 0 ) { 
      controller.room.memory.controllerContainer_tempConstructed = 1;
      controller.room.memory.controllerContainer_tempX = x;
      controller.room.memory.controllerContainer_tempY = y;
      break Loop3; 
    } 
  } 
}
        } else {
Loop4:
for(var x = controller.pos.x - 3; x <= controller.pos.x; x++) {
  for(var y = controller.pos.y + 3; y >= controller.pos.y; y--) {
    var result = 
      controller.room.createConstructionSite(x,y, STRUCTURE_CONTAINER);
    if( result == 0 ) { 
      controller.room.memory.controllerContainer_tempConstructed = 1;
      controller.room.memory.controllerContainer_tempX = x;
      controller.room.memory.controllerContainer_tempY = y;
      break Loop4; 
    }  
  }  
}
      }      
    }

    } else {
      var x = controller.room.memory.controllerContainer_tempX;
      var y = controller.room.memory.controllerContainer_tempY;
      var found = controller.room.lookForAt( LOOK_CONSTRUCTION_SITES, x, y);
      if(found) {
        for(var thing in found){
          if(found[thing].structureType == STRUCTURE_CONTAINER) {
            controller.room.memory.controllerContainerId = found[thing].id;
            controller.room.memory.controllerContainerConstruction = 1;
          } else {
            console.log(found[thing].structureType);
          }
        }
        delete controller.room.memory.controllerContainer_tempConstructed;
        delete controller.room.memory.controllerContainer_tempX;
        delete controller.room.memory.controllerContainer_tempY;
      } else {
      }
    }
    return 'OK';
  }
}
module.exports = controllerContainer;
