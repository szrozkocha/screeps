import {Anthill} from "./entity/Anthill";
import {MemoryService} from "./service/MemoryService";
import {TaskService} from "./service/TaskService";
import {ErrorMapper} from "./utils/ErrorMapper";
import {Init} from "./utils/Init";
import { Ant } from "./entity/Ant";

Init.init();

export const loop = ErrorMapper.wrapLoop(() => {
  for (const roomName in Memory.rooms) {
    TaskService.createRoomTask(roomName);
    TaskService.assignRoomTasks(roomName);
  }

  for (const anthillName in Game.spawns) {
    Anthill.tick(anthillName);
  }

  for (const antName in Game.creeps) {
    Ant.tick(antName);
  }

  for (const roomName in Memory.rooms) {
    TaskService.validateTasks(roomName);
  }

  MemoryService.clean();
});