import { ErrorMapper } from "utils/ErrorMapper";
import {TaskService} from "./service/TaskService";
import {MemoryService} from "./service/MemoryService";
import {Init} from "./utils/Init";
import {Anthill} from "./entity/Anthill";

Init.init();

export const loop = ErrorMapper.wrapLoop(() => {
  for (const roomName in Memory.rooms) {
    TaskService.createRoomTask(roomName);
    TaskService.assignRoomTasks(roomName);
  }

  for (const anthillName in Game.spawns) {
    Anthill.tick(anthillName);
  }

  MemoryService.clean();
});
