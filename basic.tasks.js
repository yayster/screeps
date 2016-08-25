module.exports = {

  cleanUpMemory: function() {
    for(var name in Memory.creeps) {
      if(!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing memory of non-existing creep: ' +  name);
      }
    }
    return 'OK';
  }

}
