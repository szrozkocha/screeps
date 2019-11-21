import CompoundTask from '../task/CompoundTask';
import GoToTask from '../task/ant/GoToTask';
import HarvestTask from '../task/ant/HarvestTask';
import TaskType from '../task/TaskType';
import TaskTag from '../task/TaskTag';
import CreateAntTask from '../task/anthill/CreateAntTask';

export default class EnergySource {
  public static tick(id: Id<Source>, roomMemory: RoomMemory): void {
    const source = Game.getObjectById(id);
    const sourceMemory = roomMemory.entities.energySources[id as string];

    source.room.visual.text(`Energy: ${source.energy}/${source.energyCapacity}`, source.pos.x + 1, source.pos.y, {
      align: 'left',
      opacity: 0.8,
    });
    source.room.visual.text(`Alive ${source.ticksToRegeneration} ticks`, source.pos.x + 1, source.pos.y + 1, {
      align: 'left',
      opacity: 0.8,
    });
    source.room.visual.text(`${sourceMemory.lostEnergy} energy lost`, source.pos.x + 1, source.pos.y + 2, {
      align: 'left',
      opacity: 0.8,
    });

    if (source.ticksToRegeneration === 1) {
      sourceMemory.lostEnergy = source.energy;
    }

    if (sourceMemory.bondedAnts.length < sourceMemory.accessPositions.length) {
      roomMemory.activeTasks[TaskType.CREATE_ANT].push(new CreateAntTask(1, id));
    }

    if (source.energy > 0) {
      roomMemory.activeTasks[TaskType.COMPOUND].push(
        new CompoundTask(
          [new GoToTask(id, Number.MAX_VALUE, id), new HarvestTask(id, 50, Number.MAX_VALUE, id)],
          1,
          id,
          [TaskTag.EMPTY_ANT],
        ),
      );
    }
  }
}
