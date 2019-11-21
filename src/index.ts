import { Anthill } from './entity/Anthill';
import TaskService from './service/TaskService';
import Init from './utils/Init';
import Ant from './entity/Ant';
import EnergySource from './entity/EnergySource';
import Controller from "./entity/Controller";

Init.init();

export const loop = (): void => {
  for (const roomName in Memory.rooms) {
    const roomMemory = Memory.rooms[roomName];

    TaskService.assignRoomTasks(roomName);

    TaskService.validateTasks(roomName);

    for (const anthillId of roomMemory.entities.anthills) {
      Anthill.tick(anthillId, roomMemory);
    }

    for (const antId of roomMemory.entities.ants) {
      Ant.tick(antId, roomMemory);
    }

    for (const energySourceId in roomMemory.entities.energySources) {
      EnergySource.tick(energySourceId, roomMemory);
    }

    Controller.tick(Game.rooms[roomName].controller);
  }
};
