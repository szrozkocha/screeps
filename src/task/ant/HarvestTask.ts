import Task from '../Task';
import TaskType from '../TaskType';
import TaskTag from '../TaskTag';

export default class HarvestTask extends Task {
  constructor(
    public sourceId: Id<Source | Mineral>,
    public amount: number,
    timeout: number,
    creatorId: Id<any>,
    tags?: TaskTag[],
  ) {
    super(TaskType.HARVEST, timeout, creatorId, tags);
  }

  public static run(task: HarvestTask, ant: Creep): boolean {
    if (ant.store.getUsedCapacity(RESOURCE_ENERGY) < task.amount) {
      const source: Source | Mineral = Game.getObjectById(task.sourceId) as Source | Mineral;

      return ant.harvest(source) !== 0;
    }
    return true;
  }
}
