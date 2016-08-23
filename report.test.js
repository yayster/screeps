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

