import Task from './Task';
import TaskType from './TaskType';
import CreateAntTask from './anthill/CreateAntTask';
import GoToTask from './ant/GoToTask';
import CompoundTask from './CompoundTask';
import HarvestTask from './ant/HarvestTask';
import TransferTask from './ant/TransferTask';
import UpgradeControllerTask from './ant/UpgradeControllerTask';
import BuildTask from "./ant/BuildTask";

export default class TaskRunner {
  public static runAnthill(target: StructureSpawn, task: Task): boolean {
    switch (task.type) {
      case TaskType.CREATE_ANT:
        return CreateAntTask.run(task as CreateAntTask, target);
      case TaskType.COMPOUND:
        return CompoundTask.runAnthill(task as CompoundTask, target);
      default:
        return false;
    }
  }

  public static runAnt(target: Creep, task: Task): boolean {
    switch (task.type) {
      case TaskType.GO_TO:
        return GoToTask.run(task as GoToTask, target);
      case TaskType.COMPOUND:
        return CompoundTask.runAnt(task as CompoundTask, target);
      case TaskType.HARVEST:
        return HarvestTask.run(task as HarvestTask, target);
      case TaskType.TRANSFER:
        return TransferTask.run(task as TransferTask, target);
      case TaskType.UPGRADE_CONTROLLER:
        return UpgradeControllerTask.run(task as UpgradeControllerTask, target);
      case TaskType.BUILD:
        return BuildTask.run(task as BuildTask, target);
      default:
        return false;
    }
  }
}
