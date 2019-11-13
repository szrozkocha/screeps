import {TaskType} from "../types/TaskType";

const ANT_NUMBER = 2;

export class TaskService {
  public static createRoomTask(roomName: string) {
    const roomMemory = Memory.rooms[roomName];

    const activeTasks = roomMemory.activeTasks;

    const antCreationTasksSize = activeTasks[TaskType.CREATE_ANT].length;

    let antsBeingCreated = 0;
    for(let spawnName in Game.spawns) {
      const spawn = Game.spawns[spawnName];
      if(spawn.memory.activeTask && spawn.memory.activeTask.type == TaskType.CREATE_ANT) {
        ++antsBeingCreated;
      }
    }

    const neededAnts = ANT_NUMBER - (antCreationTasksSize + roomMemory.entities.ants.length + antsBeingCreated);

    if(neededAnts > 0) {
      for(let i = 0;i < neededAnts;i++) {
        const task: Task = {
          type: TaskType.CREATE_ANT
        };

        activeTasks[TaskType.CREATE_ANT].push(
          task
        );
      }
    }
  }

  public static assignRoomTasks(roomName: string): void {
    const roomMemory = Memory.rooms[roomName];

    const activeTasks = roomMemory.activeTasks;

    const antCreationTasks = activeTasks[TaskType.CREATE_ANT];

    for(let spawnId of roomMemory.entities.anthills) {
      const spawn: StructureSpawn = <StructureSpawn>Game.getObjectById(spawnId);

      if(spawn.spawning != null || spawn.memory.activeTask != undefined) {
        continue;
      }
      const task = antCreationTasks.pop();

      if(task) {
        spawn.memory.activeTask = task;
      } else {
        break;
      }
    }
  }
}
