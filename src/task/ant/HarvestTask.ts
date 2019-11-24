import Task from '../Task';
import TaskType from '../TaskType';
import TaskTag from '../TaskTag';

export default class HarvestTask extends Task {
  constructor(public sourceId: Id<Source | Mineral>, timeout: number, creatorId: Id<any>, tags?: TaskTag[]) {
    super(TaskType.HARVEST, timeout, creatorId, tags);
  }

  public static run(task: HarvestTask, ant: Creep): boolean {
    if (ant.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
      const source: Source | Mineral = Game.getObjectById(task.sourceId) as Source | Mineral;

      return ant.harvest(source) !== 0;
    }
    return true;
  }
}
