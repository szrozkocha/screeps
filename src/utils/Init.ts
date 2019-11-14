export class Init {
  public static init(): void {
    if(Memory.initialized) {
      return;
    }
    Memory.initialized = true;

    console.log("INIT!");
    for (const roomName in Game.rooms) {
      const room = Game.rooms[roomName];
      const anthills = room.find(FIND_MY_SPAWNS);
      const energySources = room.find(FIND_SOURCES);

      Memory.rooms[roomName] = {
        activeTasks: {
          0: [],
          1: [],
          2: []
        },
        entities: {
          anthills: anthills.map(spawn => spawn.id),
          ants: [],
          energySources: energySources.map(spawn => spawn.id)
        }
      };
    }
  }
}
