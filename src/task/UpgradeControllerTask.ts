import { Task } from "./Task";
import { TaskTag } from "./TaskTag";
import { TaskType } from "./TaskType";

export class UpgradeControllerTask extends Task {
  constructor(
    public targetId: string,
    timeout: number,
    tags?: TaskTag[]
  ) {
    super(TaskType.UPGRADE_CONTROLLER, timeout, tags);
  }

  public static run(task: UpgradeControllerTask, ant: Creep): boolean {
    const source: StructureController = Game.getObjectById(task.targetId) as StructureController;

    ant.upgradeController(source);

    return ant.store.getUsedCapacity() <= 0;
  }
}