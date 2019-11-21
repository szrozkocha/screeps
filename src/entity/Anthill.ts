import TaskRunner from '../task/TaskRunner';
import TaskType from '../task/TaskType';
import CompoundTask from '../task/CompoundTask';
import GoToTask from '../task/ant/GoToTask';
import TransferTask from '../task/ant/TransferTask';
import TaskTag from '../task/TaskTag';

export enum AnthillState {
  FREE = '🚬',
  BUSY = '⚙',
  UNABLE = '⛔',
  ERROR = '🚨',
}

export class Anthill {
  public static tick(id: Id<StructureSpawn>, roomMemory: RoomMemory): void {
    const anthill = Game.getObjectById(id);

    if (!anthill.memory.activeTask) {
      Anthill.say(anthill, AnthillState.FREE);
      return;
    }

    const ended = TaskRunner.runAnthill(anthill, anthill.memory.activeTask);

    if (ended) {
      anthill.memory.spawningAntName = undefined;
      anthill.memory.activeTask = undefined;
    }

    if (anthill.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
      roomMemory.activeTasks[TaskType.COMPOUND].push(
        new CompoundTask(
          [new GoToTask(id, Number.MAX_VALUE, anthill.id), new TransferTask(id, Number.MAX_VALUE, anthill.id)],
          1,
          anthill.id,
          [TaskTag.FULL_ANT],
        ),
      );
    }
  }

  public static say(anthill: StructureSpawn, message: string): void {
    anthill.room.visual.text(message, anthill.pos.x + 1, anthill.pos.y, { align: 'left', opacity: 0.8 });
  }
}
