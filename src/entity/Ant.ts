import { TaskType } from "../types/TaskType";

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

    if(ant.memory.activeTask.type === TaskType.COMPOUND) {
      const compoundTask: CompoundTask = ant.memory.activeTask as CompoundTask;

      if(compoundTask.subtasks.length === 0) {
        ant.memory.activeTask = undefined;
      } else {
        const subtask = compoundTask.subtasks[0];

        if (subtask.type === TaskType.GO_TO) {
          const task: GoToTask = subtask as GoToTask;
          const destination: RoomPosition | { pos: RoomPosition } = Game.getObjectById(task.destinationId) as RoomPosition | { pos: RoomPosition };

          const distance = ant.pos.getRangeTo(destination);

          if(distance > 1) {
            ant.moveTo(destination, {visualizePathStyle: {stroke: '#ffaa00'}});
          } else {
            compoundTask.subtasks.shift();
          }
        } else if(subtask.type === TaskType.HARVEST) {
          const task: HarvestTask = subtask as HarvestTask;

          if(ant.store.getUsedCapacity(RESOURCE_ENERGY) < task.amount) {
            const source: Source | Mineral = Game.getObjectById(task.sourceId) as Source | Mineral;

            ant.harvest(source);
          } else {
            compoundTask.subtasks.shift();
          }
        }
      }
    }
  }

  private static say(name: string, message: string): void {
    const ant = Game.creeps[name];
    ant.room.visual.text(message, ant.pos.x + 1, ant.pos.y, {align: 'left', opacity: 0.8});
  }
}