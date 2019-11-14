import { TaskType } from "../types/TaskType";

enum AnthillState {
  FREE = "🚬",
  BUSY = "⚙",
  UNABLE = "⛔",
  ERROR = "🚨"
}

export class Anthill {
  public static tick(name: string): void {
    const spawn = Game.spawns[name];

    if (!spawn.memory.activeTask) {
      Anthill.say(name, AnthillState.FREE);
      return;
    }

    if (spawn.spawning) {
      Anthill.say(name, AnthillState.BUSY);
      return;
    }

    if (spawn.memory.activeTask.type === TaskType.CREATE_ANT) {
      if(!spawn.memory.spawningAntName) {
        if(spawn.store.getUsedCapacity(RESOURCE_ENERGY) < 250) {
          Anthill.say(name, AnthillState.UNABLE);
          return;
        }
        const antName = "Ant_" + Date.now();
        Anthill.say(name, AnthillState.BUSY);
        spawn.spawnCreep([WORK, CARRY, MOVE, MOVE], antName);
        spawn.memory.spawningAntName = antName;
      } else {
        Anthill.say(name, AnthillState.BUSY);
        const ants = Memory.rooms[spawn.room.name].entities.ants;
        ants[ants.length] = Game.creeps[spawn.memory.spawningAntName].id;// Because fucking push don't work, that's why

        spawn.memory.spawningAntName = undefined;
        spawn.memory.activeTask = undefined;
      }
    } else {
      Anthill.say(name, AnthillState.ERROR);
    }
  }

  private static say(name: string, message: string): void {
    const spawn = Game.spawns[name];
    spawn.room.visual.text(message, spawn.pos.x + 1, spawn.pos.y, {align: 'left', opacity: 0.8});
  }
}
