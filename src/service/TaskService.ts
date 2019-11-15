import { TaskType } from "../task/TaskType";
import { CreateAntTask } from "../task/CreateAntTask";
import { GoToTask } from "../task/GoToTask";
import { CompoundTask } from "../task/CompoundTask";
import { HarvestTask } from "../task/HarvestTask";
import { TaskTag } from "../task/TaskTag";
import { TransferTask } from "../task/TransferTask";
import { UpgradeControllerTask } from "../task/UpgradeControllerTask";

const ANT_NUMBER = 16;

export class TaskService {
  public static createRoomTask(roomName: string) {
    const roomMemory = Memory.rooms[roomName];

    const activeTasks = roomMemory.activeTasks;

    const antCreationTasksSize = activeTasks[TaskType.CREATE_ANT].length;
    let antsBeingCreated = 0;
    for(const {} of roomMemory.entities.ants) {
      for (const anthillId of roomMemory.entities.anthills) {
        const anthill: StructureSpawn = Game.getObjectById(anthillId) as StructureSpawn;
        if (anthill.memory.activeTask && anthill.memory.activeTask.type === TaskType.CREATE_ANT) {
          ++antsBeingCreated;
        }

        if (anthill.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {

          activeTasks[TaskType.COMPOUND].push(
            new CompoundTask(
              [
                new GoToTask(anthillId, Number.MAX_VALUE),
                new TransferTask(anthillId, 50)
              ],
              1,
              [TaskTag.FULL_ANT]
            )
          );
        } else {
          const controller = Game.rooms[roomName].controller as StructureController;

          activeTasks[TaskType.COMPOUND].push(
            new CompoundTask(
              [
                new GoToTask(controller.id, Number.MAX_VALUE),
                new UpgradeControllerTask(controller.id, 50)
              ],
              1,
              [TaskTag.FULL_ANT]
            )
          );
        }
      }
    }

    const neededAnts = ANT_NUMBER - (antCreationTasksSize + roomMemory.entities.ants.length + antsBeingCreated);

    if (neededAnts > 0) {
      for(let i = 0;i < neededAnts;i++) {
        activeTasks[TaskType.CREATE_ANT].push(new CreateAntTask(Number.MAX_VALUE));
      }
    }

    const harvestTasks = activeTasks[TaskType.COMPOUND].filter(task => (task.tags) ? task.tags.find(tag => tag === TaskTag.EMPTY_ANT) !== undefined : false).length;

    if(harvestTasks < roomMemory.entities.energySources.length) {
      for (const energySourceId of roomMemory.entities.energySources) {
        activeTasks[TaskType.COMPOUND].push(
          new CompoundTask(
            [
              new GoToTask(energySourceId, Number.MAX_VALUE),
              new HarvestTask(energySourceId, 50, Number.MAX_VALUE)
            ],
            5,
            [TaskTag.EMPTY_ANT]
          )
        );
      }
    }
  }

  public static assignRoomTasks(roomName: string): void {
    const roomMemory = Memory.rooms[roomName];

    const activeTasks = roomMemory.activeTasks;

    const antCreationTasks = activeTasks[TaskType.CREATE_ANT];

    for (const spawnId of roomMemory.entities.anthills) {
      const spawn: StructureSpawn = Game.getObjectById(spawnId) as StructureSpawn;

      if (spawn.spawning || spawn.memory.activeTask) {
        continue;
      }
      const task = antCreationTasks.shift();

      if(task) {
        spawn.memory.activeTask = task;
      } else {
        break;
      }
    }

    const compound: CompoundTask[] = activeTasks[TaskType.COMPOUND] as CompoundTask[];
    for (const antId of roomMemory.entities.ants) {
      const ant: Creep = Game.getObjectById(antId) as Creep;

      if (ant.memory.activeTask) {
        continue;
      }

      if(ant.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
        const task = compound.find(task => (task.tags) ? task.tags.find(tag => tag === TaskTag.FULL_ANT) !== undefined : false);

        if(task) {
          ant.memory.activeTask = task;
        }
      } else {
        const task = compound.find(task => (task.tags) ? task.tags.find(tag => tag === TaskTag.EMPTY_ANT) !== undefined : false);

        if(task) {
          ant.memory.activeTask = task;
        }
      }
    }
  }

  public static validateTasks(roomName: string): void {
    const roomMemory = Memory.rooms[roomName];

    const activeTasks = roomMemory.activeTasks;

    for(const type in activeTasks) {
      activeTasks[type] = activeTasks[type].map(task => {
        --task.timeout;
        return task;
      }).filter(task => task.timeout > 0);
    }
  }
}
