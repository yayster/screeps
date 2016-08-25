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

