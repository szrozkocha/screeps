import { Task } from "./Task";
import { TaskType } from "./TaskType";
import { CreateAntTask } from "./CreateAntTask";
import { GoToTask } from "./GoToTask";
import { CompoundTask } from "./CompoundTask";
import { HarvestTask } from "./HarvestTask";
import { TransferTask } from "./TransferTask";
import { UpgradeControllerTask } from "./UpgradeControllerTask";

export class TaskRunner {
  public static runAnthill(target: StructureSpawn, task: Task): boolean {
    switch (task.type) {
      case TaskType.CREATE_ANT:
        return CreateAntTask.run(target);
      case TaskType.COMPOUND:
        return CompoundTask.runAnthill(<CompoundTask>task, target);
    }

    return false;
  }

  public static runAnt(target: Creep, task: Task): boolean {
    switch (task.type) {
      case TaskType.GO_TO:
        return GoToTask.run(<GoToTask>task, target);
      case TaskType.COMPOUND:
        return CompoundTask.runAnt(<CompoundTask>task, target);
      case TaskType.HARVEST:
        return HarvestTask.run(<HarvestTask>task, target);
      case TaskType.TRANSFER:
        return TransferTask.run(<TransferTask>task, target);
      case TaskType.UPGRADE_CONTROLLER:
        return UpgradeControllerTask.run(<UpgradeControllerTask>task, target);
    }

    return false;
  }
}