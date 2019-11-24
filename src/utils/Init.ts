export default class Init {
  public static init(): void {
    if (Memory.initialized) {
      return;
    }
    Memory.initialized = true;

    console.log('INIT!');
    for (const roomName in Game.rooms) {
      const room = Game.rooms[roomName];
      const anthills = room.find(FIND_MY_SPAWNS);

      Memory.rooms = {};

      Memory.rooms[roomName] = {
        activeTasks: {
          0: [],
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
        },
        entities: {
          anthills: anthills.map(spawn => spawn.id),
          ants: [],
          energySources: Init.initSources(room.find(FIND_SOURCES)),
          constructionSites: [],
        },
        roadPlaner: {
          visitedCount: {},
        },
      };
    }
  }

  private static initSources(energySources: Source[]): { [id: string]: SourceMemory } {
    return energySources.reduce((map: { [id: string]: SourceMemory }, source) => {
      const id: string = source.id as string;
      const sourcePos = source.pos;

      map[id] = {
        accessPositions: sourceNeighbours.filter(pos => {
          return source.room.getTerrain().get(sourcePos.x + pos.x, sourcePos.y + pos.y) !== TERRAIN_MASK_WALL;
        }),
        bondedAnts: [],
        lostEnergy: 0,
      };

      return map;
    }, {});
  }
}

const sourceNeighbours = [
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },

  { x: -1, y: 0 },
  /* source location */
  { x: 1, y: 0 },

  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];
