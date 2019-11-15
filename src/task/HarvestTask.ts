import { Task } from "./Task";
import { TaskType } from "./TaskType";

export class HarvestTask extends Task {
  constructor(
    public sourceId: string,
    public amount: number,
    timeout: number
  ) {
    super(TaskType.HARVEST, timeout);
  }

  public static run(task: HarvestTask, ant: Creep): boolean {
    if(ant.store.getUsedCapacity(RESOURCE_ENERGY) < task.amount) {
      const source: Source | Mineral = Game.getObjectById(task.sourceId) as Source | Mineral;

      ant.harvest(source);
      return false;
    } else {
      return true;
    }
  }
}