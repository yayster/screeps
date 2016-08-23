module.exports = {
  list: function() {
    var s;
    for (s of Object.keys(Game.rooms )) {
      console.log(s);
      console.log(Game.rooms[s].find(FIND_SOURCES));
   for(let source of Game.rooms[s].find(FIND_SOURCES)) {
/*        console.log(Game.rooms[s].find(FIND_SOURCES)[source]);
        console.log(Game.rooms[s].find(FIND_SOURCES)[source].id);
        console.log(Game.rooms[s].find(FIND_SOURCES)[source].pos);
*/      }
    }
    return 'OK';
  }
}
/*
var reportsTest = {
  run: function(creep) {
    console.log('Hello, world.');
    var s, myTestArray = ["alpha","bravo","charlie"];
    for (s of myTestArray) {
      console.log(s);
    }
    for (s of Object.keys(Game.rooms)) {
      console.log(s);
    }
  }
}
module.exports = reportsTest;
*/
