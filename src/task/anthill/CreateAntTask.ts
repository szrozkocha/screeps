import Task from '../Task';
import TaskType from '../TaskType';
import { Anthill, AnthillState } from '../../entity/Anthill';
import TaskTag from '../TaskTag';

export default class CreateAntTask extends Task {
  constructor(timeout: number, creatorId: Id<any>, tags?: TaskTag[]) {
    super(TaskType.CREATE_ANT, timeout, creatorId, tags);
  }

  public static run(task: CreateAntTask, anthill: StructureSpawn): boolean {
    if (anthill.spawning) {
      Anthill.say(anthill, AnthillState.BUSY);
      return false;
    }

    if (!anthill.memory.spawningAntName) {
      const usedCapacity: number = anthill.store.getUsedCapacity(RESOURCE_ENERGY);
      if (usedCapacity < 250) {
        Anthill.say(anthill, AnthillState.UNABLE);
        return false;
      }
      const antName = `Ant_${Date.now()}`;
      Anthill.say(anthill, AnthillState.BUSY);
      anthill.spawnCreep([WORK, CARRY, MOVE, MOVE], antName);
      anthill.memory.spawningAntName = antName;
      return false;
    }
    Anthill.say(anthill, AnthillState.BUSY);
    const ant = Game.creeps[anthill.memory.spawningAntName];
    const antId = ant.id;
    const { ants } = Memory.rooms[anthill.room.name].entities;
    ants[ants.length] = { id: antId, name: ant.name }; // Because fucking push don't work, that's why
    const creator = Game.getObjectById(task.creatorId);
    if (creator instanceof Source) {
      creator.room.memory.entities.energySources[creator.id as string].bondedAnts.push(antId);
      ant.memory.bondedSourceId = creator.id;
    }
    return true;
  }
}
