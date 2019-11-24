const VISITATION_TO_BUILD_ROAD = 100;
const CONTROLER_LEVEL_TO_START = 3;

export default class RoadPlanerService {
  // TODO improve
  public static planRoads(roomName: string): void {
    if (Game.rooms[roomName].controller.level < CONTROLER_LEVEL_TO_START) {
      return;
    }

    const memory = Memory.rooms[roomName].roadPlaner;

    for (const x in memory.visitedCount) {
      for (const y in memory.visitedCount[x]) {
        if (memory.visitedCount[x][y].count >= VISITATION_TO_BUILD_ROAD && !memory.visitedCount[x][y].build) {
          const position = Game.rooms[roomName].getPositionAt(Number.parseInt(x), Number.parseInt(y));

          const returnCode = position.createConstructionSite(STRUCTURE_ROAD);
          Memory.rooms[roomName].entities.constructionSites.push({
            position: { x: position.x, y: position.y },
            type: STRUCTURE_ROAD,
          });

          if (returnCode == OK) {
            memory.visitedCount[x][y].build = true;
          }
        }
      }
    }
  }

  public static addVisitedPlace(pos: RoomPosition) {
    if (Game.rooms[pos.roomName].controller.level < CONTROLER_LEVEL_TO_START) {
      return;
    }

    const memory = Memory.rooms[pos.roomName].roadPlaner;

    if (!memory.visitedCount[pos.x]) {
      memory.visitedCount[pos.x] = {};
    }

    if (!memory.visitedCount[pos.x][pos.y]) {
      memory.visitedCount[pos.x][pos.y] = {
        count: 0,
        build: false,
      };
    }

    if (!memory.visitedCount[pos.x][pos.y].build) {
      ++memory.visitedCount[pos.x][pos.y].count;
    }
  }
}
