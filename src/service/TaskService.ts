import { TaskType } from "../task/TaskType";
import { CreateAntTask } from "../task/CreateAntTask";
import { GoToTask } from "../task/GoToTask";
import { CompoundTask } from "../task/CompoundTask";
import { HarvestTask } from "../task/HarvestTask";

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
        activeTasks[TaskType.CREATE_ANT].push(new CreateAntTask(Number.MAX_VALUE));
      }
    }

    for (const energySourceId of roomMemory.entities.energySources) {
      activeTasks[TaskType.COMPOUND].push(
        new CompoundTask(
          [
            new GoToTask(energySourceId, Number.MAX_VALUE),
            new HarvestTask(energySourceId, 50, Number.MAX_VALUE)
          ],
          1
        )
      );
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
