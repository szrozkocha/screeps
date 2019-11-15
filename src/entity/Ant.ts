import { TaskRunner } from "../task/TaskRunner";

enum AntState {
  FREE = "🚬",
}

export class Ant {
  public static tick(name: string): void {
    const ant = Game.creeps[name];

    if (!ant.memory.activeTask) {
      Ant.say(name, AntState.FREE);
      return;
    }

    const ended = TaskRunner.run(ant, ant.memory.activeTask);

    if(ended) {
      ant.memory.activeTask = undefined;
    }
  }

  private static say(name: string, message: string): void {
    const ant = Game.creeps[name];
    ant.room.visual.text(message, ant.pos.x + 1, ant.pos.y, {align: 'left', opacity: 0.8});
  }
}