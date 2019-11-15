import { TaskRunner } from "../task/TaskRunner";

export enum AnthillState {
  FREE = "🚬",
  BUSY = "⚙",
  UNABLE = "⛔",
  ERROR = "🚨"
}

export class Anthill {
  public static tick(name: string): void {
    const anthill = Game.spawns[name];

    if (!anthill.memory.activeTask) {
      Anthill.say(anthill, AnthillState.FREE);
      return;
    }

    const ended = TaskRunner.run(anthill, anthill.memory.activeTask);

    if(ended) {
      anthill.memory.spawningAntName = undefined;
      anthill.memory.activeTask = undefined;
    }
  }

  public static say(anthill: StructureSpawn, message: string): void {
    anthill.room.visual.text(message, anthill.pos.x + 1, anthill.pos.y, {align: 'left', opacity: 0.8});
  }
}
