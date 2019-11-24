const extensionPerLevel: { [level: number]: number } = {
  2: 5,
  3: 10,
  4: 20,
  5: 30,
  6: 40,
  7: 50,
  8: 60,
};

export default class ExtensionPlanerService {
  public static planExtensions(roomName: string): void {
    const level = Game.rooms[roomName].controller.level;

    if (level > 1) {
    }
  }
}
