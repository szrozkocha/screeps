import TaskType from '../task/TaskType';
import GoToTask from '../task/ant/GoToTask';
import CompoundTask from '../task/CompoundTask';
import TaskTag from '../task/TaskTag';
import TransferTask from '../task/ant/TransferTask';
import UpgradeControllerTask from '../task/ant/UpgradeControllerTask';

export default class TaskService {
  public static assignRoomTasks(roomName: string): void {
    const roomMemory = Memory.rooms[roomName];

    TaskService.assignAnthillTasks(roomMemory);
    TaskService.assignAntsTasks(roomMemory);
  }

  public static validateTasks(roomName: string): void {
    const roomMemory = Memory.rooms[roomName];

    const { activeTasks } = roomMemory;

    for (const type in activeTasks) {
      activeTasks[type] = activeTasks[type]
        .map(task => {
          --task.timeout;
          return task;
        })
        .filter(task => task.timeout > 0);
    }
  }

  private static assignAnthillTasks(roomMemory: RoomMemory): void {
    const { activeTasks } = roomMemory;

    const antCreationTasks = activeTasks[TaskType.CREATE_ANT];
    for (const spawnId of roomMemory.entities.anthills) {
      const spawn: StructureSpawn = Game.getObjectById(spawnId) as StructureSpawn;

      if (spawn.spawning || spawn.memory.activeTask) {
        continue;
      }
      const task = antCreationTasks.shift();

      if (task) {
        spawn.memory.activeTask = task;
      } else {
        break;
      }
    }
  }

  private static assignAntsTasks(roomMemory: RoomMemory): void {
    const { activeTasks } = roomMemory;

    const compound: CompoundTask[] = activeTasks[TaskType.COMPOUND] as CompoundTask[];
    for (const antId of roomMemory.entities.ants) {
      const ant: Creep = Game.getObjectById(antId.id) as Creep;

      if (!ant) {
        continue;
      }

      if (ant.memory.activeTask) {
        continue;
      }

      if (ant.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
        const task = compound.find(task =>
          task.tags ? task.tags.find(tag => tag === TaskTag.FULL_ANT) !== undefined : false,
        );

        if (task) {
          ant.memory.activeTask = task;
        }
      } else {
        const task = compound.find(task =>
          task.creatorId === ant.memory.bondedSourceId && task.tags
            ? task.tags.find(tag => tag === TaskTag.EMPTY_ANT) !== undefined
            : false,
        );

        if (task) {
          ant.memory.activeTask = task;
        }
      }
    }
  }
}
