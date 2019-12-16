import { Anthill } from './entity/Anthill';
import TaskService from './service/TaskService';
import Init from './utils/Init';
import Ant from './entity/Ant';
import EnergySource from './entity/EnergySource';
import Controller from './entity/Controller';
import RoadPlanerService from './service/RoadPlanerService';
import BuildPlanerService from './service/BuildPlanerService';
import ExtensionPlanerService from './service/ExtensionPlanerService';

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

    RoadPlanerService.planRoads(roomName);
    BuildPlanerService.createBuildConstructionSiteTasks(roomName);
    ExtensionPlanerService.planExtensions(roomName);
    Controller.tick(Game.rooms[roomName].controller);

    for (let name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
      }
    }
  }
};
