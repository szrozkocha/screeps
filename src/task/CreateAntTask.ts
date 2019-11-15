import { Task } from "./Task";
import { TaskType } from "./TaskType";
import { Anthill, AnthillState } from "../entity/Anthill";

export class CreateAntTask extends Task {
  constructor(
    timeout: number
  ) {
    super(TaskType.CREATE_ANT, timeout);
  }

  public static run(anthill: StructureSpawn): boolean {
    if (anthill.spawning) {
      Anthill.say(anthill, AnthillState.BUSY);
      return false;
    }

    if(!anthill.memory.spawningAntName) {
      if(anthill.store.getUsedCapacity(RESOURCE_ENERGY) < 250) {
        Anthill.say(anthill, AnthillState.UNABLE);
        return false;
      }
      const antName = "Ant_" + Date.now();
      Anthill.say(anthill, AnthillState.BUSY);
      anthill.spawnCreep([WORK, CARRY, MOVE, MOVE], antName);
      anthill.memory.spawningAntName = antName;
      return false;
    } else {
      Anthill.say(anthill, AnthillState.BUSY);
      const ants = Memory.rooms[anthill.room.name].entities.ants;
      ants[ants.length] = Game.creeps[anthill.memory.spawningAntName].id;// Because fucking push don't work, that's why
      return true;
    }
  }

}