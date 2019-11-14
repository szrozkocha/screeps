import { TaskType } from "../types/TaskType";

const ANT_NUMBER = 2;

export class TaskService {
  public static createRoomTask(roomName: string) {
    const roomMemory = Memory.rooms[roomName];

    const activeTasks = roomMemory.activeTasks;

    const antCreationTasksSize = activeTasks[TaskType.CREATE_ANT].length;

    let antsBeingCreated = 0;
    for (const anthillId of roomMemory.entities.anthills) {
      const anthill: StructureSpawn = Game.getObjectById(anthillId) as StructureSpawn;
      if (anthill.memory.activeTask && anthill.memory.activeTask.type === TaskType.CREATE_ANT) {
        ++antsBeingCreated;
      }
    }

    const neededAnts = ANT_NUMBER - (antCreationTasksSize + roomMemory.entities.ants.length + antsBeingCreated);

    if (neededAnts > 0) {
      for(let i = 0;i < neededAnts;i++) {
        const task: Task = {
          type: TaskType.CREATE_ANT
        };

        activeTasks[TaskType.CREATE_ANT].push(
          task
        );
      }
    }

    const gatherEnergyTasksSize = activeTasks[TaskType.COMPOUND].length;
    if (gatherEnergyTasksSize < roomMemory.entities.energySources.length) {
      for (const energySourceId of roomMemory.entities.energySources) {
        const goToTask: GoToTask = {
          destinationId: energySourceId,
          type: TaskType.GO_TO
        };

        const gatherTask: HarvestTask = {
          sourceId: energySourceId,
          amount: 50,
          type: TaskType.HARVEST
        };

        const compoundTask: CompoundTask = {
          subtasks: [
            goToTask,
            gatherTask
          ],
          type: TaskType.COMPOUND
        };

        activeTasks[TaskType.COMPOUND].push(
          compoundTask
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

    const gatherEnergyTasks = activeTasks[TaskType.COMPOUND];
    for (const antId of roomMemory.entities.ants) {
      const ant: Creep = Game.getObjectById(antId) as Creep;

      if (ant.memory.activeTask) {
        continue;
      }

      if(ant.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
        continue;
      }

      const task = gatherEnergyTasks.shift();

      if (task) {
        ant.memory.activeTask = task;
      } else {
        break;
      }
    }
  }
}
