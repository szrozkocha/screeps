export class Init {
  public static init(): void {
    if(Memory.initialized) {
      return;
    }
    Memory.initialized = true;

    console.log("INIT!");
    for (const roomName in Game.rooms) {
      const room = Game.rooms[roomName];
      const spawns = room.find(FIND_MY_SPAWNS);

      Memory.rooms[roomName] = {
        activeTasks: {
          0: []
        },
        entities: {
          anthills: spawns.map(spawn => spawn.id),
          ants: []
        }
      };
    }
  }
}
